const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexión a la base de datos
const { asignarTecnico } = require('../models/asignarTecnico'); // Importa la función para asignar técnicos
const verificarSesion = require('../middlewares/authMiddleware'); // Importa el middleware de autenticación
const verificarPerfil = require('../middlewares/perfilMiddleware'); // Importa el middleware para verificar el perfil

// Proteger la ruta con los middlewares de autenticación y perfil
router.post('/crear-solicitud', verificarSesion, verificarPerfil, (req, res) => {
  const { tipo_servicio_id, marca_ac, tipo_ac, detalles, fecha, hora, direccion } = req.body;
  const token = req.headers['authorization']; // Obtener el token del header

  // Validar que todos los campos obligatorios están presentes
  if (!tipo_servicio_id || !marca_ac || !tipo_ac || !fecha || !hora || !direccion) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
  }

  // Obtener el userId desde el token de sesión
  const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
  db.query(queryUserId, [token], (err, result) => {
    if (err || result.length === 0) {
      return res.status(401).json({ error: 'Sesión no válida o expirada.' });
    }

    const userId = result[0].user_id;

    // Validar el tipo de servicio
    const queryValidarServicio = 'SELECT nombre_servicio FROM tipos_servicio WHERE id = ?';
    db.query(queryValidarServicio, [tipo_servicio_id], (err, result) => {
      if (err || result.length === 0) {
        return res.status(400).json({ error: 'Tipo de servicio no válido.' });
      }

      const nombre_servicio = result[0].nombre_servicio;

      // Insertar la solicitud en la base de datos
      const query = `
        INSERT INTO solicitudes_servicio 
        (user_id, tipo_servicio_id, nombre_servicio, marca_ac, tipo_ac, detalles, fecha, hora, direccion) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      const values = [userId, tipo_servicio_id, nombre_servicio, marca_ac, tipo_ac, detalles || null, fecha, hora, direccion];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error('Error al crear la solicitud de servicio:', err);
          return res.status(500).json({ error: 'Error al crear la solicitud de servicio', detalle: err.message });
        }

        const solicitudId = result.insertId; // Obtener el ID de la solicitud creada
        res.status(201).json({ mensaje: 'Solicitud de servicio creada correctamente' });

        // Configurar temporizador de un minuto para asignar técnico
        setTimeout(() => {
          asignarTecnico(solicitudId);
        }, 60000); // 60000 ms = 1 minuto
      });
    });
  });
});


router.get('/curso', verificarSesion, (req, res) => {
    const token = req.headers['authorization'];

    // Obtener el user_id basado en el token de sesión
    const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
    db.query(queryUserId, [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Sesión no válida o expirada.' });
        }

        const userId = results[0].user_id;

        // Obtener los servicios en curso para el usuario
        const queryServicios = `
            SELECT sc.id, sc.tecnico_asignado_id, sc.estado, sc.codigo_ilustrativo, sc.fecha_inicio
            FROM servicios_en_curso sc
            JOIN tecnicos_asignados ta ON sc.tecnico_asignado_id = ta.id
            JOIN solicitudes_servicio ss ON ta.solicitud_id = ss.id
            WHERE ss.user_id = ? AND sc.fecha_fin IS NULL
        `;

        db.query(queryServicios, [userId], (err, servicios) => {
            if (err) {
                return res.status(500).json({ error: 'Error al obtener los servicios en curso.' });
            }

            res.status(200).json(servicios); // Retornar los servicios en curso
        });
    });
});


// archivo: rutas.js
router.get('/curso/:id', verificarSesion, (req, res) => {
  const { id } = req.params;

  // Consulta para obtener los detalles del servicio
  const query = 'SELECT nombre_servicio, marca_ac, tipo_ac, direccion FROM solicitudes_servicio WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al obtener los detalles del servicio.', detalle: err.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado.' });
    }

    res.status(200).json(results[0]);
  });
});




module.exports = router;
