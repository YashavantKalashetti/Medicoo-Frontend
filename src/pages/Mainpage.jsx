
import NotificationComponent from '@/Auth/Notification'
import Navbar from './LandingPage/Navbar'
import { Outlet } from 'react-router-dom'
import EmergencyNotificationSystem from '@/Partials/EmergencyNotificationPopUp'

export default function Mainpage() {
  return (
    <div>
        <Navbar />
        <EmergencyNotificationSystem />
        <Outlet/>
    </div>
  )
}
