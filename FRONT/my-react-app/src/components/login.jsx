import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importamos useNavigate
import tecnico from '../assets/tecnico.png'; // Imagen de ejemplo

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook de navegación

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/autenticacion/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        // Guardar el token de sesión
        localStorage.setItem('session_token', response.data.session_token);

        // Redirigir al home después del login exitoso
        navigate('/home'); // Aquí redirigimos a la página principal
      } else {
        setError('Error al iniciar sesión. Verifique sus credenciales.');
      }
    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        <div className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          <img
            src={tecnico}
            className="w-full max-w-md rounded-2xl shadow-lg transform hover:scale-105 transition-transform duration-300"
            alt="Air 'Tecs logo"
          />
        </div>
        <div className="md:w-1/2 p-12 bg-white">
          <form className="max-w-md mx-auto" onSubmit={handleLogin}>
            <div className="mb-12 text-center">
              <h3 className="text-4xl font-bold text-gray-800 mb-4">Bienvenido de vuelta</h3>
              <p className="text-gray-600 text-lg">
                ¿No tienes una cuenta?{' '}
                <span
                  onClick={() => navigate('/register')} // Redirige al componente Register
                  className="text-blue-600 font-semibold hover:underline cursor-pointer transition-colors duration-300"
                >
                  Regístrate aquí
                </span>
              </p>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                placeholder="Ingresa tu correo"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                required
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:opacity-90 transition-all duration-300"
            >
              Iniciar sesión
            </button>
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
