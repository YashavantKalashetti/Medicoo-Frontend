import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Patient from './pages/Patient';
import Mainpage from './pages/Mainpage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} >
            <Route index element={<HomePage />} />
          </Route>
            <Route path="/patient" element={<Patient />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App