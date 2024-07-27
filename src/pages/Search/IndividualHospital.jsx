import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Hospital, Phone, Mail, MapPin, ScrollText, Star, GraduationCap, Languages, Map, ChevronRight, Users } from 'lucide-react';
import MapComponent from '@/Auth/MapComponent';
import { useParams } from 'react-router-dom';
import CustomLoader from '@/Partials/CustomLoader';

const HospitalProfile = () => {
  const [hospital, setHospital] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/search/hospitals/${id}`);
        const data = await response.json();
        if(data.error) {
          setError(data.error);
          return;
        }
        setHospital(data.hospital);
      } catch (error) {
        console.error('Error fetching hospital data:', error);
      } finally {
        setLoading(false);
      }
    })()
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateExperience = (practicingSince) => {
    const start = new Date(practicingSince);
    const now = new Date();
    return now.getFullYear() - start.getFullYear();
  };

  const openMap = () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`;
    window.open(url, '_blank');
  };

  if (error) {
    return <div className="container mx-auto p-4 space-y-6 mt-8 bg-red-500 text-white">Error</div>
  }

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6 mt-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-300">
      {hospital && (
        <Card className="w-full overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-900">
          <div className="relative h-64 md:h-96">
            <img 
              src={`https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600`} 
              alt={hospital.name} 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{hospital.name}</h1>
              <p className="text-sm md:text-base opacity-80">Hospital ID: {hospital.hospital_number}</p>
            </div>
            <Badge 
              variant={hospital.availableForConsult ? "success" : "destructive"} 
              className="absolute top-4 right-4 text-sm"
            >
              {hospital.availableForConsult ? "Available" : "Unavailable"}
            </Badge>
          </div>

          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-400">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-400">
                    <CardTitle className="text-3xl p-4">Hospital Information</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div>
                      <h3 className="text-lg flex items-center text-gray-900 dark:text-gray-100">
                        <ScrollText className='mr-2 h-6 w-7' /> About
                      </h3>
                      <p className="text-sm">{hospital.description}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-base font-semibold flex items-center text-gray-900 dark:text-gray-100">
                          <Phone className="mr-2 h-5 w-5" /> Contact
                        </h4>
                        <p className="text-sm">{hospital.contactNumber}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-semibold flex items-center text-gray-900 dark:text-gray-100">
                          <Mail className="mr-2 h-5 w-5" /> Email
                        </h4>
                        <p className="text-sm">{hospital.email}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h4 className="text-base font-semibold flex items-center text-gray-900 dark:text-gray-100">
                          <MapPin className="mr-2 h-5 w-5" /> Address
                        </h4>
                        <p className="text-sm">{hospital.address}</p>
                      </div>
                      
                      <div>
                        <h4 className="text-base font-semibold flex items-center text-gray-900 dark:text-gray-100">
                          <Hospital className="mr-2 h-5 w-5" /> Speciality
                        </h4>
                        <p className="text-sm">{hospital.speciality.replace('_', ' ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card className="h-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-400">
                  <CardHeader className="border-b border-gray-200 dark:border-gray-400">
                    <CardTitle className="text-lg text-gray-900 dark:text-gray-100">Location</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4 relative">
                    <div style={{ height: '300px', zIndex: 1 }}>
                      <MapComponent lat={hospital.latitude} lng={hospital.longitude} />
                    </div>
                    <Button onClick={openMap} className="w-full mt-2 relative z-10">
                        <Map className="mr-2 h-4 w-4" /> Get Directions
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="border border-gray-200 dark:border-gray-400 p-4 rounded-md">
              <h2 className="text-2xl font-bold mb-4 flex items-center text-gray-900 dark:text-gray-100">
                <Users className="mr-2 h-6 w-6" /> Our Doctors
              </h2>
              <Tabs defaultValue="grid" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-4 border border-gray-200 dark:border-gray-400">
                  <TabsTrigger value="grid">Grid View</TabsTrigger>
                  <TabsTrigger value="list">List View</TabsTrigger>
                </TabsList>
                <TabsContent value="grid">
                  <ScrollArea className="h-[600px] pr-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hospital.registeredDoctors.map((doctor) => (
                        <Card key={doctor.id} className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                          <CardContent className="p-0 space-y-4">
                            <div className="relative">
                              <img 
                                src={doctor.avatar} 
                                alt={doctor.name} 
                                className="w-full h-48 object-cover"
                              />
                              <Badge 
                                variant={doctor.availableForConsult ? "success" : "destructive"}
                                className="absolute top-2 right-2"
                              >
                                {doctor.availableForConsult ? "Available" : "Unavailable"}
                              </Badge>
                            </div>
                            <div className="p-4 space-y-2">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{doctor.name}</h3>
                              <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialization.replace('_', ' ')}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <div className="flex items-center">
                                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                  <span className="text-sm font-medium">{doctor.rating}</span>
                                </div>
                                <Separator orientation="vertical" className="h-4" />
                                <span className="text-sm">{calculateExperience(doctor.practicingSince)}+ years exp.</span>
                              </div>
                              <p className="text-sm mt-1 flex items-center text-gray-900 dark:text-gray-100">
                                <Languages className="mr-1 h-4 w-4" /> 
                                {doctor.languages.join(', ')}
                              </p>
                              <Button variant="outline" className="w-full mt-2">
                                View Profile <ChevronRight className="ml-2 h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="list">
                  <ScrollArea className="h-[600px] pr-4">
                    {hospital.registeredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="mb-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                        <CardContent className="flex items-center space-x-4 py-4">
                          <Avatar className="h-20 w-20">
                            <AvatarImage src={doctor.avatar} alt={doctor.name} />
                            <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{doctor.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{doctor.specialization.replace('_', ' ')}</p>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 mr-1" />
                                <span className="text-sm font-medium">{doctor.rating}</span>
                              </div>
                              <Separator orientation="vertical" className="h-4" />
                              <span className="text-sm">{calculateExperience(doctor.practicingSince)}+ years exp.</span>
                            </div>
                            <p className="text-sm mt-1 flex items-center text-gray-900 dark:text-gray-100">
                              <Languages className="mr-1 h-4 w-4" /> 
                              {doctor.languages.join(', ')}
                            </p>
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <Badge variant={doctor.availableForConsult ? "success" : "destructive"}>
                              {doctor.availableForConsult ? "Available" : "Unavailable"}
                            </Badge>
                            <Button variant="outline" size="sm">
                              View Profile <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </ScrollArea>
                </TabsContent>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HospitalProfile;
