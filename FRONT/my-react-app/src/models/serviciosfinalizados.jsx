// archivo: src/models/ServiciosFinalizados.jsx
import React, { useEffect, useState } from 'react';
import Navbar from '../controllers/navbar'; // Asegúrate de que la ruta sea correcta
import axios from 'axios';

const ServiciosFinalizados = () => {
    const [servicios, setServicios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchServiciosFinalizados = async () => {
            try {
                const token = localStorage.getItem('session_token');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/servicios-finalizados`, {
                    headers: { Authorization: token },
                });
                setServicios(response.data);
            } catch (err) {
                setError('Error al obtener los servicios finalizados.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchServiciosFinalizados();
    }, []);

    if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
    if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Servicios Finalizados</h1>
                {servicios.length > 0 ? (
                    servicios.map((servicio) => (
                        <div key={servicio.id} className="bg-white rounded-lg shadow-md mb-6 p-6">
                            <h2 className="text-2xl font-semibold mb-2">Servicio ID: {servicio.id}</h2>
                            <p><strong>Técnico Asignado:</strong> {servicio.tecnico_asignado_id}</p>
                            <p><strong>Código:</strong> {servicio.codigo_ilustrativo}</p>
                            <p><strong>Fecha de Inicio:</strong> {new Date(servicio.fecha_inicio).toLocaleString()}</p>
                            <p><strong>Fecha de Fin:</strong> {new Date(servicio.fecha_fin).toLocaleString()}</p>
                        </div>
                    ))
                ) : (
                    <p>No hay servicios finalizados.</p>
                )}
            </div>
        </div>
    );
};

export default ServiciosFinalizados;
