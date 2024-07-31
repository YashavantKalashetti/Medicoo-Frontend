import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BellRing, Hospital, Loader2, Mail, MapPin, Navigation, Phone, Stethoscope } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';

const HospitalLocator = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();
  const [notifying, setNotifying] = useState(false);

  const patientId = "324b8295-bed1-4c08-a4ad-14fb268fde9e"

  const fetchHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(`http://localhost:3030/api/v1/search/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }
      const data = await response.json();
      setHospitals(data.hospitals);
    } catch (error) {
      setError('Error fetching hospitals: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGeolocation = () => {
    setLoading(true);
    setError(null);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({ 
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          fetchHospitals(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLoading(false);
          if (error.code === error.PERMISSION_DENIED) {
            setPermissionDenied(true);
            setError('Location access denied. Please enable location services.');
          } else {
            setError('Error getting location: ' + error.message);
          }
        }
      );
    } else {
      setLoading(false);
      setError('Geolocation is not supported by your browser');
    }
  };

  useEffect(() => {
    handleGeolocation();
  }, []);

  const sendNotification = async (hospitalId) => {
    if(notifying){
      window.alert('Notification currently in progress');
      return;
    }
    try {
      if(!patientId){
        message.info('Please Login in. It would be easy to locate and get your details.')
      }
      setNotifying(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/emergency-consult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude,
          longitude: location.longitude,
          hospitalId,
          patientId,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      const data = await response.json();
      if(data.message.includes('offline') || data.message.includes('unreachable') || data.message.includes('not')){
        message.error(data.message);
      }else{
        message.success(data.msg);
      }
    } catch (error) {
      message.error(`Hospital could not be alerted`);
    }finally{
      setNotifying(false);
    }
  }


  return (
    <div className="p-4 mx-auto mt-5 dark:bg-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Hospital Locator</h1>
      <div className="flex items-center justify-center">
        {location && (
          <h3 className="m-5 text-xl">
            Coordinates : {location.latitude}, {location.longitude}
          </h3>
        )}
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4 dark:bg-red-900">
          <AlertDescription className="dark:text-gray-100">{error}</AlertDescription>
        </Alert>
      )}

      {permissionDenied && (
        <div className="mt-4 flex justify-center">
          <Button >Enable Location Access in the browser</Button>
        </div>
      )}

      {hospitals.length > 0 && (
        <div className="mt-4 space-y-4">
          {hospitals.map((hospital) => (
            <Card key={hospital.id} className="p-4 border dark:border-black bg-gray-100 dark:bg-gray-700">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Hospital className="mr-2 text-blue-500 dark:text-blue-300" />
                    {hospital.name}
                  </span>
                  <div className="flex space-x-2">
                    <button onClick={() => navigate(`/hospitals/${hospital.id}`)} className="m-1 rounded-full p-2 bg-blue-500 dark:bg-blue-700">
                      <Navigation className="text-white" />
                    </button>
                    <button onClick={()=> sendNotification(hospital.id)} className="m-1 rounded-full p-2 bg-red-500 dark:bg-red-700">
                      <BellRing className="text-white" />
                    </button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center mb-2"><Phone className="mr-2" /> {hospital.contactNumber}</p>
                <p className="flex items-center mb-2"><Mail className="mr-2" /> {hospital.email}</p>
                <p className="flex items-center mb-2"><MapPin className="mr-2" /> {hospital.address}</p>
                <p className="flex items-center"><Stethoscope className="mr-2" /> {hospital.speciality}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalLocator;
