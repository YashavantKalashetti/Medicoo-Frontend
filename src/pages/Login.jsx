import { Input } from '@/components/ui/input'
import { Label } from "@/components/ui/label"
import '../css/login.css'
// import { Input } from "@/components/ui/input"


export default function Login() {
    return (
        <div>
            <div className="login-container">
                <div className="login-img mt-10 flex flex-col ">
                    <img src="group-portrait-Photoroom.png-Photoroom.png" alt="" />
                    <div className="somesentence ">
                        <p className='text-left'>We're here to make your healthcare experience as smooth as possible. Sign in and let's get started!</p>
                    </div>
                </div>
                <div className="login-form flex items-center flex-col">
                    <div className="login-items mt-16">
                        <div className="login-header flex gap-4">
                            <h2 className='text-2xl ml-12 loginn'>Login as </h2>
                            <select name="" id="" className='custom-select '>
                                <option value="Patient">Patient</option>
                                <option value="Doctor">Doctor</option>
                                <option value="Hospital">Hospital</option>
                            </select>
                        </div>
                        <div className="login-credentials mt-16 flex flex-col gap-6">
                            <div className="email">

                                <Label htmlFor="email">Email</Label>
                                <Input type="email" id="email" placeholder="Email" />
                            </div>
                            <div className="password">
                                <Label htmlFor="password">Password</Label>
                                <Input type="password" id="password" placeholder="Password" />

                            </div>
                            <div className="submitbtn">
                                <button className="bg-primary text-white w-full h-10 rounded-md">Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
