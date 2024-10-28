const db = require('../database');
const crypto = require('crypto');

// Función para asignar un técnico y comenzar el servicio
const asignarTecnico = (solicitudId) => {
    const queryVerificarSolicitud = `
        SELECT estado, user_id, (SELECT username FROM usuarios WHERE id = user_id) AS cliente_nombre 
        FROM solicitudes_servicio 
        WHERE id = ?`;

    db.query(queryVerificarSolicitud, [solicitudId], (err, result) => {
        if (err || result.length === 0 || result[0].estado !== 'pendiente') return;

        const userId = result[0].user_id;
        const clienteNombre = result[0].cliente_nombre;

        const querySeleccionTecnico = `
            SELECT id, nombre FROM tecnicos 
            WHERE disponibilidad = TRUE 
            LIMIT 1`;

        db.query(querySeleccionTecnico, (err, tecnicos) => {
            if (err || tecnicos.length === 0) return console.log('No hay técnicos disponibles');

            const tecnicoId = tecnicos[0].id;
            const tecnicoNombre = tecnicos[0].nombre;

            const queryActualizarDisponibilidad = 'UPDATE tecnicos SET disponibilidad = FALSE WHERE id = ?';
            db.query(queryActualizarDisponibilidad, [tecnicoId]);

            const queryAsignarTecnico = `
                INSERT INTO tecnicos_asignados (solicitud_id, tecnico_id, tecnico_nombre, cliente_nombre) 
                VALUES (?, ?, ?, ?)`;

            db.query(queryAsignarTecnico, [solicitudId, tecnicoId, tecnicoNombre, clienteNombre], (err, result) => {
                if (err) return console.error('Error al asignar técnico:', err);

                const tecnicoAsignadoId = result.insertId;
                iniciarServicioEnCurso(tecnicoAsignadoId, userId);
            });
        });
    });
};

// Función para iniciar el servicio en curso y enviar notificación inicial
const iniciarServicioEnCurso = (tecnicoAsignadoId, userId) => {
    const codigoIlustrativo = crypto.randomBytes(3).toString('hex');

    const queryInsertServicio = `
        INSERT INTO servicios_en_curso (tecnico_asignado_id, estado, codigo_ilustrativo) 
        VALUES (?, 1, ?)`;

    db.query(queryInsertServicio, [tecnicoAsignadoId, codigoIlustrativo], (err, result) => {
        if (err) return console.error('Error al iniciar servicio en curso:', err);

        const servicioEnCursoId = result.insertId;
        enviarNotificacion(userId, `Se te ha asignado un técnico. Código ilustrativo: ${codigoIlustrativo}`);

        iniciarFlujoDeServicio(servicioEnCursoId, userId);
    });
};

// Función para enviar notificaciones
const enviarNotificacion = (userId, mensaje) => {
    const queryNotificacion = `INSERT INTO notificaciones (user_id, mensaje) VALUES (?, ?)`;
    db.query(queryNotificacion, [userId, mensaje], (err) => {
        if (err) console.error('Error al crear notificación:', err);
    });
};

// Función de flujo automático de estado del servicio
const iniciarFlujoDeServicio = (servicioEnCursoId, userId) => {
    const ESTADOS_SERVICIO = [
        { estado: 1, mensaje: 'Se te ha asignado un técnico' },
        { estado: 2, mensaje: 'El técnico está en camino' },
        { estado: 3, mensaje: 'El técnico ha llegado a tu domicilio. Código ilustrativo: ' },
        { estado: 4, mensaje: 'El técnico está trabajando' },
        { estado: 5, mensaje: 'Tu servicio ha finalizado, procede a pagar.' } // Mensaje actualizado
    ];
    
    let estadoActual = 0;

    const actualizarEstado = () => {
        const { estado, mensaje } = ESTADOS_SERVICIO[estadoActual];
        
        // Genera un código ilustrativo para el estado "técnico ha llegado" y "servicio finalizado"
        let mensajeFinal = mensaje;
        if (estado === 3 || estado === 5) {
            const codigoIlustrativo = crypto.randomBytes(3).toString('hex');
            mensajeFinal += codigoIlustrativo;

            // Actualiza el código ilustrativo en la tabla
            const queryActualizarCodigo = `UPDATE servicios_en_curso SET codigo_ilustrativo = ? WHERE id = ?`;
            db.query(queryActualizarCodigo, [codigoIlustrativo, servicioEnCursoId]);
        }

        const queryActualizarEstado = `
            UPDATE servicios_en_curso SET estado = ? 
            WHERE id = ?`;

        db.query(queryActualizarEstado, [estado, servicioEnCursoId], (err) => {
            if (err) return console.error('Error al actualizar estado:', err);

            enviarNotificacion(userId, mensajeFinal);
            estadoActual++;

            if (estado === 5) clearInterval(intervalo); // No se detiene el flujo, pero la notificación se envía
        });
    };

    const intervalo = setInterval(() => {
        actualizarEstado();
    }, 60000); // Cambia de estado cada minuto
};

module.exports = { asignarTecnico };
