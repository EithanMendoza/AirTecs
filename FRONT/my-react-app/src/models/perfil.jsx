// archivo: src/components/CrearPerfil.jsx
import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../controllers/navbar'; // Asegúrate de que la ruta sea correcta

const CrearPerfil = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    genero: '',
  });
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje('');
    setError('');

    try {
      const token = localStorage.getItem('session_token');
      if (!token) {
        throw new Error('No has iniciado sesión.');
      }

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}/perfil/crear-perfil`,
        formData,
        { headers: { Authorization: token } }
      );

      if (response.status === 201) {
        setMensaje('Perfil creado correctamente.');
        setFormData({ nombre: '', apellido: '', telefono: '', genero: '' });
      }
    } catch (err) {
      setError(err.response?.data?.error || err.message || 'Error al crear el perfil.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar /> {/* Incluyendo la barra de navegación */}
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-8">
          Verifica tu información
        </h2>
        <p className="text-xl text-center text-gray-600 mb-12">
          Completa tu información personal para personalizar tu experiencia
        </p>

        {mensaje && (
          <div className="mb-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r" role="alert">
            <p className="font-bold">¡Éxito!</p>
            <p>{mensaje}</p>
          </div>
        )}

        {error && (
          <div className="mb-8 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r" role="alert">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Tu nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="apellido" className="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                id="apellido"
                name="apellido"
                type="text"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Tu apellido"
                value={formData.apellido}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <input
                id="telefono"
                name="telefono"
                type="tel"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                placeholder="Tu número de teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="genero" className="block text-sm font-medium text-gray-700 mb-1">
                Género
              </label>
              <select
                id="genero"
                name="genero"
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition duration-150 ease-in-out"
                value={formData.genero}
                onChange={handleChange}
              >
                <option value="">Seleccione género</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
                <option value="otro">Otro</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className={`px-6 py-3 border border-transparent text-base font-medium rounded-md text-white ${
                loading ? 'bg-indigo-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:scale-105`}
            >
              {loading ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Creando perfil...
                </span>
              ) : (
                'Crear Perfil'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPerfil;
