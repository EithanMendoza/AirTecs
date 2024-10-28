const express = require('express');
const router = express.Router();
const db = require('../database'); // Conexión a la base de datos
const verificarSesion = require('../middlewares/authMiddleware'); // Middleware para verificar sesión

router.post('/crear-perfil', verificarSesion, (req, res) => {
    const token = req.headers['authorization'];
    const { nombre, apellido, telefono, genero } = req.body;

    // Validar que todos los datos del perfil están presentes
    if (!nombre || !apellido || !telefono || !genero) {
        return res.status(400).json({ error: 'Todos los datos son obligatorios.' });
    }

    // Obtener el user_id basado en el token de sesión
    const queryUserId = 'SELECT user_id FROM login WHERE session_token = ? AND tiempo_cierre IS NULL';
    db.query(queryUserId, [token], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ error: 'Sesión no válida o expirada.' });
        }

        const userId = results[0].user_id;

        // Verificar que el user_id exista en la tabla usuarios
        const queryVerificarUsuario = 'SELECT id FROM usuarios WHERE id = ?';
        db.query(queryVerificarUsuario, [userId], (err, results) => {
            if (err || results.length === 0) {
                return res.status(404).json({ error: 'El usuario no existe.' });
            }

            // Insertar el perfil en la base de datos
            const queryInsertPerfil = `
                INSERT INTO perfiles (user_id, nombre, apellido, telefono, genero) 
                VALUES (?, ?, ?, ?, ?)`;

            db.query(queryInsertPerfil, [userId, nombre, apellido, telefono, genero], (err) => {
                if (err) {
                    console.error('Error al crear el perfil:', err);
                    return res.status(500).json({ error: 'Error al crear el perfil.' });
                }

                res.status(201).json({ mensaje: 'Perfil creado correctamente.' });
            });
        });
    });
});

module.exports = router;

