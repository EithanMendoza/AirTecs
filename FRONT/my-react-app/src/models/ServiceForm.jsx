// archivo: src/models/ServiceForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../controllers/navbar';
import PedidoCompletado from '../controllers/PedidoCompletado'; // Importa el nuevo componente

const ServiceForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    date: '',
    time: '',
    address: '',
    marcaAC: '',
    otraMarca: '',
    tipoAC: '',
    detalles: '',
  });

  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [step, setStep] = useState(1);
  const [orderNumber, setOrderNumber] = useState(null); // Para almacenar el número de orden

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Validar campos requeridos
    if (!formData.date || !formData.time || !formData.address || !formData.marcaAC || 
        !formData.tipoAC || (formData.marcaAC === 'otra' && !formData.otraMarca)) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    const token = localStorage.getItem('session_token');
    if (!token) {
      setError('No se encontró un token de autenticación.');
      return;
    }

    const solicitudData = {
      tipo_servicio_id: id,
      marca_ac: formData.marcaAC === 'otra' ? formData.otraMarca : formData.marcaAC, // Usar la otra marca si es necesario
      tipo_ac: formData.tipoAC,
      detalles: formData.detalles,
      fecha: formData.date,
      hora: formData.time,
      direccion: formData.address
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/formulario/crear-solicitud`, solicitudData, {
        headers: { Authorization: token }
      });
      setOrderNumber(response.data.orderNumber); // Asigna el número de orden aquí
      setMensaje(response.data.mensaje);
      setError('');
      setStep(3); // Cambia el paso a 3 para mostrar el componente de pedido completado
    } catch (err) {
      setError(err.response?.data?.error || 'Error al enviar la solicitud.');
      setMensaje('');
    }
  };

  const handleNextStep = () => {
    if (step < 2) {
      setStep(prevStep => prevStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(prevStep => prevStep - 1);
    }
  };

  // Renderiza el componente de finalización si se envió correctamente
  if (step === 3) {
    return <PedidoCompletado orderNumber={orderNumber} />;
  }
  const progressPercentage = (step / 2) * 100;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="px-6 py-4 bg-blue-600 text-white">
            <h2 className="text-2xl font-bold">LIMPIEZA DE AIRE ACONDICIONADO</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs font-medium text-blue-600">Paso {step} de 2</span>
                <span className="text-xs font-medium text-blue-600">{Math.round(progressPercentage)}% Completado</span>
              </div>
            </div>
            {mensaje && <p className="text-green-600 mb-4">{mensaje}</p>}
            {error && <p className="text-red-600 mb-4">{error}</p>}
            <div className="flex flex-col md:flex-row gap-8">
              <form onSubmit={handleSubmit} className="w-full md:w-1/2">
                {step === 1 && (
                  <>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        ¿CUÁNDO LO NECESITAS?
                      </label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.date}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">
                        SELECCIONA UN HORARIO
                      </label>
                      <input
                        type="time"
                        id="time"
                        name="time"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.time}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        ¿DÓNDE ES EL SERVICIO?
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        placeholder="Ingrese dirección"
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </>
                )}
                {step === 2 && (
                  <>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marcaAC">
                        ¿CUÁL ES LA MARCA DE AIRE ACONDICIONADO?
                      </label>
                      <select
                        id="marcaAC"
                        name="marcaAC"
                        value={formData.marcaAC}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Mirage">Mirage</option>
                        <option value="Mabe">Mabe</option>
                        <option value="Carrier">Carrier</option>
                        <option value="otra">Otra</option>
                      </select>
                    </div>
                    {formData.marcaAC === 'otra' && (
                      <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="otraMarca">
                          Especifica la marca:
                        </label>
                        <input
                          type="text"
                          id="otraMarca"
                          name="otraMarca"
                          value={formData.otraMarca}
                          onChange={handleChange}
                          required
                          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                      </div>
                    )}
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="tipoAC">
                        ¿SELECCIONA EL TIPO DE AIRE ACONDICIONADO?
                      </label>
                      <select
                        id="tipoAC"
                        name="tipoAC"
                        value={formData.tipoAC}
                        onChange={handleChange}
                        required
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="Mini Split">Mini Split</option>
                        <option value="Ventana">Ventana</option>
                      </select>
                    </div>
                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="detalles">
                        ¿NECESITAS AGREGAR ALGÚN DETALLE?
                      </label>
                      <textarea
                        id="detalles"
                        name="detalles"
                        value={formData.detalles}
                        onChange={handleChange}
                        placeholder="Escribe más detalles..."
                        className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                      />
                    </div>
                  </>
                )}
                <div className="flex items-center justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePreviousStep}
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      Anterior
                    </button>
                  )}
                  {step < 2 ? (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      Siguiente
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                    >
                      Enviar Solicitud
                    </button>
                  )}
                </div>
              </form>
              <div className="w-full md:w-1/2">
                <div className="h-[600px] md:h-full">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509056!2d144.95373531531652!3d-37.81627957975173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0b5b6d81%3A0x5045675218cee3b!2sVictoria%20State%20Library!5e0!3m2!1sen!2sau!4v1619783013143!5m2!1sen!2sau" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ServiceForm;
