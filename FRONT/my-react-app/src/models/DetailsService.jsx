// archivo: src/models/DetailsService.jsx
import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbar';
import Footer from '../controllers/footer';

const DetailsService = () => {
  const { id } = useParams(); // Obtener el id del servicio desde la URL
  const location = useLocation();
  const navigate = useNavigate();
  const { date, time, address } = location.state || {}; // Datos del estado previo

  const [marcaAC, setMarcaAC] = useState('');
  const [otraMarca, setOtraMarca] = useState('');
  const [tipoAC, setTipoAC] = useState('');
  const [detalles, setDetalles] = useState('');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('session_token');
    if (!token) {
      setError('Token de autenticación no encontrado.');
      return;
    }

    const solicitudData = {
      tipo_servicio_id: id,
      marca_ac: otraMarca || marcaAC,
      tipo_ac: tipoAC,
      detalles,
      fecha: date,
      hora: time,
      direccion: address,
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/formulario/crear-solicitud`, solicitudData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMensaje(response.data.mensaje);
      setError('');
      navigate('/home'); // Redirigir a la página principal después de enviar la solicitud
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud.');
      setMensaje('');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Detalles del Servicio</h2>
        {mensaje && <p className="text-green-600 text-center">{mensaje}</p>}
        {error && <p className="text-red-600 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto space-y-4">
          <label className="block text-gray-700">¿CUÁL ES LA MARCA DE AIRE ACONDICIONADO?</label>
          <select value={marcaAC} onChange={(e) => setMarcaAC(e.target.value)} required className="border p-2 w-full rounded mt-1">
            <option value="">Selecciona una opción</option>
            <option value="Mirage">Mirage</option>
            <option value="Mabe">Mabe</option>
            <option value="Carrier">Carrier</option>
            <option value="otra">Otra</option>
          </select>

          {marcaAC === 'otra' && (
            <div>
              <label className="block text-gray-700">Especifica la marca:</label>
              <input type="text" value={otraMarca} onChange={(e) => setOtraMarca(e.target.value)} required className="border p-2 w-full rounded mt-1" />
            </div>
          )}

          <label className="block text-gray-700">¿SELECCIONA EL TIPO DE AIRE ACONDICIONADO?</label>
          <select value={tipoAC} onChange={(e) => setTipoAC(e.target.value)} required className="border p-2 w-full rounded mt-1">
            <option value="">Selecciona una opción</option>
            <option value="Mini Split">Mini Split</option>
            <option value="Ventana">Ventana</option>
          </select>

          <label className="block text-gray-700">¿NECESITAS AGREGAR ALGÚN DETALLE?</label>
          <textarea value={detalles} onChange={(e) => setDetalles(e.target.value)} placeholder="Escribe más detalles..." className="border p-2 w-full rounded mt-1" />

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded mt-4">Enviar Solicitud</button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default DetailsService;
