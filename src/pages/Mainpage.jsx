
import NotificationComponent from '@/Auth/Notification'
import Navbar from './LandingPage/Navbar'
import { Outlet } from 'react-router-dom'
import EmergencyNotificationSystem from '@/Partials/EmergencyNotificationPopUp'
import EmergencyButton from '@/Partials/EmergencyButton'
import EmergencyNotificationButton from '@/Partials/EmergencyButton'
import Footer from './LandingPage/Footer'

export default function Mainpage() {
  return (
    <div>
        <Navbar />
        <EmergencyNotificationButton />
        <EmergencyNotificationSystem />
        <Outlet/>
        <Footer />
    </div>
  )
}
