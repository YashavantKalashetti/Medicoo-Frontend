
import NotificationComponent from '@/Auth/Notification'
import Navbar from './LandingPage/Navbar'
import { Outlet } from 'react-router-dom'
import EmergencyButton from '@/Partials/EmergencyButton'
import EmergencyNotificationButton from '@/Partials/EmergencyButton'
import Footer from './LandingPage/Footer'
import { ThemeProvider } from 'next-themes'

export default function Mainpage() {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
          <Outlet/>
        <Footer />
      </ThemeProvider>
    </div>
  )
}
