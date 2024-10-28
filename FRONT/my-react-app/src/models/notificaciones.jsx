import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../controllers/navbar';
import Footer from '../controllers/footer';

const Notificaciones = () => {
  const [notificaciones, setNotificaciones] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotificaciones = async () => {
      try {
        const token = localStorage.getItem('session_token');
        
        if (!token) {
          setError('No has iniciado sesión.');
          return;
        }

        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/notificaciones/notificaciones`, {
          headers: { Authorization: token }
        });

        // Verifica si hay más de una notificación y omite la primera
        if (response.data.length > 1) {
          setNotificaciones(response.data.slice(1)); // Oculta la primera notificación
        } else {
          setNotificaciones([]); // Si solo hay una, no se muestra nada
        }
        setError('');
      } catch (err) {
        setError('Error al obtener las notificaciones.');
        console.error('Error al obtener las notificaciones:', err);
      }
    };

    fetchNotificaciones(); // Cargar notificaciones al inicio

    // Configura la actualización cada 2 segundos
    const intervalId = setInterval(fetchNotificaciones, 2000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const borrarNotificacion = async (id) => {
    try {
      const token = localStorage.getItem('session_token');
      await axios.delete(`${import.meta.env.VITE_REACT_APP_API_URL}/notificaciones/${id}`, {
        headers: { Authorization: token }
      });
      setNotificaciones(notificaciones.filter(notif => notif.id !== id)); // Actualiza el estado
    } catch (err) {
      console.error('Error al borrar la notificación:', err);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Notificaciones</h2>
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {notificaciones.length === 0 && !error ? (
          <p className="text-gray-500 text-center">No tienes notificaciones.</p>
        ) : (
          <div className="space-y-4">
            {notificaciones.map((notif) => (
              <div
                key={notif.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-[1.02]`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{notif.titulo}</h3>
                    <button
                      onClick={() => borrarNotificacion(notif.id)} // Llama a la función para borrar
                      className="text-red-500 hover:text-red-600 transition duration-300 ease-in-out"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-600 mb-2">{notif.mensaje}</p>
                  {isNaN(new Date(notif.fecha).getTime()) ? null : (
                    <p className="text-xs text-gray-400">
                      {new Date(notif.fecha).toLocaleString()}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Notificaciones;
