import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { BellRing, Hospital, Loader2, Mail, MapPin, Navigation, Phone, Stethoscope, UserRound, UserRoundX } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const HospitalLocator = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionDenied, setPermissionDenied] = useState(false);
  const navigate = useNavigate();

  const fetchHospitals = async (latitude, longitude) => {
    try {
      const response = await fetch(`http://localhost:3030/api/v1/search/nearby-hospitals?latitude=${latitude}&longitude=${longitude}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hospitals');
      }
      const data = await response.json();
      setHospitals(data.hospitals);
      console.log(data.hospitals);
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

  return (
    <div className="bg-gradient-to-b mt-8 mb-10 min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-blue-900 text-center">Hospital Locator</h1>
        
        {location && (
  <div className=" rounded-lg shadow-md p-6 mb-8">
    <h2 className="text-xl font-semibold text-blue-800 mb-2">Your Location</h2>
    <div className="flex items-center justify-center space-x-4">
      <div className="flex flex-col items-center">
        <span className="text-sm text-blue-600 font-medium">Latitude</span>
        <span className="text-lg font-bold text-blue-900">{location.latitude.toFixed(4)}°</span>
      </div>
      <div className="w-px h-10 bg-blue-300"></div>
      <div className="flex flex-col items-center">
        <span className="text-sm text-blue-600 font-medium">Longitude</span>
        <span className="text-lg font-bold text-blue-900">{location.longitude.toFixed(4)}°</span>
      </div>
    </div>
  </div>
)}

        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="animate-spin h-12 w-12 text-blue-500" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-8">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {permissionDenied && (
          <div className="text-center mb-8">
            <Button onClick={handleGeolocation} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              Enable Location Access
            </Button>
          </div>
        )}

        {hospitals.length > 0 && (
          <div className="space-y-6">
            {hospitals.map((hospital) => (
              <Card key={hospital.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="bg-blue-50">
                  <CardTitle className="flex items-center justify-between text-2xl text-blue-900">
                    <span className="flex items-center">
                      <Hospital className="mr-3 text-blue-600" />
                      {hospital.name}
                    </span>
                    <div className="flex space-x-2">
                      <Button
                        onClick={() => navigate(`/hospitals/${hospital.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
                      >
                        <Navigation className="text-white" />
                      </Button>
                      <Button className="bg-red-500 hover:bg-red-600 p-2 rounded-full">
                        <BellRing className="text-white" />
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>

                <CardContent className="mt-4">
                  <div className="space-y-3">
                    <p className="flex items-center text-gray-700">
                      <Phone className="mr-3 text-blue-500" /> {hospital.contactNumber}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <Mail className="mr-3 text-blue-500" /> {hospital.email}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <MapPin className="mr-3 text-blue-500" /> {hospital.address}
                    </p>
                    <p className="flex items-center text-gray-700">
                      <Stethoscope className="mr-3 text-blue-500" /> {hospital.speciality}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalLocator;