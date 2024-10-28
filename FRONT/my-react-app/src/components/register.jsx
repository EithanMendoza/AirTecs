'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import tecnico2 from '../assets/tecnico2.png';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/autenticacion/register`, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccess('Usuario registrado correctamente');
        setError('');
      } else {
        setError('Error al registrar el usuario');
      }
    } catch (err) {
      setError('Error al registrar el usuario. Inténtelo nuevamente.');
      setSuccess('');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="font-[sans-serif] bg-gradient-to-br from-purple-700 via-indigo-800 to-blue-900 min-h-screen flex items-center justify-center p-4">
      <motion.div 
        className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="md:w-1/2 p-8 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center"
          variants={itemVariants}
        >
          <motion.img
            src={tecnico2}
            className="w-full max-w-md rounded-2xl shadow-lg"
            alt="Servicios Técnicos"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.div>

        <motion.div 
          className="md:w-1/2 p-12 bg-white"
          variants={itemVariants}
        >
          <form className="max-w-md mx-auto" onSubmit={handleRegister}>
            <motion.div 
              className="mb-12 text-center"
              variants={itemVariants}
            >
              <motion.h1 
                className="text-4xl font-bold text-gray-900 mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Registrate 
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Introduce tu información para registrarte
              </motion.p>
            </motion.div>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Nombre de Usuario
              </label>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  id="username"
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Nombre de Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </motion.svg>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Correo Electrónico
              </label>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  id="email"
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="Correo Electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ scale: 1.2, rotate: 15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </motion.svg>
              </motion.div>
            </motion.div>

            <motion.div 
              className="mb-6"
              variants={itemVariants}
            >
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Contraseña
              </label>
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <input
                  id="password"
                  type="password"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all duration-300"
                  placeholder="************"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  whileHover={{ scale: 1.2, rotate: -15 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </motion.svg>
              </motion.div>
            </motion.div>

            {error && <motion.div className="text-red-500 text-sm mb-4" variants={itemVariants}>{error}</motion.div>}
            {success && <motion.div className="text-green-500 text-sm mb-4" variants={itemVariants}>{success}</motion.div>}

            <motion.div variants={itemVariants}>
              <motion.button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(59,130,246)" }}
                whileTap={{ scale: 0.95 }}
              >
                REGÍSTRATE AHORA
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Register;