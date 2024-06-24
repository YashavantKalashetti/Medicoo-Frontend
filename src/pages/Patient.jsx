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

export default function Patient() {

    const [formattedDate, setFormattedDate] = useState('');
    const [patientgender, setPatientGender] = useState('');
    const [patientname, setPatientName] = useState('');
    const [otherhealthdetails, setOtherHealthDetails] = useState(''); // [height, weight, blood pressure, heart rate, blood group, id]

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

    const appointments = [

        {
            date: '12 March 2021',
            consultation_type: 'In-Person',
            reason: 'Admoninal Pain',
            record: 'Download'
        },
        {
            date: '12 March 2021',
            consultation_type: 'In-Person',
            reason: 'Fever',
            record: 'Download'
        },
        {
            date: '12 March 2021',
            consultation_type: 'In-Person',
            reason: 'Headache',
            record: 'Download'
        },
    ]

    // dummy data

    const medications = [
        {
            name: 'Paracetamol',
            dosage: '500mg',
            frequency: 3,
            duration: '3 days',
            notes: 'After Meal'
        },
        {
            name: 'Dolo',
            dosage: '650mg',
            frequency: 3,
            duration: '1 Week',
            notes: 'Before Bedtime'
        },
        {
            name: 'Crocin',
            dosage: '250mg',
            frequency: 4,
            duration: '2 months',
            notes: 'After Breakfast'
        },
    ]

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTIxNjYyNC1jZDhmLTRhYjYtYTg0MS0xNDI3NTY5ZTVmNDMiLCJyb2xlIjoiUEFUSUVOVCIsImVtYWlsIjoieWFzaHdhbnQ0NEBnbWFpbC5jb20iLCJpYXQiOjE3MTkwNDczOTIsImV4cCI6MTcxOTQ3OTM5Mn0.rxEF_31q1BGLIH0QV1FJXWSmT0l2sez6JHlbUXRGnuk'

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjRiODI5NS1iZWQxLTRjMDgtYTRhZC0xNGZiMjY4ZmRlOWUiLCJyb2xlIjoiUEFUSUVOVCIsImVtYWlsIjoieWFzaHdhbnQ0NEBnbWFpbC5jb20iLCJpYXQiOjE3MTkwNjYwOTEsImV4cCI6MTcxOTQ5ODA5MX0.0-maQD3nv24hBTGFqTzUK-iolbFNjTAz80plqIMjIzA';
                const url = 'https://medicoo.onrender.com/api/v1/patient';

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // genral indo
                const patientData = response.data.patient;
                setPatientName(patientData.name);
                setPatientGender(patientData.gender);
                const formattedDate = new Date(patientData.dob).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }).replace(/ /g, '-');

                setFormattedDate(formattedDate);


                console.log("Patient Details:", patientData.name, formattedDate, patientData.gender);
                console.log(response.data);

                // other details
                const medicalDetails = response.data.medicalDetails;
                setOtherHealthDetails(medicalDetails);


            } catch (error) {
                console.error('There was an error making the request!', error);
            }
        };

        fetchData();
    }, []);


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
                                    <p className='text-base font-bold text-gray-700 px-1 age'>{patientgender}</p>
                                </div>
                                <div className="gender bg-slate-100 rounded-xl w-[135px] p-2">
                                    <p className='text-sm text-slate-500 head' >Date of Birth</p>
                                    <p className='text-base font-bold text-gray-700 px-1 age'>{formattedDate}</p>
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
                                    <div className="lab-icon rounded-full mt-4 p-3 bg-gray-100 ">
                                        <MdNorthEast />
                                    </div>
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
                                        reports.map((report, index) => (
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
                                        {
                                            appointments.map((appointment, index) => (
                                                <TableRow key={index}>
                                                    <TableCell className="text-datex">{appointment.date}</TableCell>
                                                    <TableCell className="text-datex">{appointment.consultation_type}</TableCell>
                                                    <TableCell className="text-datex">{appointment.reason}</TableCell>
                                                    <TableCell className="">
                                                        <a href={appointment.record} download >
                                                            <FiDownload className='ml-2' />
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        }
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
                                        <div className="lab-icon rounded-full p-3 bg-gray-100 mr-3 cursor-pointer transition duration-300 ease-in-out transform hover:bg-gray-200 hover:shadow-lg hover:scale-105">
                                            <MdNorthEast className="transition duration-300 ease-in-out hover:text-gray-700" />
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <p className='mt-4 ml-2 text-base font-bold text-gray-700 px-1 age ' >Current Medications (3)</p>
                            <div className="medicines-list mt-4">
                                {
                                    medications.map((medication, index) => (
                                        <div className="medicines flex ml-2 mb-5 bg-slate-50 p-3 rounded-2xl items-center mr-6" key={index} >
                                            <div className="lab-icon rounded-full  p-3 bg-violet-100 ">
                                                <PiPillLight />
                                            </div>
                                            <p className='ml-5 mr-2 ph-head' >{medication.name}</p>
                                            <p className='text-sm -mt-1 text-slate-400'>{medication.dosage}</p>
                                            <div className="medication-freq ">
                                                {medication.frequency}x
                                            </div>
                                            <div className="medication-duration ml-2 text-sm durationx ">
                                                {medication.duration}

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
