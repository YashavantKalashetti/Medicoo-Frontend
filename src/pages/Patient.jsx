import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import '../css/patient.css'
import { CiLineHeight } from "react-icons/ci";
import { TbWeight } from "react-icons/tb";
import { MdOutlineBloodtype } from "react-icons/md";
import { TfiHeartBroken } from "react-icons/tfi";
import { MdOutlineModeEdit } from "react-icons/md";
import { PiFlaskLight } from "react-icons/pi";
import { MdNorthEast } from "react-icons/md";
import { GiPaperClip } from "react-icons/gi";
import { FiDownload } from "react-icons/fi";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { CiMedicalCase } from "react-icons/ci";
import { PiPillLight } from "react-icons/pi";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Phone, Wifi } from 'lucide-react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

export default function Patient() {

    const [formattedDate, setFormattedDate] = useState('');
    const [patientgender, setPatientGender] = useState('');
    const [patientname, setPatientName] = useState('');
    const [otherhealthdetails, setOtherHealthDetails] = useState({}); // Ensure it's an object
    const [medication, setMedications] = useState([]); // Ensure it's an array
    // const [reports, setReports] = useState([]); // Ensure it's an array
    const [appointments, setAppointments] = useState([]);// Ensure it's an array

    // dummy data
    const reports = [
        {
            report_name: 'Blood Test',
            date: '12th March 2021',
            report_file: 'blood-test.jpg'
        },
        {
            report_name: 'X-Ray',
            date: '12th March 2021',
            report_file: 'x-ray.jpg'
        },
        {
            report_name: 'MRI',
            date: '12th March 2021',
            report_file: 'mri.jpg'
        },
        {
            report_name: 'Complete Blood Count',
            date: '12th March 2021',
            report_file: 'cbc.jpg'
        }

    ]

    // dummy data


    const modeIcon = (mode) => {
        switch (mode) {
            case 'ONLINE':
                return <Wifi className="text-blue-500" />;
            case 'OFFLINE':
                return <Phone className="text-green-500" />;
            default:
                return <AiOutlineCloseCircle className="text-red-500" />;
        }
    };

    // dummy data


    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTIxNjYyNC1jZDhmLTRhYjYtYTg0MS0xNDI3NTY5ZTVmNDMiLCJyb2xlIjoiUEFUSUVOVCIsImVtYWlsIjoieWFzaHdhbnQ0NEBnbWFpbC5jb20iLCJpYXQiOjE3MTkwNDczOTIsImV4cCI6MTcxOTQ3OTM5Mn0.rxEF_31q1BGLIH0QV1FJXWSmT0l2sez6JHlbUXRGnuk'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjRiODI5NS1iZWQxLTRjMDgtYTRhZC0xNGZiMjY4ZmRlOWUiLCJyb2xlIjoiUEFUSUVOVCIsImVtYWlsIjoieWFzaHdhbnQ0NEBnbWFpbC5jb20iLCJpYXQiOjE3MjE4ODYxOTQsImV4cCI6MTcyMjMxODE5NH0.9Wf20XeVfv8H9nfzlpveSZCIr1Z8B2Pu4jacPBtWflY';
                const url = 'http://localhost:3030/api/v1/patient';

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log(response.data);
                const patientData = response.data.patient;
                setPatientName(patientData.name);
                setPatientGender(patientData.gender);
                setAppointments(response.data.appointments || []);

                const formattedDate = new Date(patientData.dob).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }).replace(/ /g, '-');
                setFormattedDate(formattedDate);

                setOtherHealthDetails(patientData.medicalDetails || {});

                setMedications(response.data.medications || []);
                // console.log(response.data.medications);
                // setReports(response.data.reports || []);
                // setAppointments(response.data.appointments || []);

            } catch (error) {
                console.error('There was an error making the request!', error);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0 indexed
        const year = date.getFullYear().toString().substr(-2); // Get last 2 digits of year
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours.toString().padStart(2, '0') : '12'; // the hour '0' should be '12'
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };



    return (
        <div className='flex mt-4 '>
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="pateintdash mx-10 mt-8 mb-10  rounded-2xl ">
                <div className="dash_cards mb-4 flex">
                    <div className="patientInfo w-[340px] bg-white p-2 px-4 pb-4 rounded-2xl">
                        <div className="self flex  justify-between ">
                            <div className="pho-name flex gap-3">
                                <Avatar className='mt-2'>
                                    <AvatarImage src="Bob_29.webp" alt="@shadcn" />
                                    {/* <AvatarFallback>CNcgfvbnm</AvatarFallback> */}
                                </Avatar>
                                <p className='font-bold font text-lg pat_name '>{patientname}</p>
                            </div>
                            <div className="edit-icon mr-3 mt-4 rounded-full p-3 py-2 bg-stone-100 h-[35px]">
                                <MdOutlineModeEdit />
                            </div>
                        </div>

                        <div className="other_info mt-6">
                            <h2 className='  ph-head'>General Info</h2>
                            <div className="metriccs mt-4 flex flex-wrap gap-5">
                                <div className="gender bg-slate-100 rounded-xl w-[135px] p-2">
                                    <p className='text-sm text-slate-500 head' >Gender</p>
                                    <p className='text-base font-bold text-gray-700 px-1 age'>{patientgender || "Male"}</p>
                                </div>
                                <div className="gender bg-slate-100 rounded-xl w-[135px] p-2">
                                    <p className='text-sm text-slate-500 head' >Date of Birth</p>
                                    <p className='text-base font-bold text-gray-700 px-1 age'>{formattedDate || "22 Feb 2003"}</p>
                                </div>
                                <div className="gender bg-slate-100 rounded-xl w-[135px] p-2">
                                    <p className='text-sm text-slate-500 head' >Blood Group</p>
                                    <p className='text-base font-bold text-gray-700 px-1 age'>{otherhealthdetails.bloodGroup || "O+"}</p>
                                </div>
                                <div className="gender bg-slate-100 rounded-xl w-[135px] p-2">
                                    <p className='text-sm text-slate-500 head' >ID</p>
                                    <p className='text-base font-bold text-gray-700 px-1 age'>#268</p>
                                </div>
                            </div>
                            <div className="physical-info mt-6">
                                <h2 className='ph-head'>Physical Examination</h2>
                                <div className="pys flex flex-wrap gap-5">
                                    <div className="height bg-slate-50 mt-4 w-[135px] px-2 py-4 rounded-2xl ">
                                        <div className="icon rounded-full p-2 bg-zinc-200 w-[35px] mb-6"><CiLineHeight /></div>
                                        <p className='text-sm text-slate-500 headx' >Height</p>
                                        {/* <p className='text-base font-bold text-gray-700 px-1 age'>5'7"  <span className='si'>cm</span></p> */}
                                        <p className='text-base font-bold text-gray-700 px-1 age'>{otherhealthdetails.height || "5.7"}  <span className='si'>ft</span></p>
                                    </div>
                                    <div className="height bg-slate-50 mt-4 w-[135px] px-2 py-4 rounded-2xl ">
                                        <div className="icon rounded-full p-2 bg-zinc-200 w-[35px] mb-6"><TbWeight /></div>
                                        <p className='text-sm text-slate-500 headx' >Weight</p>
                                        <p className='text-base font-bold text-gray-700 px-1 age'>{otherhealthdetails.weight || "60"}   <span className='si'>kg</span></p>
                                    </div>
                                    <div className="height bg-slate-50 mt-4 w-[135px] px-2 py-4 rounded-2xl ">
                                        <div className="icon rounded-full p-2 bg-zinc-200 w-[35px] mb-6"><MdOutlineBloodtype /></div>
                                        <p className='text-sm text-slate-500 headx' >Blood Pressure</p>
                                        <p className='text-base font-bold text-gray-700 px-1 age'>{otherhealthdetails.systolic || "120"} /{otherhealthdetails.diastolic || "80"}  <span className='si'>mm</span></p>
                                    </div>
                                    <div className="height bg-slate-50 mt-4 w-[135px] px-2 py-4 rounded-2xl  ">
                                        <div className="icon rounded-full p-2 bg-zinc-200 w-[35px] mb-6"><TfiHeartBroken /></div>
                                        <p className='text-sm text-slate-500 headx' >Heart Rate</p>
                                        <p className='text-base font-bold text-gray-700 px-1 age'>90 <span className='si'>bpm</span></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="2ndsection mx-12 ">
                        <div className="reports p-2 px-4 pb-4 bg-white w-[490px] rounded-2xl mb-4 ">
                            <div className="report_head flex justify-between">
                                <div className="fd flex">
                                    <div className="lab-icon rounded-full mt-4 p-3 bg-blue-100 ">
                                        <PiFlaskLight />
                                    </div>
                                    <div className="reports_head">
                                        <h2 className='text-lg font-bold text-gray-700 mt-6 mx-3 hxx '>Reports</h2>
                                    </div>
                                </div>
                                <div className="all-reports-icon">
                                    <Link to="/patient/reports">
                                        <div className="lab-icon rounded-full p-3 bg-gray-100 mr-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-200 hover:shadow-lg hover:scale-105">
                                            <MdNorthEast className="transition duration-300 ease-in-out hover:text-gray-700" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div className="report-body mt-6 flex">
                                <div className="recent-report">
                                    <div className="recent-report-head flex flex-wrap px-2 py-3 bg-gray-100 w-[190px]">
                                        <p className="ph-headx">
                                            Abdominal Ultrasound
                                        </p>
                                        <div className="lab-icon mt-1 ml-3 text-sm">
                                            <GiPaperClip />
                                        </div>
                                        <p className="text-date text-gray-500 mt-2">12th March 2021</p>
                                        <img src="pelvic-ultra.jpg" alt="" />
                                    </div>
                                    <div className="date-report">
                                    </div>
                                </div>
                                <div className="recent-report-list flex-1 mt-2 ml-6">
                                    {
                                        (reports || []).map((report, index) => (
                                            <div className="report-table flex justify-between mr-4 gap-6 border-b-1" key={index}>
                                                <div className="report_infos">
                                                    <p className='ph-headx'>{report.report_name}</p>
                                                    <p className='text-date'>{report.date}</p>
                                                </div>
                                                <div className="report_download mt-2">
                                                    <a href={report.report_file} download>
                                                        <FiDownload />
                                                    </a>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="appointments p-2 px-4 pb-4 bg-white w-[490px] rounded-2xl">
                            <div className="appointment-header flex  justify-between mb-4">
                                <h2 className='mt-2 mx-4 text-lg font-bold text-gray-700 '>Appointments</h2>
                                <Link to="/patient/appointments">
                                    <div className="lab-icon rounded-full p-3 bg-gray-100 mr-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-200 hover:shadow-lg hover:scale-105">
                                        <MdNorthEast className="transition duration-300 ease-in-out hover:text-gray-700" />
                                    </div>
                                </Link>
                            </div>
                            <div className="tableappoint -pb-3">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Consultation Type</TableHead>
                                            <TableHead>Reason</TableHead>
                                            <TableHead>Record</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {(appointments || []).map((appointment, index) => (
                                            <TableRow key={index}>
                                                <TableCell className="text-datex">{formatDate(appointment.date)}</TableCell>
                                                <TableCell className="text-datex flex items-center">
                                                    {modeIcon(appointment.mode)}
                                                    <span className="ml-2">{appointment.mode}</span>
                                                </TableCell>
                                                <TableCell className="text-datex">{appointment.reason}</TableCell>
                                                <TableCell className="">
                                                    <a href={appointment.record} download>
                                                        <FiDownload className='ml-2 text-blue-600' />
                                                    </a>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                    <div className="3rdsection">
                        <div className="reports p-2 px-4 pb-4 bg-white w-[490px] rounded-2xl mb-4 ">
                            <div className="report_head flex justify-between">
                                <div className="fd flex">
                                    <div className="lab-icon rounded-full mt-4 p-3 bg-blue-100 ">
                                        <CiMedicalCase />
                                    </div>
                                    <div className="reports_head">
                                        <h2 className='text-lg font-bold text-gray-700 mt-6 mx-3 hxx '>Medications</h2>
                                    </div>
                                </div>
                                <div className="all-reports-icon">
                                    <Link to="/patient/medications">
                                        <div className="lab-icon rounded-full p-3 mt-4 bg-gray-100 mr-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-200 hover:shadow-lg hover:scale-105">
                                            <MdNorthEast className="transition duration-300 ease-in-out hover:text-gray-700" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <p className='mt-4 ml-2 text-base font-bold text-gray-700 px-1 age ' >Current Medications (3)</p>
                            <div className="medicines-list mt-4">
                                {
                                    (medication || []).map((medic, index) => (
                                        <div className="medicine-item flex ml-2 mb-5 bg-white p-3 rounded-2xl items-center shadow-md" key={index}>
                                            <div className="lab-icon rounded-full p-3 bg-violet-200">
                                                <PiPillLight />
                                            </div>
                                            <div className="medication-details ml-5">
                                                <p className="medication-name font-semibold text-gray-700">{medic.medicine}</p>
                                                <p className="medication-dosage text-sm text-gray-500">{medic.dosage}</p>
                                            </div>
                                            <div className="medication-info flex items-center ml-auto">
                                                <div className="medication-freq text-gray-700">{medic.numberOfTimes}x</div>
                                                <div className="medication-duration text-gray-700">{medic.numberOfDays}</div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// medications , prescriptions 
