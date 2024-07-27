import React from 'react';
import { useLocation } from 'react-router-dom';
import { format, parseISO } from 'date-fns';

const AppointmentDetail = () => {
  const location = useLocation();
  const { appointment } = location.state || {};

  if (!appointment) {
    return <div className="text-center py-10">Appointment not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Appointment Details</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Patient Details</h2>
        <p><strong>Name:</strong> {appointment.patient.name}</p>
        <p><strong>Age:</strong> {appointment.patient.age}</p>
        <p><strong>Gender:</strong> {appointment.patient.gender}</p>
        <p><strong>Contact Number:</strong> {appointment.patient.contactNumber}</p>
      </div>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold">Appointment Details</h2>
        <p><strong>Date:</strong> {format(parseISO(appointment.date), 'PP')}</p>
        <p><strong>Time:</strong> {format(parseISO(appointment.date), 'p')}</p>
        <p><strong>Reason:</strong> {appointment.reason}</p>
        <p><strong>Status:</strong> {appointment.status}</p>
        <p><strong>Mode:</strong> {appointment.mode}</p>
        <p><strong>Hospital ID:</strong> {appointment.hospitalId || '-'}</p>
      </div>
    </div>
  );
};

export default AppointmentDetail;

