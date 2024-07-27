import React from 'react';
import { format, parseISO } from 'date-fns';
import { TableCell, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Calendar, Clock, Phone, Hospital } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AppointmentRow = ({ appointment }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/doctor/appointments/${appointment.id}`, { state: { appointment } });
  };

  return (
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
        <Button variant="ghost" size="sm" onClick={handleClick}>
          {/* <ExternalLink className="w-4 h-4" /> */}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default AppointmentRow;

