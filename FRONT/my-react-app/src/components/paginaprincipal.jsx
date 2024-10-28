// archivo: src/components/PaginaPrincipal.jsx 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbar';
import Footer from '../controllers/footer';

const PaginaPrincipal = () => {
  const [servicios, setServicios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const token = localStorage.getItem('session_token');
        
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_API_URL}/home/servicios`, {
          headers: {
            Authorization: token, // Enviar el token en el encabezado de autorización
          },
        });
        
        setServicios(response.data); // Actualizar el estado con los servicios del usuario
      } catch (error) {
        console.error('Error al obtener los servicios:', error);
      }
    };

    fetchServicios();
  }, []);

  const seleccionarServicio = (idServicio) => {
    navigate(`/service/${idServicio}`); // Redirige a ServiceForm con el ID del servicio
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8 flex-grow">
        <h1 className="text-4xl font-bold text-center mb-10">Selecciona un servicio</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicios.map((servicio) => (
            <div
              key={servicio.id}
              className="flex flex-col md:flex-row items-center bg-white rounded-lg overflow-hidden cursor-pointer"
              onClick={() => seleccionarServicio(servicio.id)}
            >
              <div className="w-full md:w-1/2">
                <img 
                  src={servicio.imagenUrl} // Mostrar imagen del servicio
                  alt={servicio.nombre_servicio} 
                  className="w-full h-48 md:h-full object-cover"
                />
              </div>
              <div className="w-full md:w-1/2 p-6">
                <h2 className="text-2xl font-bold mb-2">{servicio.nombre_servicio}</h2>
                <p className="text-gray-600 mb-4">{servicio.descripcion}</p> {/* Mostrar descripción */}
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300">
                  Get Started
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PaginaPrincipal;
