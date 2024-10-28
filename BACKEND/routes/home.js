const express = require('express');
const router = express.Router();
const db = require('../database');
const verificarSesion = require('../middlewares/authMiddleware'); // Middleware de autenticación


// Obtener los servicios desde la tabla `tipos_servicio` (requiere sesión)
router.get('/servicios', verificarSesion, (req, res) => {
  const query = 'SELECT id, nombre_servicio, descripcion, imagenUrl FROM tipos_servicio';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los tipos de servicio:', err);
      return res.status(500).json({ error: 'Error al obtener los tipos de servicio', detalle: err.message });
    }
    
    res.status(200).json(results);
  });
});

module.exports = router;


// Registrar la selección de servicio por parte del usuario
router.post('/seleccion', verificarSesion, (req, res) => {
  const { tipo_servicio_id } = req.body;
  const token = req.headers['authorization'];

  // Obtener el userId desde el token de sesión
  const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
  db.query(queryUserId, [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(401).json({ error: 'Sesión no válida o expirada.' });
    }

    const userId = results[0].user_id;

    // Insertar la selección del servicio en la base de datos
    const query = 'INSERT INTO servicios (user_id, tipo_servicio_id) VALUES (?, ?)';
    db.query(query, [userId, tipo_servicio_id], (err) => {
      if (err) {
        console.error('Error al registrar la selección del servicio:', err);
        return res.status(500).json({ error: 'Error al registrar la selección del servicio', detalle: err.message });
      }
      
      res.status(200).json({ mensaje: 'Servicio seleccionado correctamente' });
    });
  });
});

module.exports = router;
