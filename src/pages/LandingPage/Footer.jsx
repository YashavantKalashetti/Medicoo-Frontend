import React from 'react';
import { Heart, HeartPulse, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  const siteName = import.meta.env.VITE_APP_NAME || 'Medico';

  return (
    <footer style={{bottom: "0px", }} className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold flex items-center">
              <HeartPulse className="mr-3 text-red-400" size={32} />
              {siteName}
            </h3>
            <p className="text-sm text-blue-200">Your trusted healthcare partner, providing compassionate care and innovative medical solutions.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="bg-blue-800 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-full">
                <FaFacebookF size={20} />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-full">
                <FaTwitter size={20} />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-full">
                <FaInstagram size={20} />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-blue-800 hover:bg-blue-600 transition-colors duration-300 p-2 rounded-full">
                <FaLinkedinIn size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <Heart className="mr-2 text-red-400" /> Quick Links
            </h4>
            <ul className="space-y-3">
              {['Find a Doctor', 'Our Services', 'About Us', 'Contact'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-300 transition-colors duration-300 flex items-center group">
                    <ChevronRight className="mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <Heart className="mr-2 text-red-400" /> Contact Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="mr-3 text-blue-300 flex-shrink-0" size={20} />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-3 text-blue-300 flex-shrink-0" size={20} />
                <a href="mailto:info@medico.com" className="hover:text-blue-300 transition-colors duration-300">info@medico.com</a>
              </li>
              <li className="flex items-start">
                <MapPin className="mr-3 text-blue-300 flex-shrink-0 mt-1" size={20} />
                <span>123 Healing St, Health City, MC 12345</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 flex items-center">
              <Heart className="mr-2 text-red-400" /> Legal
            </h4>
            <ul className="space-y-3">
              {['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Accessibility'].map((link) => (
                <li key={link}>
                  <a href="#" className="hover:text-blue-300 transition-colors duration-300 flex items-center group">
                    <ChevronRight className="mr-2 text-blue-400 group-hover:translate-x-1 transition-transform duration-300" size={16} />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-blue-600 text-center text-sm">
          <p>© {year} {siteName}. All rights reserved.</p>
          <p className="mt-2 text-blue-300">
            Made with <Heart className="inline text-red-400" size={16} /> by the {siteName} Team
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;