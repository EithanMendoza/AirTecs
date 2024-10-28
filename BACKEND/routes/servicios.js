const express = require('express');
const router = express.Router();
const db = require('../database');
const verificarSesion = require('../middlewares/authMiddleware'); // Middleware para verificar sesión

// Ruta para obtener los servicios en curso del usuario logueado
router.get('/usuario', verificarSesion, (req, res) => {
    const token = req.headers['authorization'];

    // Obtener el user_id del token de sesión
    const queryObtenerUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
    db.query(queryObtenerUserId, [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Sesión no válida o expirada.' });
        }

        const userId = results[0].user_id;

        // Consulta para obtener los servicios en curso del usuario logueado
        const query = `
            SELECT sc.* 
            FROM servicios_en_curso sc
            JOIN tecnicos_asignados ta ON sc.tecnico_asignado_id = ta.id
            JOIN solicitudes_servicio ss ON ta.solicitud_id = ss.id
            WHERE ss.user_id = ?
        `;

        db.query(query, [userId], (err, results) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los servicios en curso del usuario.' });
            }
            
            if (results.length === 0) {
                return res.status(404).json({ error: 'No hay servicios en curso para este usuario.' });
            }

            res.status(200).json(results);
        });
    });
});

module.exports = router;

