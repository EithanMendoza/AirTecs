// archivo: src/components/Pago.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Pago = () => {
  const { id } = useParams(); // Obtiene el ID del servicio desde la URL
  const navigate = useNavigate();
  const [metodo, setMetodo] = useState(''); // Método de pago
  const [numeroTarjeta, setNumeroTarjeta] = useState('');
  const [nombreTitular, setNombreTitular] = useState('');
  const [cvv, setCvv] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePago = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('session_token');
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/pago/realizar-pago`, {
        metodo,
        numero_tarjeta: numeroTarjeta,
        nombre_titular: nombreTitular,
        cvv
      }, {
        headers: { Authorization: token }
      });

      // Eliminar el mensaje de alerta de emergencia
      navigate('/gracias'); // Redirige al componente de Gracias
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar el pago.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-8 antialiased md:py-16 min-h-screen flex flex-col justify-center">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <h2 className="text-xl font-semibold text-gray-900 sm:text-2xl text-center mb-6">Realizar Pago</h2>

        <div className="mx-auto max-w-5xl">
          <form onSubmit={handlePago} className="w-full rounded-lg border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
            <div className="mb-6 grid grid-cols-2 gap-4">
              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="metodo" className="mb-2 block text-sm font-medium text-gray-900">Método de Pago:</label>
                <select
                  id="metodo"
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="">Seleccione un método</option>
                  <option value="credito">Tarjeta de Crédito</option>
                  <option value="debito">Tarjeta de Débito</option>
                </select>
              </div>

              <div className="col-span-2">
                <label htmlFor="numeroTarjeta" className="mb-2 block text-sm font-medium text-gray-900">Número de Tarjeta:</label>
                <input
                  type="text"
                  id="numeroTarjeta"
                  value={numeroTarjeta}
                  onChange={(e) => setNumeroTarjeta(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="nombreTitular" className="mb-2 block text-sm font-medium text-gray-900">Nombre del Titular:</label>
                <input
                  type="text"
                  id="nombreTitular"
                  value={nombreTitular}
                  onChange={(e) => setNombreTitular(e.target.value)}
                  required
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Nombre del titular"
                />
              </div>

              <div className="col-span-2 sm:col-span-1">
                <label htmlFor="cvv" className="mb-2 block text-sm font-medium text-gray-900">CVV:</label>
                <input
                  type="text"
                  id="cvv"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                  maxLength={3} // Limitar a 3 dígitos
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Código CVV"
                />
              </div>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              className="flex w-full items-center justify-center rounded-lg bg-blue-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-300"
            >
              {loading ? 'Procesando...' : 'Confirmar Pago'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-center gap-8">
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg" alt="" />
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg" alt="" />
            <img className="h-8 w-auto" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pago;
