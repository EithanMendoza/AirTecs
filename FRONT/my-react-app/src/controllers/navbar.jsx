// archivo: src/controllers/Navbar.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBell, FaToolbox, FaUser, FaSignOutAlt, FaHistory } from 'react-icons/fa'; // Cambié FaCog a FaToolbox para usar el icono de herramienta

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('session_token');

      if (!token) {
        alert('No se ha iniciado sesión.');
        navigate('/login');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/autenticacion/logout`,
        {},
        {
          headers: { Authorization: token },
        }
      );

      if (response.status === 200) {
        localStorage.removeItem('session_token');
        alert(response.data.mensaje);
        navigate('/login');
      }
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      alert(error.response?.data?.error || 'Error al cerrar sesión');
    }
  };

  const handleProfileClick = () => {
    navigate('/perfil');
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-400 p-4 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span
              className="text-3xl font-extrabold text-white cursor-pointer"
              onClick={() => navigate('/home')}
            >
              Air<span className="text-blue-200">Tecs</span>
            </span>
          </div>

          {/* Icons and avatar */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <button
              onClick={() => navigate('/notificaciones')}
              className="relative p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-all duration-300 group"
            >
              <FaBell className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              <span className="sr-only">Notificaciones</span>
              <span className="absolute top-0 right-0 h-3 w-3 bg-blue-200 rounded-full animate-ping"></span>
            </button>

            {/* History */}
            <button
              onClick={() => navigate('/serviciosfinalizados')}
              className="relative p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-all duration-300 group"
            >
              <FaHistory className="h-6 w-6 text-white group-hover:scale-110 transition-transform" />
              <span className="sr-only">Historial de Servicios</span>
            </button>

            {/* Settings */}
            <button
              onClick={() => navigate('/configuraciones')}
              className="p-2 rounded-full bg-blue-500 hover:bg-blue-400 transition-all duration-300 group"
            >
              <FaToolbox className="h-6 w-6 text-white group-hover:rotate-90 transition-transform" />
              <span className="sr-only">Herramientas</span>
            </button>

            {/* User avatar and dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative h-12 w-12 rounded-full overflow-hidden ring-2 ring-white ring-offset-2 ring-offset-blue-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-blue-200"
              >
                <img
                  src="https://github.com/shadcn.png"
                  alt="User avatar"
                  className="h-full w-full object-cover"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 animate-fadeIn">
                  <button
                    onClick={handleProfileClick}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors duration-150"
                  >
                    <FaUser className="mr-2 text-blue-500" /> Perfil
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center transition-colors duration-150"
                  >
                    <FaSignOutAlt className="mr-2 text-blue-500" /> Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
