import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Patient from './pages/Patient/Patient';
import Mainpage from './pages/Mainpage';
import MedicationsPage from './pages/Patient/Medications';
import DoctorSearchPage from './pages/Doctors';
import PatientSignupForm from './Auth/PatientSignup';
import DoctorSignupForm from './Auth/DoctorSignup';
import HospitalSignupForm from './Auth/HospitalSignup';
import PrescriptionForm from './pages/Forms/PrescriptionForm';
import ResetPassword from './Auth/ResetPssword';
import ReportOrganizer from './pages/Patient/Reports';
import HospitalList from './pages/Search/Hospitals';
import HospitalProfile from './pages/Search/IndividualHospital';
import HospitalDashboard from './pages/Hospital/HospitalDashboard';
import GetCoordinates from './Location/GetCoordinates.jsx';
import HealthcareLandingPage from './pages/LandingPage/LandingPage';
import About from './pages/AboutPage';
import HospitalLocator from './pages/Search/HospitalLocator';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import PatientPrescriptions from './pages/Patient/Presciptions';
import DetailedPrescription from './pages/Patient/DetailedPrescriptin';
import MedicalSignInForm from './Auth/LoginPage';
import AppointmentsDisplay from './pages/Doctor/AppointmentsDisplay';
import UnauthorizedAccess from './Auth/UnAuthorized';
import NotFound from './Auth/NotFount';
import PatientAppointments from './pages/Patient/PatientAppoinments';
import RequireAuth from './Auth/RequireAuth';
import PrescriptionsOfPatients from './pages/Doctor/PrescriptionsOfPatients';
import DocPatientDashboard from './pages/Doctor/DocPatientDashboard';
import PatientReportsPage from './pages/Doctor/PatientPeports';
import DoctorAppointmentPage from './pages/Doctor/BookAppointment';
// import DoctorAppointmentPagesx from './pages/Doctor/BookAppointment';
// import Medications from './pages/Medications';
// import Appointments from './pages/Appointments';

// Remove the 'enum' declaration




const importantPrescriptions = [
  {
      id: "285fb0c0-b12d-4897-95fd-623633485c4c",
      patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9e",
      doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
      date: "2024-07-26T05:29:07.839Z",
      attachments: [],
      instructionForOtherDoctor: "Dharamraj",
      prescriptionType: "IMPORTANT",
      status: "ACTIVE",
      displayable: false,
      createdAt: "2024-07-26T05:29:07.839Z",
      updatedAt: "2024-07-26T05:29:07.839Z",
      medications: [],
      doctor: {
          name: "Sujay Bagalur",
          specialization: "NEONATOLOGIST"
      }
  },
  {
      id: "148392fa-a120-48d5-8855-cb94bc9dc501",
      patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9e",
      doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
      date: "2024-07-01T13:12:08.308Z",
      attachments: [
          "http://res.cloudinary.com/dobgzdpic/image/upload/v1719839528/X-Ray.pdf"
      ],
      instructionForOtherDoctor: null,
      prescriptionType: "IMPORTANT",
      status: "ACTIVE",
      displayable: false,
      createdAt: "2024-07-01T13:12:08.308Z",
      updatedAt: "2024-07-01T13:12:08.308Z",
      medications: [],
      doctor: {
          name: "Sujay Bagalur",
          specialization: "NEONATOLOGIST"
      }
  }
];

const normalPrescriptions = [
  {
      id: "a9e3eb46-0071-4f62-8719-10dcb8cf7fb9",
      patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9e",
      doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
      date: "2024-07-26T05:26:06.831Z",
      attachments: [],
      instructionForOtherDoctor: "Normal Prescription",
      prescriptionType: "NORMAL",
      status: "ACTIVE",
      displayable: false,
      createdAt: "2024-07-26T05:26:06.831Z",
      updatedAt: "2024-07-26T05:26:06.831Z",
      medications: [],
      doctor: {
          name: "Sujay Bagalur",
          specialization: "NEONATOLOGIST"
      }
  },
  {
      id: "0677da49-ba55-40bc-a2eb-75c9d6b207c6",
      patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9e",
      doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
      date: "2024-07-26T05:25:02.426Z",
      attachments: [],
      instructionForOtherDoctor: "Normal Prescription",
      prescriptionType: "NORMAL",
      status: "ACTIVE",
      displayable: false,
      createdAt: "2024-07-26T05:25:02.426Z",
      updatedAt: "2024-07-26T05:25:02.426Z",
      medications: [],
      doctor: {
          name: "Sujay Bagalur",
          specialization: "NEONATOLOGIST"
      }
  }
];

function App() {

  return (
        <Routes>
          
          <Route element={<Mainpage />} >

            <Route index element={<HealthcareLandingPage />} />

            <Route path="/about" element={<About />} />
            <Route path="/services" element={<h1>About</h1>} />


            <Route path="/doctors" element={<DoctorSearchPage />} />
            <Route path="/doctors/:id" element={<DoctorAppointmentPage />} />
            <Route path="/hospitals" element={<HospitalList />} />
            <Route path="/hospitals/:id" element={<HospitalProfile />} />
            <Route path='/emergency' element={<HospitalLocator />} />


            {/* Patient */}
            <Route element={<RequireAuth allowedRoles={['PATIENT']} />}>
              <Route path="/patient" element={<Patient />} />
              <Route path="/patient/appointments" element={<PatientAppointments />} />
              <Route path="/patient/medications" element={<MedicationsPage />} />
              <Route path="patient/reports" element={<ReportOrganizer />} />
              <Route path="patient/prescriptions" element={<PatientPrescriptions />} />
              <Route path="patient/prescriptions/:id" element={<DetailedPrescription />} />
            </Route>

            {/* Doctor */}
            <Route element={<RequireAuth allowedRoles={['DOCTOR']} />}>
              <Route path="/doctor" element={<DoctorDashboard />} />
              <Route path="/doctor/appointments" element={<AppointmentsDisplay/>} />
              {/* <Route path="/doctor/appointments/:id" element={<AppointmentDetail />} /> */}
              <Route path="/p/:id" element={<DocPatientDashboard />} />
              <Route path="/p/:id/medications" element={<MedicationsPage />} />
              <Route path="/p/:id/reports" element={<PatientReportsPage />} />
              <Route path="/p/:id/prescription" element={<PrescriptionForm />} />
              <Route path="/p/:id/prescriptions" element={<PrescriptionsOfPatients />} />
            </Route>


            {/* Hospital */}
            {/* <Route element={<RequireAuth allowedRoles={['HOSPITAL']} />}> */}
              <Route path="/hospital" element={<HospitalDashboard />} />
            {/* </Route> */}

            {/* Coordinates */}
            <Route path="/coo" element={<GetCoordinates/>} />
          </Route>

          <Route path="/auth">
            {/* Auth */}
            <Route path="login" element={<MedicalSignInForm />} />
            <Route path="patient" element={<PatientSignupForm />} />
            <Route path="doctor" element={<DoctorSignupForm/>} />
            <Route path="hospital" element={<HospitalSignupForm />} />
            <Route path="reset" element={<ResetPassword />} />
          </Route>

          <Route path="unauthorized" element={<UnauthorizedAccess />} />

          <Route path="*" element={<NotFound />} />

        </Routes>
  )
}

export default App
