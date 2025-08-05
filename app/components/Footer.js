import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react'; 

const Footer = () => {
  return (
    <footer className="mt-10">
      <div className="bg-gray-900 py-8 text-gray-300">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} Get-a-Developer. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-white">
              <Facebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Twitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 text-center text-sm py-2 text-gray-400">
        A Project by Butt-Networks
      </div>
    </footer>
  );
};

export default Footer;
