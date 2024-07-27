import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Toaster } from '@/components/ui/toaster.jsx'
// import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { AuthContextProvider } from './context/AuthContext.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
            <Route path="/*" element={<App />} /> 
        </Routes>
        <Toaster/>
      </BrowserRouter>
    </AuthContextProvider>
  </React.StrictMode>
)

// serviceWorkerRegistration.register();