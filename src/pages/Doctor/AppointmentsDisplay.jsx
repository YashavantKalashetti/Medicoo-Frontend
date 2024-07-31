import React, { useState, useEffect, useMemo, useContext } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Phone, Hospital, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { AuthContext } from '@/context/AuthContext';

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in Error Boundary: ", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

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
        <a href={`/p/${appointment.patientId}`} target="_blank" rel="noopener noreferrer">
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
  const {user} = useContext(AuthContext);
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
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctor/appointments`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'withCredentials': true,
            'credentials': 'include',
            'Authorization': `Bearer ${user.access_token}`
          }
        });
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Something went wrong!');
        }

        if (data?.message === 'No appointments found') {
          setAppointments({ offlineAppointments: [], onlineAppointments: [], previousAppointments: [] });
          setLoading(false);
          return;
        }

        const { offlineAppointments, onlineAppointments, previousAppointments } = data;
        setAppointments({ offlineAppointments, onlineAppointments, previousAppointments });
        // console.log(appointments)
      } catch (err) {
        setError(err.message);
      }finally{
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const sortedAppointments = useMemo(() => {
    const sortAppointments = (appointments) => {
      return appointments
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
    <ErrorBoundary>
      <Card className="w-full max-w-6xl mx-auto mt-10 mb-7">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">Today's Appointments</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="online" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="online">Online Appointments</TabsTrigger>
              <TabsTrigger value="offline">Offline Appointments</TabsTrigger>
              <TabsTrigger value="previous">Previous Appointments</TabsTrigger>
            </TabsList>
            <TabsContent value="online">
              {sortedAppointments?.onlineAppointments?.length > 0 ? (
                <AppointmentsTable appointments={sortedAppointments.onlineAppointments} />
              ) : (
                <p className="text-center py-5">No online appointments scheduled.</p>
              )}
            </TabsContent>
            <TabsContent value="offline">
              {sortedAppointments?.offlineAppointments?.length > 0 ? (
                <AppointmentsTable appointments={sortedAppointments.offlineAppointments} />
              ) : (
                <p className="text-center py-5">No offline appointments scheduled.</p>
              )}
            </TabsContent>
            <TabsContent value="previous">
              {sortedAppointments?.previousAppointments?.length > 0 ? (
                <AppointmentsTable appointments={sortedAppointments.previousAppointments} />
              ) : (
                <p className="text-center py-5">No previous appointments found.</p>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default AppointmentsDisplay;
