import { Heart, HeartPulse } from "lucide-react";


const Footer = ()=>{
  const year = new Date().getFullYear();
  const siteName = import.meta.env.VITE_APP_NAME;

    return (
        <footer className="bg-gray-800 text-white mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <HeartPulse className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">{siteName}</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">About Us</a>
              <a href="#" className="hover:text-blue-400">Contact</a>
              <a href="#" className="hover:text-blue-400">Privacy Policy</a>
              <a href="#" className="hover:text-blue-400">Terms of Service</a>
            </div>
          </div>
          <p className="mt-4 text-center text-gray-400">© {year} {siteName}. All rights reserved.</p>
        </div>
      </footer>
    );
}

export default Footer;