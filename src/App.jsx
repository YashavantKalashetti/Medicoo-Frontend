import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Patient from './pages/Patient';
import Mainpage from './pages/Mainpage';
import Appointments from './pages/Appointments';
import MedicationsPage from './pages/Medications';
import DoctorSearchPage from './pages/Doctors';
// import Medications from './pages/Medications';
// import Appointments from './pages/Appointments';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Mainpage />} >
            <Route index element={<HomePage />} />
          </Route>
          <Route path="/patient" element={<Patient />} />
          <Route path="/doctor" element={<DoctorSearchPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/patient/appointments" element={<Appointments />} />
          <Route path="/patient/medications" element={<MedicationsPage />} />

        </Routes>
      </Router>
    </>
  )
}

export default App
