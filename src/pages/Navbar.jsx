import React from 'react'
import '../css/Navbar.css'
import { Button } from "@/components/ui/button"
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <div>
        <header>
            <div className="navbar">
                <div className="nav-container">
                    <div className="logo text-xl font-sans">
                        <h2>Logo</h2>
                    </div>
                    <nav>
                        <ul>
                            <li><a href="/xx">Home</a></li>
                            {/* <li><a href="/services">Services</a></li> */}
                            <li><a href="/about">Doctor</a></li>
                            <li><a href="/patient">Dashboard</a></li>
                            <li><a href="/contact">About</a></li>
                        </ul>
                    </nav>
                    <div className='signin'>
                       <Link to="/login"><Button >Sign in</Button></Link>
                    </div>
                </div>
            </div>
        </header>
    </div>
  )
}
