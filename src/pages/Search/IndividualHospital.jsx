import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Hospital, Phone, Mail, MapPin, Calendar, Star, GraduationCap, Languages, Clock, ChevronRight, Users, Map, ScrollText } from 'lucide-react';

const hospital = {
  "id": "66adfd3e-eba2-4a84-9a09-9b443084d2a5",
  "name": "BMS Hospital",
  "hospital_number": "HS6045314",
  "contactNumber": "8045088888",
  "email": "bms@email.com",
  "address": "No 618, Sri Mallikarjuna Swamy, Gangamma Temple St, NR Colony, Bengaluru, Karnataka 560019",
  "speciality": "SUPER_SPECIALTY",
  "description": "MBBS, MS (General Surgery), M.Ch (Cardiothoracic Surgery), Fellowship in Heart & Lung transplant, Hannover Medical School, Fellowship in Minimally Invasive Cardiac Surgery, Lipzig Heart Centre, Germany",
  "latitude": 12.9411334,
  "longitude": 77.5649215,
  "availableForConsult": false,
  "createdAt": "2024-06-22T11:56:44.462Z",
  "updatedAt": "2024-06-28T13:29:36.886Z",
  "registeredDoctors": [
    {
      "id": "002c94b1-8313-4528-a164-c4269ccca19c",
      "name": "Kavya Reddy",
      "doctor_number": "DR9131351",
      "specialization": "ENDOCRINOLOGIST",
      "rating": 4.8,
      "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png",
      "availableForConsult": false,
      "education": "MBBS, MS (General Surgery), M.Ch (Cardiothoracic Surgery), Fellowship in Heart & Lung transplant, Hannover Medical School, Fellowship in Minimally Invasive Cardiac Surgery, Lipzig Heart Centre, Germany",
      "languages": ["English", "Hindi", "Telugu"],
      "practicingSince": "2016-08-12T00:00:00.000Z"
    },
    {
      "id": "0c8d9b9a-d1bb-47e4-9346-3be40e643445",
      "name": "Yagya",
      "doctor_number": "DR2931087",
      "specialization": "CARDIOLOGIST",
      "rating": 4.5,
      "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png",
      "availableForConsult": true,
      "education": "MBBS, MD (Cardiology), Fellowship in Interventional Cardiology",
      "languages": ["English", "Hindi"],
      "practicingSince": "2018-06-13T04:35:15.117Z"
    }
  ]
};

const HospitalProfile = () => {
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

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="w-full overflow-hidden">
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
            {hospital.availableForConsult ? "Available for Consult" : "Not Available"}
          </Badge>
        </div>

        <Card className="m-6">
            <CardHeader>
                <CardTitle className="text-lg flex items-center">
                    <ScrollText className='mr-2 h-7 w-10' />About
                </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{hospital.description}</p>
            </CardContent>
        </Card>
        
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <MapPin className="mr-2 h-5 w-5" /> Location
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{hospital.address}</p>
                <Button onClick={openMap} className="w-full">
                  <Map className="mr-2 h-4 w-4" /> View on Map
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Phone className="mr-2 h-5 w-5" /> Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm flex items-center">
                  <Phone className="mr-2 h-4 w-4" /> {hospital.contactNumber}
                </p>
                <p className="text-sm flex items-center">
                  <Mail className="mr-2 h-4 w-4" /> {hospital.email}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Hospital className="mr-2 h-5 w-5" /> Speciality
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">{hospital.speciality.replace('_', ' ')}</p>
                <p className="text-sm mt-2 flex items-center">
                  <Calendar className="mr-2 h-4 w-4" /> Established {new Date(hospital.createdAt).getFullYear()}
                </p>
              </CardContent>
            </Card>
          </div>
          
          <Separator className="my-6" />
          
          <div>
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Users className="mr-2 h-6 w-6" /> Our Doctors
            </h2>
            <Tabs defaultValue="grid" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="grid">Grid View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
              <TabsContent value="grid">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {hospital.registeredDoctors.map((doctor) => (
                      <Card key={doctor.id} className="overflow-hidden">
                        <CardContent className="p-0">
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
                            <h3 className="text-lg font-semibold">{doctor.name}</h3>
                            <p className="text-sm text-gray-500">{doctor.specialization.replace('_', ' ')}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-4 w-4 text-yellow-400" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                            <p className="text-sm flex items-center">
                              <GraduationCap className="mr-1 h-4 w-4" /> 
                              {calculateExperience(doctor.practicingSince)}+ years experience
                            </p>
                            <p className="text-sm flex items-center">
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
                    <Card key={doctor.id} className="mb-4">
                      <CardContent className="flex items-center space-x-4 py-4">
                        <Avatar className="h-20 w-20">
                          <AvatarImage src={doctor.avatar} alt={doctor.name} />
                          <AvatarFallback>{doctor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{doctor.name}</h3>
                          <p className="text-sm text-gray-500">{doctor.specialization.replace('_', ' ')}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span className="text-sm font-medium">{doctor.rating}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-sm">{calculateExperience(doctor.practicingSince)}+ years exp.</span>
                          </div>
                          <p className="text-sm mt-1 flex items-center">
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
    </div>
  );
};

export default HospitalProfile;