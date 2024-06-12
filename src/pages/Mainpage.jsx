
import Navbar from './Navbar'
import { Outlet } from 'react-router-dom'

export default function Mainpage() {
  return (
    <div>
        <Navbar />
        <Outlet/>
    </div>
  )
}
