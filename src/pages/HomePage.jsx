import Navbar from "./Navbar";
import '../css/homepage.css'
import { Button } from "@/components/ui/button";
import NotificationButton from "@/Auth/Notification";


export default function HomePage() {
    return (
        <div>
            
            <div className="aboutservice flex ">
                <div className="service-content w-[600px] ml-8">
                    <p className="text-2xl mb-2 ">Health before anything</p>
                    <h2 className="text-4xl font-medium mb-5 xx">Find Expert Specialist Doctors Near You!</h2>
                    <p className="mb-7">
                        Discover top-quality care tailored to your specific needs. Explore profiles
                        of experienced doctors across various specialties and easily schedule
                        appointments online.
                    </p>
                    <Button >Book Appointment Now</Button>
                    <div className="metrics mt-16 flex justify-between pt-6">
                        <div className="metric">
                            <h2 className="text-4xl font-medium">50+</h2>
                            <p>Hospitals</p>
                        </div>
                        <div className="metric">
                            <h2 className="text-4xl font-medium">100+</h2>
                            <p>Specialties</p>
                        </div>
                        <div className="metric">
                            <h2 className="text-4xl font-medium">5k+</h2>
                            <p>Reviews</p>
                        </div>
                    </div>
                </div>
                <div className="service-image mr-20 flex flex-col items-center">
                    <img src="shutterstock_1473042992-1030x687-removebg-preview.png" alt="" width="500px" className="" />
                    <div className="doc-info ml-16 flex flex-col items-center">
                        <h2 className="text-xl font-medium">Dr. Kruthika CM</h2>
                        <p className="">Cardiologist</p>
                        {/* <p className="">10+ years of experience</p> */}
                        <p className="">⭐ 4.9 rating</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
