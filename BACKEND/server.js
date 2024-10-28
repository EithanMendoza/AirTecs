const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // Permite todas las solicitudes CORS


// Middleware para parsear JSON
app.use(express.json());

// Rutas
const autenticacionRoutes = require('./routes/autenticacion');
app.use('/autenticacion', autenticacionRoutes);

const homeRoutes = require('./routes/home');
app.use('/home', homeRoutes);

const formularioRoutes = require('./routes/formulario');
app.use('/formulario', formularioRoutes);

const notificacionesRoutes = require('./models/notificaciones');
app.use('/notificaciones', notificacionesRoutes);

const serviciosRoutes = require('./routes/servicios');
app.use('/servicios', serviciosRoutes);

const pagoRoutes = require('./models/pago');
app.use('/pago', pagoRoutes);

const perfilRoutes = require('./routes/perfil');
app.use('/perfil', perfilRoutes);

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en producción en http://localhost:${port}`);
});
