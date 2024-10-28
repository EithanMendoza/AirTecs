import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto text-center">
        <div className="flex justify-center items-center mb-6">
          <div className="text-2xl font-bold">Air Tecs</div>
        </div>
        <div className="flex justify-center items-center space-x-4 mb-6">
          <FaFacebookF className="hover:text-gray-300 cursor-pointer" />
          <FaTwitter className="hover:text-gray-300 cursor-pointer" />
          <FaLinkedinIn className="hover:text-gray-300 cursor-pointer" />
          <FaInstagram className="hover:text-gray-300 cursor-pointer" />
          <FaYoutube className="hover:text-gray-300 cursor-pointer" />
        </div>
        <div className="text-sm text-gray-200">
          <p>© {new Date().getFullYear()} Air Tecs. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
