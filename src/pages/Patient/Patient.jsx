import React, { useEffect, useState } from 'react';
import {
    Avatar,
    AvatarImage,
} from "@/components/ui/avatar";
// import '../css/patient.css';
import { CiLineHeight } from "react-icons/ci";
import { TbWeight } from "react-icons/tb";
import { MdOutlineBloodtype } from "react-icons/md";
import { TfiHeartBroken } from "react-icons/tfi";
import { MdOutlineModeEdit, MdNorthEast } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { GiMedicines } from "react-icons/gi";
import { IoDocumentTextOutline } from "react-icons/io5";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Phone, UserRound, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import AllergyAndMedicalHistory from './AllergyAndMedicalHistory';
import CustomLoader from '@/Partials/CustomLoader';

export default function Patient() {
    const [patient, setPatient] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [medications, setMedications] = useState([]);
    const [medicalDetails, setMedicalDetails] = useState({});
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIzMjRiODI5NS1iZWQxLTRjMDgtYTRhZC0xNGZiMjY4ZmRlOWUiLCJyb2xlIjoiUEFUSUVOVCIsImVtYWlsIjoieWFzaHdhbnRrYWxhc2hldHRpODEzMTE1MThAZ21haWwuY29tIiwiaWF0IjoxNzIyMDkwNDA4LCJleHAiOjE3MjI1MjI0MDh9.MvoLmA6S_bQaJnPsvd48PQhDby1Un4njAuTpfQ9ZhAw';
                const url = `${import.meta.env.VITE_BACKEND_URL}/patient`;
                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        withCredentials: true,
                    }
                });
                setPatient(response.data.patient);
                setAppointments(response.data.appointments);
                setMedications(response.data.medications);
                setMedicalDetails(response.data.medicalDetails);
                setReports(response.data.reports);
            } catch (error) {
                setError(error);
                console.error('There was an error making the request!', error);
            }finally{
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString().substr(-2);
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours.toString().padStart(2, '0') : '12';
        return `${day}-${month}-${year} ${hours}:${minutes} ${ampm}`;
    };

    const modeIcon = (mode) => {
        switch (mode) {
            case 'ONLINE':
                return <Wifi className="text-blue-500" />;
            case 'OFFLINE':
                return <Phone className="text-green-500" />;
            default:
                return null;
        }
    };


    if(loading) {
        return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>
    }

    if(error) {
        return <div className='flex justify-center items-center h-screen'>Error: {error}</div>
    }

    return (
        <div className='flex h-screen overflow-hidden bg-background m-10'>
            <Card className="w-[340px] h-full overflow-y-auto flex-shrink-0 rounded-none border-r">
                <CardHeader>
                    <div className="flex justify-between mb-6">
                        <div className="flex gap-3 dflex-jac">
                            <Avatar className='h-16 sm:h-20 w-16 sm:w-20 border-4 border-primary/10 mr-4 sm:mr-6'>
                                <AvatarImage src={patient.avatar} alt={patient.name} /> 
                            </Avatar>
                            <CardTitle>{patient.name}</CardTitle>
                        </div>
                        <Button variant="outline" size="icon">
                            <MdOutlineModeEdit />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <h2 className='text-lg font-semibold mb-4'>General Info</h2>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-3">
                                <p className='text-sm text-muted-foreground'>Gender</p>
                                <p className='text-base font-bold'>{patient.gender}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <p className='text-sm text-muted-foreground'>Date of Birth</p>
                                <p className='text-base font-bold'>{new Date(patient.dob).toLocaleDateString()}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <p className='text-sm text-muted-foreground'>Blood Group</p>
                                <p className='text-base font-bold'>{medicalDetails.bloodGroup || '-'}</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <p className='text-sm text-muted-foreground'>ID</p>
                                <p className='text-base font-bold'># {patient.patient_number}</p>
                            </CardContent>
                        </Card>
                    </div>
                    <h2 className='text-lg font-semibold mb-4'>Physical Examination</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-3">
                                <div className="icon rounded-full p-2 bg-secondary w-[35px] mb-2"><CiLineHeight /></div>
                                <p className='text-sm text-muted-foreground'>Height</p>
                                {
                                    medicalDetails.height ? <p className='text-base font-bold'>{medicalDetails.height} ft</p> : <p>-</p>
                                }
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <div className="icon rounded-full p-2 bg-secondary w-[35px] mb-2"><TbWeight /></div>
                                <p className='text-sm text-muted-foreground'>Weight</p>
                                {
                                    medicalDetails.weight ? <p className='text-base font-bold'>{medicalDetails.weight} kg</p> : <p>-</p>
                                }
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <div className="icon rounded-full p-2 bg-secondary w-[35px] mb-2"><MdOutlineBloodtype /></div>
                                <p className='text-sm text-muted-foreground'>Blood Pressure</p>
                                {
                                    medicalDetails.systolic ? <p className='text-base font-bold'>{medicalDetails.systolic} / {medicalDetails.diastolic} mmHg</p> : <p>-</p>
                                }
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-3">
                                <div className="icon rounded-full p-2 bg-secondary w-[35px] mb-2"><TfiHeartBroken /></div>
                                <p className='text-sm text-muted-foreground'>Heart Rate</p>
                                <p className='text-base font-bold'>90 bpm</p>
                            </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>
            <div className="flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                    <div className="p-6">
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">Reports</CardTitle>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link to="/patient/reports"><IoDocumentTextOutline size={24} /></Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                    {reports.slice(0, 5).map((report, index) => (
                                        <Card key={index}>
                                            <CardContent className="p-4">
                                                <Link to={report.url} className="flex items-start space-x-4">
                                                    <div className="rounded-full p-2 bg-secondary">
                                                        <MdNorthEast size={24} />
                                                    </div>
                                                    <div>
                                                        <p className='font-semibold'>{report.type}</p>
                                                        <p className='text-sm text-muted-foreground'>{formatDate(report.date)}</p>
                                                    </div>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">Upcoming Appointments</CardTitle>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link to="/patient/appointments"><FaRegCalendarAlt size={24} /></Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {appointments.slice(0, 4).map((appointment, index) => (
                                        <Card key={index} className="mb-4">
                                        <CardContent className="p-4 flex justify-between items-start">
                                          <div className="flex-1">
                                            <p className="font-semibold ml-1">{appointment.reason}</p>
                                            <p className="text-sm text-muted-foreground ml-1">{formatDate(appointment.date)}</p>
                                            <div className="flex items-center text-sm text-muted-foreground">
                                              <UserRound className="mr-1" />
                                              {appointment?.doctor?.name}
                                            </div>
                                            <div className="flex items-center text-sm text-muted-foreground mt-1">
                                              <Phone className="mr-1" />
                                              {appointment?.doctor?.contactNumber}
                                            </div>
                                          </div>
                                          <div className="flex items-center">
                                            {modeIcon(appointment.mode)}
                                          </div>
                                        </CardContent>
                                      </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="mb-6">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-xl font-bold">Medications</CardTitle>
                                <Button variant="ghost" size="icon" asChild>
                                    <Link to="/patient/medications"><GiMedicines size={24} /></Link>
                                </Button>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Medication</TableHead>
                                            <TableHead>Dosage</TableHead>
                                            <TableHead>Instruction</TableHead>
                                            <TableHead>Duration</TableHead>
                                            <TableHead>Frequency</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {medications.map((medication, index) => (
                                            <TableRow key={index}>
                                                <TableCell>{medication.medicine}</TableCell>
                                                <TableCell>{medication.dosage}</TableCell>
                                                <TableCell>{medication.instruction}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <FaRegCalendarAlt size={16} />
                                                        <span>{medication.numberOfDays} days</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-2">
                                                        <GiMedicines size={16} />
                                                        <span>{medication.numberOfTimes}x daily</span>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <AllergyAndMedicalHistory medicalDetails={medicalDetails} />
                    </div>
                </ScrollArea>
            </div>
        </div>
    );
}