const db = require('../database'); // Conexión a la base de datos

// Middleware de autenticación para verificar el token de sesión
const verificarSesion = (req, res, next) => {
  const token = req.headers['authorization']; // El token de sesión debe enviarse en el header de autorización

  if (!token) {
    return res.status(401).json({ error: 'No se ha proporcionado un token de sesión.' });
  }

  const query = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
  db.query(query, [token], (err, results) => {
    if (err) {
      return res.status(500).json({ error: 'Error al verificar la sesión', detalle: err.message });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Token de sesión inválido o sesión expirada.' });
    }

    // Asignar el user_id al objeto req para usarlo en otras rutas
    req.userId = results[0].user_id;

    // Continuar con la solicitud
    next();
  });
};

module.exports = verificarSesion;

