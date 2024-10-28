import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';
import PaginaPrincipal from './components/paginaprincipal';
import Notificaciones from './models/notificaciones';
import Configuraciones from './models/servicios';
import Perfil from './models/perfil';
import ServiceForm from './models/ServiceForm';
import ProtectedRoute from './controllers/ProtectedRoute';
import Pago from './components/pago';
import ServiciosFinalizados from './models/serviciosfinalizados';
import ThankYou from './components/gracias';
import LandingPage from './components/LandingPage'; // Importamos el nuevo componente

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} /> {/* Cambiamos la ruta de inicio */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/home" 
          element={
            <ProtectedRoute>
              <PaginaPrincipal />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/notificaciones" 
          element={
            <ProtectedRoute>
              <Notificaciones />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/configuraciones" 
          element={
            <ProtectedRoute>
              <Configuraciones />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/perfil" 
          element={
            <ProtectedRoute>
              <Perfil />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/service/:id"  
          element={
            <ProtectedRoute>
              <ServiceForm />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/pago" 
          element={
            <ProtectedRoute>
              <Pago />
            </ProtectedRoute>
          }
        />
        <Route
          path="/serviciosfinalizados"
          element={
            <ProtectedRoute>
              <ServiciosFinalizados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gracias"
          element={
            <ProtectedRoute>
              <ThankYou />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
