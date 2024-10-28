// archivo: src/components/Logout.jsx
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('session_token'); // Obtiene el token de sesión del almacenamiento local

      if (!token) {
        alert('No se ha iniciado sesión.');
        return;
      }

      // Realiza la solicitud POST para cerrar sesión
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/autenticacion/logout`,
        {},
        {
          headers: { Authorization: token } // Añade el token en los encabezados de la solicitud
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('session_token'); // Elimina el token del almacenamiento local
        alert(response.data.mensaje);
        navigate('/login'); // Redirige al usuario a la página de inicio de sesión
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert(error.response?.data?.error || 'Error al cerrar sesión');
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition duration-300"
    >
      Cerrar sesión
    </button>
  );
};

export default Logout;
