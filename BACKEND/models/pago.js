const express = require('express');
const router = express.Router();
const db = require('../database');
const verificarSesion = require('../middlewares/authMiddleware');

router.post('/realizar-pago', verificarSesion, (req, res) => {
    const token = req.headers['authorization'];
    const { metodo, numero_tarjeta, nombre_titular, cvv } = req.body;

    // Validar que todos los datos del pago están presentes
    if (!metodo || !numero_tarjeta || !nombre_titular || !cvv) {
        return res.status(400).json({ error: 'Todos los datos son obligatorios.' });
    }

    // Obtener el user_id basado en el token de sesión
    const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
    db.query(queryUserId, [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Sesión no válida o expirada.' });
        }

        const userId = results[0].user_id;

        // Verificar que hay un servicio pendiente de pago
        const queryServicio = `
            SELECT id FROM servicios_en_curso
            WHERE tecnico_asignado_id IN (
                SELECT id FROM tecnicos_asignados WHERE solicitud_id IN (
                    SELECT id FROM solicitudes_servicio WHERE user_id = ?
                )
            ) AND estado = 5 AND fecha_fin IS NULL
        `;
        
        db.query(queryServicio, [userId], (err, results) => {
            if (err) return res.status(500).json({ error: 'Error al verificar el estado del servicio.' });
            if (results.length === 0) return res.status(400).json({ error: 'No hay servicios pendientes de pago.' });

            const servicioEnCursoId = results[0].id;

            // Agregar el método de pago en la tabla metodos_pago
            const queryInsertMetodoPago = 'INSERT INTO metodos_pago (metodo, numero_tarjeta, nombre_titular, cvv) VALUES (?, ?, ?, ?)';
            db.query(queryInsertMetodoPago, [metodo, numero_tarjeta, nombre_titular, cvv], (err) => {
                if (err) return res.status(500).json({ error: 'Error al registrar el método de pago.' });

                // Actualizar el servicio como pagado y establecer fecha de finalización
                const queryActualizarServicio = `
                    UPDATE servicios_en_curso 
                    SET fecha_fin = NOW() 
                    WHERE id = ?`;
                
                db.query(queryActualizarServicio, [servicioEnCursoId], (err) => {
                    if (err) return res.status(500).json({ error: 'Error al finalizar el servicio.' });

                    res.status(200).json({ mensaje: 'Pago registrado correctamente. Gracias por su preferencia.' });
                });
            });
        });
    });
});

router.get('/servicios-finalizados', verificarSesion, (req, res) => {
    const token = req.headers['authorization'];

    // Obtener el user_id basado en el token de sesión
    const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
    db.query(queryUserId, [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Sesión no válida o expirada.' });
        }

        const userId = results[0].user_id;

        // Obtener los servicios finalizados para el usuario
        const queryServicios = `
            SELECT sc.id, sc.tecnico_asignado_id, sc.estado, sc.codigo_ilustrativo, sc.fecha_inicio, sc.fecha_fin
            FROM servicios_en_curso sc
            JOIN tecnicos_asignados ta ON sc.tecnico_asignado_id = ta.id
            JOIN solicitudes_servicio ss ON ta.solicitud_id = ss.id
            WHERE ss.user_id = ? AND sc.fecha_fin IS NOT NULL
        `;

        db.query(queryServicios, [userId], (err, servicios) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los servicios finalizados.' });
            }

            res.status(200).json(servicios); // Retornar los servicios finalizados
        });
    });
});


module.exports = router;
