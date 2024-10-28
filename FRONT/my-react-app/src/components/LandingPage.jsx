import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import tecnica from '../assets/tecnica.png';
import { motion } from 'framer-motion';
import logo from '../assets/navbar-logo.png';

// Importación de íconos de react-icons
import { FaTools, FaSnowflake, FaFan, FaThermometerHalf } from 'react-icons/fa';
import { AiOutlineEye } from 'react-icons/ai';
import { FaShieldAlt } from 'react-icons/fa';
import { IoMdSpeedometer } from 'react-icons/io';


const LandingPage = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="font-body bg-gray-50">
      {/* Navbar */}
      <header className="relative bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img src={logo} alt="Logo" style={{ width: '120px', height: '40px' }} />

          </motion.div>

        {/* Menú de Navegación para Pantallas Grandes */}
        <nav className="hidden lg:flex items-center space-x-16">
          <motion.a
            href="#sobre-nosotros"
            className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            Sobre Nosotros
          </motion.a>
          <motion.a
            href="#ultimos-servicios"
            className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Servicios
          </motion.a>
          <motion.a
            href="#"
            className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Inicio
          </motion.a>
        </nav>

        {/* Botones de Acción */}
        <div className="hidden lg:flex space-x-4">
          <motion.button
            onClick={() => navigate('/login')}
            className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Iniciar Sesión
          </motion.button>
          <motion.button
            onClick={() => navigate('/register')}
            className="px-5 py-2 border border-blue-500 text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
            whileHover={{ scale: 1.05 }}
          >
            Únete a Nosotros
          </motion.button>
        </div>


          {/* Icono de Menú para Pantallas Pequeñas */}
          <button
            className="lg:hidden flex items-center text-blue-500"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <i className="fas fa-bars text-2xl"></i>
          </button>
        </div>

        {/* Menú Desplegable en Pantallas Pequeñas */}
        {menuOpen && (
          <motion.div
            className="lg:hidden bg-white shadow-lg py-4 absolute top-full w-full z-10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="flex flex-col items-center space-y-4">
              {['Inicio', 'Servicios', 'Testimonios', 'Sobre Nosotros'].map((text) => (
                <a
                  key={text}
                  href="#"
                  className="text-gray-800 font-semibold hover:text-blue-600 transition duration-300"
                >
                  {text}
                </a>
              ))}
              <button
                onClick={() => navigate('/login')}
                className="w-full px-5 py-2 bg-blue-500 text-white font-semibold rounded-full shadow-md hover:bg-blue-600 transition duration-300"
              >
                Iniciar Sesión
              </button>
              <button
                onClick={() => navigate('/register')}
                className="w-full px-5 py-2 border border-blue-500 text-blue-500 font-semibold rounded-full shadow-md hover:bg-blue-500 hover:text-white transition duration-300"
              >
                Únete a Nosotros
              </button>
            </nav>
          </motion.div>
        )}
      </header>

      {/* home section */}
      <section className="bg-white py-10 md:mb-10 shadow-lg">
        <div className="container max-w-screen-xl mx-auto px-4">
          {/* Contenido de la Sección Principal */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:space-x-20">
            <div className="text-center lg:text-left mt-10">
              <motion.h1
                className="font-semibold text-gray-900 text-4xl md:text-6xl leading-normal mb-6"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                Servicios Técnicos en
                <br />
                refrigeración para el hogar
              </motion.h1>
              <motion.p
                className="font-light text-gray-500 text-md md:text-lg leading-normal mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                Ofrecemos una solución confiable para contratar técnicos
                <br />
                que te ayuden con tus necesidades del hogar.
              </motion.p>
              <motion.button
                className="px-6 py-4 bg-info font-semibold text-white text-lg rounded-xl hover:bg-blue-700 transition ease-in-out duration-500"
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate('/comenzar')}
              >
                Comienza ahora
              </motion.button>
            </div>
            <motion.div
              className="mt-10 lg:mt-0"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <img src={tecnica} alt="Imagen de servicios técnicos" className="w-full max-w-md mx-auto" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* feature section */}
      <section id="sobre-nosotros" className="bg-white py-16 md:mt-10">
        <div className="container max-w-screen-xl mx-auto px-4 text-center">
          <p className="font-light text-gray-500 text-lg md:text-xl uppercase mb-6">Nuestras características</p>
          <h1 className="font-semibold text-gray-900 text-xl md:text-4xl leading-normal mb-10">
            Te ofrecemos soluciones para 
            <br /> tu día a día con nuestros técnicos
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              { title: "Transparentes", icon: <AiOutlineEye size={50} className="text-blue-500" />, desc: "Precios y servicios claros y accesibles." },
              { title: "Confiables", icon: <FaShieldAlt size={50} className="text-blue-500" />, desc: "Profesionales verificados y capacitados." },
              { title: "Rápidos", icon: <IoMdSpeedometer size={50} className="text-blue-500" />, desc: "Servicios rápidos y sin complicaciones." },
            ].map(({ title, icon, desc }, index) => (
              <div
                key={index}
                className="text-center shadow-lg p-8 rounded-lg"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 text-blue-500 flex items-center justify-center rounded-full">
                    {icon}
                  </div>
                </div>
                <h4 className="font-semibold text-xl text-gray-900 mb-4">{title}</h4>
                <p className="font-light text-gray-500 text-md mb-4">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services section */}
      <section id="ultimos-servicios" className="bg-white py-16">
        <div className="container max-w-screen-xl mx-auto px-4">
          <h1 className="font-semibold text-gray-900 text-xl md:text-4xl text-center mb-16">Te ofrecemos los siguientes servicios:</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
            {[
              { title: "Mantenimiento de Aires Acondicionados", desc: "Servicio de mantenimiento preventivo y correctivo para aires acondicionados.", icon: <FaFan size={40} className="text-blue-500" /> },
              { title: "Reparación de Aires Acondicionados", desc: "Servicio de reparación especializado para aires acondicionados.", icon: <FaTools size={40} className="text-blue-500" /> },
              { title: "Mantenimiento de Refrigeradores", desc: "Servicio de limpieza y mantenimiento para refrigeradores.", icon: <FaSnowflake size={40} className="text-blue-500" /> },
              { title: "Reparación de Refrigeradores", desc: "Servicio de reparación y ajuste para refrigeradores.", icon: <FaThermometerHalf size={40} className="text-blue-500" /> },
              { title: "Próximamente", desc: "Más servicios estarán disponibles pronto.", icon: <FaTools size={40} className="text-gray-400" /> },
            ].map(({ title, desc, icon }, index) => (
              <motion.div
                key={index}
                className="shadow-lg rounded-lg overflow-hidden bg-gray-50 p-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex justify-center mb-4">
                  {icon}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-center">{title}</h3>
                <p className="text-gray-500 text-center">{desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex items-center justify-center">
          <motion.button 
              className="px-7 py-5 font-semibold bg-gray-100 text-gray-900 rounded-2xl hover:bg-gray-300 hover:text-gray-600 transition ease-in-out duration-500"
              whileHover={{ scale: 1.05 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Regresar al Inicio
            </motion.button>
          </div>
        </div>
      </section>

      {/* footer section */}
      <footer className="bg-white py-16 text-white">
        <div className="container max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col lg:flex-row lg:justify-between items-center lg:items-start">
            {/* Logo y Misión */}
            <div className="space-y-7 mb-10 lg:mb-0 text-center lg:text-left">
              <div className="flex justify-center lg:justify-start">
              <img src={logo} alt="Logo" style={{ width: '120px', height: '40px' }} />
              </div>
              <p className="font-light text-gray-500 text-md md:text-lg mr-10">
                Ofrecemos servicios técnicos de confianza para ayudarte a mantener y reparar los sistemas esenciales de tu hogar de manera profesional y segura.
              </p>
            </div>

            {/* Información de Contacto */}
            <div className="space-y-5 text-center lg:text-left">
              <h4 className="font-semibold text-black text-lg md:text-2xl">Contáctanos</h4>
              <p className="font-light text-gray-400">Email: contacto@airtecs.com</p>
              <p className="font-light text-gray-400">Teléfono: +52 9993487512</p>
              <p className="font-light text-gray-400">Dirección: Calle 60 123 Col. Centro, Mérida, Yucatán</p>
            </div>
          </div>
        </div>
      </footer>

          </div>
  );
};

export default LandingPage;
