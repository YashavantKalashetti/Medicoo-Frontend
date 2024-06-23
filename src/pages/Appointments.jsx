import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FiDownload, FiCalendar, FiClock } from 'react-icons/fi';
import '../css/appointment.css'

export default function Appointments() {


  // dummy data

  const appointments = [
    {
      id: "49789e98-ea4b-4590-9929-317282f0fbf3",
      date: "2024-06-22T19:00:00.000Z",
      reason: "Nausea",
      mode: "ONLINE"
    },
    {
      id: "77b2b0c6-ead6-438b-b885-b028f0c8e4a3",
      date: "2024-06-23T14:00:00.000Z",
      reason: "Headache",
      mode: "IN_PERSON"
    },
    {
      id: "85d8be27-b9b7-45e4-a0de-0a8fb9c7e8d4",
      date: "2024-06-24T09:30:00.000Z",
      reason: "Fever",
      mode: "ONLINE"
    },
    {
      id: "9c8d8f0a-29e5-4d57-9e2a-ef2db7d034ba",
      date: "2024-06-25T11:00:00.000Z",
      reason: "Cough",
      mode: "IN_PERSON"
    },
    {
      id: "b0a6b46f-9f93-4de4-812d-8d8c2d0d60cb",
      date: "2024-06-26T16:00:00.000Z",
      reason: "Back Pain",
      mode: "ONLINE"
    },
    {
      id: "e5d6dbe5-2d6a-4b5e-9c94-56c3f2b1a7e3",
      date: "2024-06-27T10:30:00.000Z",
      reason: "Stomach Ache",
      mode: "IN_PERSON"
    },
    {
      id: "f8c6fb8c-d0b3-4d7b-8e55-b86fb8c2e9e2",
      date: "2024-06-28T15:00:00.000Z",
      reason: "Sore Throat",
      mode: "ONLINE"
    },
    {
      id: "1a8a4d7d-2c4b-4f7b-8a8a-3a9a7a9a7b8b",
      date: "2024-06-29T13:00:00.000Z",
      reason: "Fatigue",
      mode: "IN_PERSON"
    },
    {
      id: "2b8b4c7c-3d5b-4e7c-9a9a-4a8a8a8a8a8a",
      date: "2024-06-30T17:00:00.000Z",
      reason: "Dizziness",
      mode: "ONLINE"
    },
    {
      id: "3c7c5d7d-4e6c-5f8d-9b9b-5a9a9a9a9a9a",
      date: "2024-07-01T12:00:00.000Z",
      reason: "Allergy",
      mode: "IN_PERSON"
    }
  ];

  // console.log(appointments);


  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (dateString) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  return (
    <div className="m-16  min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center drop-shadow-lg gradient-text">
        Your Appointments
      </h1>
      <Card className="max-w-4xl mx-auto p-6 pt-10">
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Date & Time</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Record</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-slate-50 transition-colors">
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-blue-500" />
                      <span>{formatDate(appointment.date)}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                      <FiClock className="text-blue-400" />
                      <span>{formatTime(appointment.date)}</span>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.reason}</TableCell>
                  <TableCell className=''>
                    <Badge variant={appointment.mode === 'ONLINE' ? 'default' : 'secondary'} >
                      {appointment.mode}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button className="p-2 hover:bg-indigo-100 rounded-full transition-colors">
                      <FiDownload className="text-indigo-600" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}