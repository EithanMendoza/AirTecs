import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbar';

const serviceStages = [
  "EL TÉCNICO HA SIDO ASIGNADO",
  "EL TÉCNICO ESTÁ EN CAMINO",
  "EL TÉCNICO HA LLEGADO A TU DOMICILIO",
  "EL TÉCNICO SE ENCUENTRA TRABAJANDO",
  "EL TÉCNICO HA FINALIZADO EL SERVICIO"
];

const Servicios = () => {
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detallesVisible, setDetallesVisible] = useState(null);
  const navigate = useNavigate();
  const [tecnico, setTecnico] = useState({});

  useEffect(() => {
    const fetchServicios = async () => {
      try {
        const token = localStorage.getItem('session_token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/formulario/curso`, {
          headers: { Authorization: token },
        });
        setServicios(response.data);
      } catch (err) {
        setError('Error al obtener los servicios en curso.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchRandomTecnico = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        const user = response.data.results[0];
        setTecnico({
          nombre: `${user.name.first} ${user.name.last}`,
          imagen: user.picture.large,
        });
      } catch (err) {
        console.error('Error al obtener el técnico aleatorio:', err);
      }
    };

    fetchServicios();
    fetchRandomTecnico();

    // Configura la actualización cada 2 segundos
    const intervalId = setInterval(fetchServicios, 2000);

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const handleProceedToPay = (servicioId) => {
    navigate(`/pago`);
  };

  const handleViewDetails = async (servicioId) => {
    try {
      const token = localStorage.getItem('session_token');
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/formulario/curso/${servicioId}`, {
        headers: { Authorization: token },
      });
      setDetallesVisible(response.data);
    } catch (err) {
      console.error('Error al obtener los detalles del servicio:', err);
      setError('Error al obtener los detalles del servicio.');
    }
  };

  if (loading) return <div className="flex justify-center items-center h-screen">Cargando...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Servicios en Curso</h1>
        {servicios.map((servicio) => (
          <div key={servicio.id} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-blue-600">{serviceStages[servicio.estado - 1]}</h2>
            <div className="flex items-center mb-6">
              <img src={tecnico.imagen} alt="Técnico" className="w-20 h-20 rounded-full mr-6" />
              <div>
                <p className="font-bold text-2xl text-gray-800">{tecnico.nombre || 'Técnico Asignado'}</p>
                <p className="text-lg text-gray-600">Técnico Superior</p>
              </div>
            </div>
            <div className="mb-6 space-y-2">
              <p className="text-xl"><span className="font-semibold text-gray-700">Código:</span> <span className="text-blue-600">{servicio.codigo_ilustrativo}</span></p>
              <p className="text-xl"><span className="font-semibold text-gray-700">Fecha de inicio:</span> <span className="text-blue-600">{new Date(servicio.fecha_inicio).toLocaleString()}</span></p>
            </div>
            <div className="relative mb-8">
              <div className="flex mb-2 items-center justify-between">
                {serviceStages.map((stage, index) => (
                  <div key={index} className="text-center" style={{width: '20%'}}>
                    <div className={`w-10 h-10 mx-auto rounded-full text-lg text-white flex items-center justify-center ${
                      index < servicio.estado ? 'bg-blue-500' : 'bg-gray-300'
                    }`}>
                      {index < servicio.estado ? (
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (index + 1)}
                    </div>
                  </div>
                ))}
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                <div style={{ width: `${(servicio.estado / serviceStages.length) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500 transition-all duration-1000 ease-in-out"></div>
              </div>
            </div>
            {servicio.estado === serviceStages.length && (
              <div className="mb-6 p-4 bg-green-100 rounded-lg">
                <p className="text-xl font-semibold mb-2 text-green-800">Proporciona el siguiente código:</p>
                <p className="text-3xl font-bold text-green-600">{servicio.codigo_ilustrativo}</p>
              </div>
            )}
            {servicio.estado === serviceStages.length ? (
              <button 
                className="w-full bg-green-500 hover:bg-green-600 text-white text-lg font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                onClick={() => handleProceedToPay(servicio.id)} 
              >
                Proceder a pagar
              </button>
            ) : (
              <button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
                onClick={() => handleViewDetails(servicio.id)}
              >
                Ver detalles
              </button>
            )}
          </div>
        ))}

        {detallesVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center" onClick={() => setDetallesVisible(null)}>
            <div className="relative p-8 w-full max-w-md m-auto bg-white rounded-lg" onClick={e => e.stopPropagation()}>
              <div className="mt-3">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Detalles del Servicio</h3>
                <div className="mt-2 text-left">
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold text-blue-600">Nombre del Servicio:</span> {detallesVisible.nombre_servicio}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold text-blue-600">Marca:</span> {detallesVisible.marca_ac}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold text-blue-600">Tipo:</span> {detallesVisible.tipo_ac}
                  </p>
                  <p className="text-lg text-gray-700 mb-2">
                    <span className="font-semibold text-blue-600">Dirección:</span> {detallesVisible.direccion}
                  </p>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    onClick={() => setDetallesVisible(null)}
                    className="px-4 py-2 bg-blue-500 text-white text-lg font-bold rounded-lg w-full shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Servicios;
