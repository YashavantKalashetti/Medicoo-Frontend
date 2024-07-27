import React, { useState, useEffect, useMemo } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, User, Phone, Hospital, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';

const AppointmentRow = ({ appointment }) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{appointment.patient.name}</div>
      <div className="text-sm text-muted-foreground">
        {appointment.patient.age} years, {appointment.patient.gender}
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center">
        <Phone className="w-4 h-4 mr-2" />
        {appointment.patient.contactNumber}
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center">
        <Calendar className="w-4 h-4 mr-2" />
        {format(parseISO(appointment.date), 'PP')}
      </div>
      <div className="flex items-center text-sm text-muted-foreground">
        <Clock className="w-4 h-4 mr-2" />
        {format(parseISO(appointment.date), 'p')}
      </div>
    </TableCell>
    <TableCell>{appointment.reason}</TableCell>
    <TableCell>
      <Badge variant={appointment.status === 'NORMAL' ? 'secondary' : 'destructive'}>
        {appointment.status}
      </Badge>
    </TableCell>
    <TableCell>
      <Badge variant={appointment.mode === 'ONLINE' ? 'success' : ''}>
        {appointment.mode}
      </Badge>
    </TableCell>
    <TableCell>
      {appointment.hospitalId ? (
        <div className="flex items-center">
          <Hospital className="w-4 h-4 mr-2" />
          {appointment.hospitalId}
        </div>
      ) : (
        '-'
      )}
    </TableCell>
    <TableCell>
      <Button variant="ghost" size="sm" asChild className="p-0">
        <a href={`/doctor/appointments/${appointment.id}`} target="_blank" rel="noopener noreferrer">
          <ExternalLink className="w-4 h-4" />
        </a>
      </Button>
    </TableCell>
  </TableRow>
);

const AppointmentsTable = ({ appointments }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Patient</TableHead>
        <TableHead>Contact</TableHead>
        <TableHead>Date & Time</TableHead>
        <TableHead>Reason</TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Mode</TableHead>
        <TableHead>Hospital</TableHead>
        <TableHead className="w-[48px]">View</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {appointments.map((appointment) => (
        <AppointmentRow key={appointment.id} appointment={appointment} />
      ))}
    </TableBody>
  </Table>
);

const AppointmentsDisplay = () => {
  const [appointments, setAppointments] = useState({
    offlineAppointments: [],
    onlineAppointments: [],
    previousAppointments: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          setAppointments({
            offlineAppointments: [{
              "id": "faf919ed-dcab-4c62-8251-6e656764321c",
              "patientId": "324b8295-bed1-4c08-a4ad-14fb268fde9e",
              "doctorId": "772014c3-5bc0-4a30-9497-5708b3576675",
              "date": "2024-07-27T14:45:00.000Z",
              "reason": "Nausea",
              "createdAt": "2024-07-26T19:51:51.472Z",
              "updatedAt": "2024-07-26T19:51:51.472Z",
              "status": "NORMAL",
              "mode": "OFFLINE",
              "hospitalId": null,
              "patient": {
                "name": "Yashavant",
                "contactNumber": "8073889510",
                "gender": "MALE",
                "dob": "2003-02-22T00:00:00.000Z",
                "age": 21
              }
            }],
            onlineAppointments: [
              {
                "id": "c0d0b1ca-821c-443c-a2d0-dac8310cf588",
                "patientId": "324b8295-bed1-4c08-a4ad-14fb268fde9e",
                "doctorId": "772014c3-5bc0-4a30-9497-5708b3576675",
                "date": "2024-07-27T15:15:00.000Z",
                "reason": "Nausea",
                "createdAt": "2024-07-26T19:50:23.015Z",
                "updatedAt": "2024-07-26T19:50:23.015Z",
                "status": "IMPORTANT",
                "mode": "ONLINE",
                "hospitalId": null,
                "patient": {
                  "name": "Yashavant",
                  "contactNumber": "8073889510",
                  "gender": "MALE",
                  "dob": "2003-02-22T00:00:00.000Z",
                  "age": 21
                }
              },
              {
                "id": "e6722a37-6794-48c7-b052-847ac77205d9",
                "patientId": "324b8295-bed1-4c08-a4ad-14fb268fde9e",
                "doctorId": "772014c3-5bc0-4a30-9497-5708b3576675",
                "date": "2024-07-27T15:00:00.000Z",
                "reason": "Nausea",
                "createdAt": "2024-07-26T20:00:52.176Z",
                "updatedAt": "2024-07-26T20:00:52.176Z",
                "status": "NORMAL",
                "mode": "ONLINE",
                "hospitalId": null,
                "patient": {
                  "name": "Yashavant",
                  "contactNumber": "8073889510",
                  "gender": "MALE",
                  "dob": "2003-02-22T00:00:00.000Z",
                  "age": 21
                }
              }
            ],
            previousAppointments: []
          });
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const sortedAppointments = useMemo(() => {
    const sortAppointments = (appointments) => {
      return [...appointments].sort((a, b) => {
        if (a.status === 'IMPORTANT' && b.status !== 'IMPORTANT') return -1;
        if (a.status !== 'IMPORTANT' && b.status === 'IMPORTANT') return 1;
        return new Date(a.date) - new Date(b.date);
      });
    };

    return {
      offlineAppointments: sortAppointments(appointments.offlineAppointments),
      onlineAppointments: sortAppointments(appointments.onlineAppointments),
      previousAppointments: sortAppointments(appointments.previousAppointments),
    };
  }, [appointments]);

  if (loading) return <div className="text-center py-10">Loading appointments...</div>;
  if (error) return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    <Card className="w-full max-w-6xl mx-auto mt-10 mb-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold">Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="online" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="online">Online Appointments</TabsTrigger>
            <TabsTrigger value="offline">Offline Appointments</TabsTrigger>
            <TabsTrigger value="previous">Previous Appointments</TabsTrigger>
          </TabsList>
          <TabsContent value="online">
            {sortedAppointments.onlineAppointments.length > 0 ? (
              <AppointmentsTable appointments={sortedAppointments.onlineAppointments} />
            ) : (
              <p className="text-center py-5">No online appointments scheduled.</p>
            )}
          </TabsContent>
          <TabsContent value="offline">
            {sortedAppointments.offlineAppointments.length > 0 ? (
              <AppointmentsTable appointments={sortedAppointments.offlineAppointments} />
            ) : (
              <p className="text-center py-5">No offline appointments scheduled.</p>
            )}
          </TabsContent>
          <TabsContent value="previous">
            {sortedAppointments.previousAppointments.length > 0 ? (
              <AppointmentsTable appointments={sortedAppointments.previousAppointments} />
            ) : (
              <p className="text-center py-5">No previous appointments found.</p>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AppointmentsDisplay;