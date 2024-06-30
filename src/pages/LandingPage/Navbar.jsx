import React from 'react'
import { Button } from "@/components/ui/button"
import { Link, NavLink } from 'react-router-dom'
import NotificationButton from '@/Auth/Notification'
import { Heart, User } from 'lucide-react'
import NotificationComponent from '@/Auth/Notification'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Heart className="h-8 w-8 text-blue-500" />
                <span className="ml-2 text-xl font-bold text-gray-800">Medicare</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <NavLink to="/" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </NavLink>
                <NavLink to="/about" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </NavLink>
                <NavLink to="/services" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Services
                </NavLink>
                <NavLink href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Contact
                </NavLink>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:items-center">

            <Link to="/auth/login" className="rounded text-gray-100 bg-gray-800 hover:text-gray-900 hover:bg-gray-200" style={{display:"flex", padding:"7px"}}>
              <User className="h-5 w-5" />
              <span className="ml-2">Login</span>
            </Link>

              {/* <Button variant="default" className="ml-4">
                Book Appointment
              </Button> */}

              < NotificationComponent className="ml-4" />

            </div>
          </div>
        </div>
      </nav>
  )
}
