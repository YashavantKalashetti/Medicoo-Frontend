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
import ReportList from './pages/Patient/Reports';
import ReportOrganizer from './pages/Patient/Reports';
import HospitalList from './pages/Search/Hospitals';
import HospitalProfile from './pages/Search/IndividualHospital';
import HospitalDashboard from './pages/Hospital/HospitalDashboard';
import GetCoordinates from './Location/GetCoordinates.jsx';
import HealthcareLandingPage from './pages/LandingPage/LandingPage';
// import Medications from './pages/Medications';
// import Appointments from './pages/Appointments';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route element={<Mainpage />} >

            <Route index element={<HealthcareLandingPage />} />

            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/services" element={<h1>About</h1>} />


            <Route path="/doctor" element={<DoctorSearchPage />} />
            <Route path="/hospitals" element={<HospitalList />} />
            <Route path="/hospitals/:id" element={<HospitalProfile />} />


            {/* Patient */}
            <Route path="/patient" element={<Patient />} />
            <Route path="/patient/appointments" element={<Appointments />} />
            <Route path="/patient/medications" element={<MedicationsPage />} />
            <Route path="patient/reports" element={<ReportOrganizer />} />

            {/* Doctor */}
            <Route path="/prescription" element={<PrescriptionForm/>} />


            {/* Hospital */}
            <Route path="/hospital" element={<HospitalDashboard />} />

            {/* Coordinates */}
            <Route path="/coo" element={<GetCoordinates/>} />
          </Route>

          <Route path="/auth">
            {/* Auth */}
            <Route path="login" element={<MedicalSignupForm />} />
            <Route path="patient" element={<PatientSignupForm />} />
            <Route path="doctor" element={<DoctorSignupForm/>} />
            <Route path="hospital" element={<HospitalSignupForm />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>


        </Routes>
      </Router>
    </>
  )
}

export default App
