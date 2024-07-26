import React, { useEffect, useState } from 'react';

const DoctorDetails = () => {
  const [doctor, setDoctor] = useState(null);
  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);
  const [error, setError] = useState(null);

  const doctorId = '1260d06d-daed-415b-b1d0-01760c96bc0a';
  const userId = '1260d06d-daed-415b-b1d0-01760c96bc0a';

  useEffect(() => {
    const newSocket = new WebSocket(`http://localhost:3030/details?userId=${userId}&type=doctor&id=${doctorId}`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connection for doctor details opened');
      setSocketOpen(true);
    };

    newSocket.onmessage = (event) => {
      const { details } = JSON.parse(event.data);
      console.log('Message from doctor details:', details);
      setDoctor(details);
      setError(null);
    };

    newSocket.onerror = (event) => {
      console.error('WebSocket error for doctor details:', event);
      setError(event);
    };

    newSocket.onclose = (event) => {
      console.log('WebSocket connection for doctor details closed:', event);
      setSocketOpen(false);
      setError(event);
    };

    return () => {
      newSocket.close();
    };
  }, [userId, doctorId]);

  // Display loading message while connecting
  if (!socketOpen && !error) {
    return <div>Connecting...</div>;
  }

  // Display error message if connection failed
  if (error) {
    return (
      <div>
        <h1>Error</h1>
        <p>WebSocket connection failed: {error.message}</p>
      </div>
    );
  }

  // Display doctor details once loaded
  return (
    <div>
      <h1>Doctor Details</h1>
      {doctor ? (
        <pre>{JSON.stringify(doctor, null, 2)}</pre>
      ) : (
        <div>Loading doctor details...</div>
      )}
    </div>
  );
};

export default DoctorDetails;
