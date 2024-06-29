import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Patient from './pages/Patient';
import Mainpage from './pages/Mainpage';
import Appointments from './pages/Appointments';
import MedicationsPage from './pages/Medications';
import DoctorSearchPage from './pages/Doctors';
import PatientSignupForm from './Auth/PatientSignup';
import DoctorSignupForm from './Auth/DoctorSignup';
import HospitalSignupForm from './Auth/HospitalSignup';
import LoginForm from './Auth/LoginPage';
import PrescriptionForm from './pages/Forms/PrescriptionForm';
import MedicalSignupForm from './Auth/LoginPage';
import ResetPassword from './Auth/ResetPssword';
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
          <Route path="/patient/appointments" element={<Appointments />} />
          <Route path="/patient/medications" element={<MedicationsPage />} />
          <Route path="/signup/patient" element={<PatientSignupForm />} />
          <Route path="/signup/doctor" element={<DoctorSignupForm/>} />
          <Route path="/signup/hospital" element={<HospitalSignupForm />} />
          <Route path="/login" element={<MedicalSignupForm />} />

          <Route path="/reset" element={<ResetPassword />} />

          <Route path="/prescription" element={<PrescriptionForm/>} />

        </Routes>
      </Router>
    </>
  )
}

export default App
