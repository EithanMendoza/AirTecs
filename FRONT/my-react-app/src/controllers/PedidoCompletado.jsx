// archivo: src/controllers/PedidoCompletado.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../controllers/navbar'; // Asegúrate de que la ruta sea correcta

const PedidoCompletado = ({ orderNumber }) => {
  const navigate = useNavigate();

  const handleBackToMenu = () => {
    navigate('/home');
  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <div className="flex items-center justify-center flex-grow p-8">
        <div className="flex flex-col items-center">
          <svg className="w-40 h-40 mb-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 16H16V18H14V16ZM14 12H16V14H14V12ZM14 8H16V10H14V8ZM10 16H12V18H10V16ZM10 12H12V14H10V12ZM10 8H12V10H10V8ZM6 16H8V18H6V16ZM6 12H8V14H6V12ZM6 8H8V10H6V8ZM18 4H6C4.9 4 4 4.9 4 6V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V6C20 4.9 19.1 4 18 4ZM18 18H6V6H18V18Z" fill="#4F46E5"/>
          </svg>
          <h2 className="text-4xl font-bold mb-4 text-gray-800">PEDIDO COMPLETADO</h2>
          <p className="text-xl mb-3 text-gray-600">En breve se le asignará un técnico</p>
          <p className="text-gray-500 mb-2">Order number is #2836456: <span className="font-semibold text-xl"></span></p>
          <p className="text-gray-400 text-md text-center">Por favor estar atento a las notifaciones" section</p>
          
          <button 
            onClick={handleBackToMenu}
            className="bg-white text-gray-600 border border-gray-300 py-4 px-10 rounded hover:bg-gray-50 transition duration-300 ease-in-out text-lg font-semibold mt-4"
          >
            VOLVER AL MENÚ
          </button>
        </div>
      </div>
    </div>
  );
};

export default PedidoCompletado;
