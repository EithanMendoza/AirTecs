// archivo: src/models/ServicioDetalles.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbar';

const ServicioDetalles = () => {
  const { id } = useParams();
  const [detalleServicio, setDetalleServicio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchServicioDetalles = async () => {
      try {
        const token = localStorage.getItem('session_token');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/formulario/solicitudes/${id}`, {
          headers: { Authorization: token },
        });
        setDetalleServicio(response.data);
      } catch (err) {
        setError('Error al obtener los detalles del servicio.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchServicioDetalles();
  }, [id]);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {detalleServicio && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Detalles del Servicio</h2>
            <p><strong>Nombre del Servicio:</strong> {detalleServicio.nombre_servicio}</p>
            <p><strong>Marca:</strong> {detalleServicio.marca_ac}</p>
            <p><strong>Tipo:</strong> {detalleServicio.tipo_ac}</p>
            <p><strong>Dirección:</strong> {detalleServicio.direccion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicioDetalles;
