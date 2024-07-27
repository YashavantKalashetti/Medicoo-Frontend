import React, { useContext, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Heart, User, Menu, X, HeartPulse, LogOut } from 'lucide-react';
import NotificationComponent from '@/Auth/Notification';
import EmergencyNotificationButton from '@/Partials/EmergencyButton';
import EmergencyButton from '@/Partials/EmergencyButton';
import AllSearchButton from '@/Partials/AllSearchButton';
import { AuthContext } from '@/context/AuthContext';
import { Button } from 'antd';
import { useTheme } from 'next-themes';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const {user, dispatch} = useContext(AuthContext)

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const logoutUser = () => {
    dispatch({type: 'LOGOUT'});
  }

  return (
    <nav className="bg-white shadow-sm fixed w-full z-10" style={{zIndex:"60"}}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <HeartPulse className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">Medicoo</span>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </NavLink>
              <NavLink to="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                About
              </NavLink>
              <NavLink to="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </NavLink>
                {
                  user && 
                <NavLink to={`/${user.role.toLowerCase()}`} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Dashboard
                </NavLink>
                }
              <div className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                <AllSearchButton />
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <Button onClick={logoutUser} className="rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200 flex px-4 py-5">
                <LogOut className="h-5 w-7" />
                <span className="">Logout</span>
            </Button>): (
              <Link to="/auth/login" className="rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200 flex px-4 py-2">
                <User className="h-5 w-5" />
                <span className="ml-2">Login</span>
              </Link>)}
            <div style={{display:"flex",justifyContent:"space-between", margin:"15px", width:"100px"}}>
              <EmergencyButton />
              <NotificationComponent />
            </div>
            <Button
                variant="outline"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? '🌞' : '🌙'}
            </Button>
          </div>
          <div className="flex items-center sm:hidden">
            <div style={{display:"flex",justifyContent:"space-between", marginRight:"25px", width:"100px"}}>
              <EmergencyButton />
              <NotificationComponent />
            </div> 
            <button onClick={toggleSidebar} className="text-gray-800 hover:text-gray-600 focus:outline-none focus:text-gray-600">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div> 
          <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <NavLink to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Home
            </NavLink>
            <NavLink to="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              About
            </NavLink>
            {
              user && 
            <NavLink to={`/${user.role.toLowerCase()}`} className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Dashboard
            </NavLink>
            }
            <NavLink to="/contact" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">
              Contact
            </NavLink>
            {user ? (
              <Button onClick={logoutUser} className="rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200 flex px-4 py-5">
                <LogOut className="h-5 w-5" />
                <span className="">Logout</span>
            </Button>): (
              <Link to="/auth/login" className="rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200 flex px-4 py-2">
                <User className="h-5 w-5" />
                <span className="ml-2">Login</span>
              </Link>)}
          </div>
        </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
