
import NotificationComponent from '@/Auth/Notification'
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'
import EmergencyNotificationSystem from '@/Partials/EmergencyNotificationPopUp'

export default function Mainpage() {
  return (
    <div>
        < NotificationComponent />
        <Navbar />
        <EmergencyNotificationSystem />
        <Outlet/>
    </div>
  )
}
