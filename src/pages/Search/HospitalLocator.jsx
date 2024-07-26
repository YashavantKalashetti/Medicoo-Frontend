import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BellRing, Hospital, Loader2, Loader2Icon, Mail, MapPin, Navigation, Phone, Stethoscope, UserRound, UserRoundX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { set } from 'react-hook-form';

const HospitalLocator = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();
  const [notifying, setNotifying] = useState(false);

  const patientId = '08b01e3f-7cd8-431e-9f48-fd39ef6e429f';


  useEffect(() => {
    handleGeolocation();
  }, []);


  const fetchHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }
      const data = await response.json();
      setHospitals(data.hospitals);
      // console.log(data.hospitals);
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

  const sendNotification = async (hospitalId) => {
    if(notifying){
      window.alert('Notification currently in progress');
      return;
    }
    try {
      setNotifying(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/emergency-consult`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: location.latitude.toFixed(7),
          longitude: location.longitude.toFixed(7),
          hospitalId,
          patientId,

        }),
      });
      if (!response.ok) {
        throw new Error('Failed to send notification');
      }
      const data = await response.json();
      console.log(data);
      if(data.message.includes('offline') || data.message.includes('unreachable') || data.message.includes('not')){
        message.error(data.message);
      }else{
        message.success(data.msg);
      }
    } catch (error) {
      message.error(`Hospital could not be alerted`);
      setError('Error sending notification: ' + error.message);
    }finally{
      setNotifying(false);
      // console.log('Notification sent');
      // console.log(notifying);
    }
  }

  return (
    <div className="p-4 mx-auto mt-5">
      <h1 className="text-2xl font-bold mb-4">Hospital Locator</h1>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {location && (
          <h3 style={{fontSize:"25px"}} className="m-5">
            Coordinates : {location.latitude.toFixed(4)}, {location.longitude.toFixed(4)}
          </h3>
        )}
      </div>

      {loading && (
        <div className="flex justify-center">
          <Loader2Icon className="animate-spin h-8 w-8 text-blue-500" />
        </div>
      )}

      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {permissionDenied && (
        <div className="mt-4 flex justify-center">
          <Button onClick={handleGeolocation}>Enable Location Access</Button>
        </div>
      )}

      {hospitals.length > 0 && (
        <div className="mt-4 space-y-4" >
          {hospitals.map((hospital) => (
            
              <div className="p-4" id={hospital.id} style={{ border: '1px solid black', background: "#f4f4f4" }}>
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl justify-between">
                    <span className="flex items-center">
                      <Hospital style={{ color: "#4186E6" }} className="mr-2" />
                      {hospital.name}
                    </span>
                    <div style={{display:"flex", padding:"3px", justifyContent:"space-around"}}>

                    <button onClick={()=> navigate(`/hospitals/${hospital.id}`)} className='m-1' style={{borderRadius: "50%", padding: "8px", background:"#7092DE" }}>
                        <Navigation className='' />
                    </button>
                        
                        <button onClick={()=> sendNotification(hospital.id)}  className='m-1' style={{ border: "0px solid black", borderRadius: "50%", padding: "7px", background:"#f75445" }}>
                            <BellRing style={{color:"white"}} />
                        </button>
                        </div>
                  </CardTitle>
                </CardHeader>

                <CardContent>
                  <p className="flex items-center mb-2"><Phone className="mr-2" /> {hospital.contactNumber}</p>
                  <p className="flex items-center mb-2"><Mail className="mr-2" /> {hospital.email}</p>
                  <p className="flex items-center mb-2"><MapPin className="mr-2" /> {hospital.address}</p>
                  <p className="flex items-center">
                    <Stethoscope className="mr-2" />
                    {hospital.speciality}
                  </p>
                </CardContent>
              </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HospitalLocator;
