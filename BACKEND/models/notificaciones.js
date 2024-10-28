// archivo: routes/notificaciones.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexión a la base de datos
const verificarSesion = require('../middlewares/authMiddleware'); // Middleware de autenticación

// Obtener notificaciones y marcarlas como leídas
router.get('/notificaciones', verificarSesion, (req, res) => {
  const token = req.headers['authorization']; // Obtener el token de sesión

  // Obtener el user_id basado en el token de sesión
  const queryObtenerUserId = `
    SELECT user_id FROM login 
    WHERE session_token = ? AND tiempo_cierre IS NULL`;

  db.query(queryObtenerUserId, [token], (err, results) => {
    if (err || results.length === 0) {
      return res.status(500).json({ error: 'Error al verificar la sesión o sesión no encontrada.' });
    }

    const userId = results[0].user_id;

    // Obtener las notificaciones del usuario
    const queryObtenerNotificaciones = `
      SELECT * FROM notificaciones 
      WHERE user_id = ?`;

    db.query(queryObtenerNotificaciones, [userId], (err, notificaciones) => {
      if (err) {
        return res.status(500).json({ error: 'Error al obtener las notificaciones.', detalle: err.message });
      }

      // Marcar todas las notificaciones como leídas
      const queryMarcarLeidas = `
        UPDATE notificaciones SET leido = TRUE 
        WHERE user_id = ? AND leido = FALSE`;

      db.query(queryMarcarLeidas, [userId], (err, result) => {
        if (err) {
          console.error('Error en la consulta de marcar notificaciones como leídas:', err); // Más detalles del error
          return res.status(500).json({ error: 'Error al marcar las notificaciones como leídas.', detalle: err.message });
        }

        // Enviar las notificaciones al cliente
        res.status(200).json(notificaciones);
      });
    });
  });
});

// Borrar una notificación
router.delete('/:id', verificarSesion, (req, res) => {
  const notificationId = req.params.id; // Obtener el ID de la notificación a borrar
  const token = req.headers['authorization']; // Obtener el token de sesión

  // Validar que se proporcione un ID de notificación
  if (!notificationId) {
    return res.status(400).json({ error: 'ID de notificación requerido.' });
  }

  // Eliminar la notificación
  const queryEliminarNotificacion = `
    DELETE FROM notificaciones 
    WHERE id = ? AND user_id = (SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL)`;

  db.query(queryEliminarNotificacion, [notificationId, token], (err, result) => {
    if (err) {
      console.error('Error al eliminar la notificación:', err);
      return res.status(500).json({ error: 'Error al eliminar la notificación.', detalle: err.message });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Notificación no encontrada o no pertenece al usuario.' });
    }

    res.status(200).json({ mensaje: 'Notificación eliminada correctamente.' });
  });
});

module.exports = router;
