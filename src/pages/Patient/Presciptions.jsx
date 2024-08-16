import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, User, MessageCircle, Paperclip, Pill, Search, ExternalLink, GlobeLock, Globe } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import CustomLoader from '@/Partials/CustomLoader';
import { Button, message, Popover } from 'antd';
import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';

const style= {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const PrescriptionCard = ({ prescription }) => {
  const [isDisplayable, setIsDisplayable] = useState(prescription.displayable);

  const toggleDisplayable = async () => {
    try {

      await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/patient/prescriptions/${prescription.id}?status=${!prescription.displayable}`,{
        method: 'PATCH',
      })

      setIsDisplayable((prev) => !prev);
      message.success('Prescription visibility updated successfully');
    } catch (error) {
      // console.error(error.message);
      message.error('Failed to update prescription visibility');
    }
  };

  return (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">
            {prescription.prescriptionType === 'IMPORTANT' ? 'Important Prescription' : 'Normal Prescription'}
          </CardTitle>
          {prescription.prescriptionType === 'IMPORTANT' && (
            <Badge variant="destructive" className="ml-2">
              <AlertCircle className="w-4 h-4 mr-1" />
              Important
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {format(new Date(prescription.date), 'PPP')}
          </div>
          <div className="flex items-center text-sm">
            <User className="w-4 h-4 mr-2" />
            Dr. {prescription.doctor.name} ({prescription.doctor.specialization})
          </div>
          {prescription.instructionForOtherDoctor && (
            <div className="flex items-start text-sm mt-2">
              <MessageCircle className="w-4 h-4 mr-2 mt-1" />
              <p>{prescription.instructionForOtherDoctor}</p>
            </div>
          )}
          <div className="flex items-center text-sm">
            <Pill className="w-4 h-4 mr-2" />
            Medications: {prescription.medications.length}
          </div>
          <div className="flex items-center text-sm">
            <Paperclip className="w-4 h-4 mr-2" />
            Attachments: {prescription.attachments.length}
          </div>
          <div className="flex items-center justify-between mt-4">
            <Link to={`/patient/prescriptions/${prescription.id}`} className="text-blue-600 hover:underline flex items-center">
              <ExternalLink className="w-4 h-4 mr-1" />
              View Details
            </Link>
            <Button variant={isDisplayable ? "success" : "outline"} size="sm" onClick={toggleDisplayable}>
              {isDisplayable ? <Globe style={{color:"#80e854"}} /> : <GlobeLock style={{color:"red"}} /> }
              <div style={style}>
                <Popover content="If set visible this prescription will be available to doctors in case of emergency">
                {isDisplayable ? "Visible to Other Doctors" : "Not Visible to Other Doctors"}
                </Popover>
              </div>
              
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div className="space-y-4">
      {prescriptions.map((prescription, index) => (
        <PrescriptionCard key={index} prescription={prescription} />
      ))}
    </div>
  );
};

const PatientPrescriptions = () => {

  const [allPrescriptions, setAllPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (
      async () => {
        try {
          setLoading(true);
  
          const data = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/patient/prescriptions`, {
            method: "GET"
          })
  
          const temp =  [...data.normalPrescriptions, ...data.importantPrescriptions]
          setAllPrescriptions(temp);
        } catch (error) {
          console.error('Error fetching prescriptions:', error);
          setError(error.message);
        }finally{
          setLoading(false);
        }
      }
    )()
  }, []);

  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  
  const filteredPrescriptions = allPrescriptions.filter(p => 
    (activeTab === 'all' || 
     (activeTab === 'important' && p.prescriptionType === 'IMPORTANT') ||
     (activeTab === 'normal' && p.prescriptionType === 'NORMAL')) &&
    (p.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.instructionForOtherDoctor?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.medications.some(m => m.medicine.toLowerCase().includes(searchTerm.toLowerCase())) ||
    format(new Date(p.date), 'PPP').toLowerCase().includes(searchTerm.toLowerCase()) ||
     p.doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if(loading) {
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>
  }

  if(error) {
    return <div className='flex justify-center items-center h-screen'>Error: {error}</div>
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-4 m-7 border-2">
      <h2 className="text-2xl font-bold mb-6">Patient Prescriptions</h2>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search prescriptions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
          icon={<Search className="w-4 h-4" />}
        />
      </div>
      <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="important">Important</TabsTrigger>
          <TabsTrigger value="normal">Normal</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ScrollArea className="h-[70vh]">
            <PrescriptionList prescriptions={filteredPrescriptions} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="important">
          <ScrollArea className="h-[70vh]">
            <PrescriptionList prescriptions={filteredPrescriptions} />
          </ScrollArea>
        </TabsContent>
        <TabsContent value="normal">
          <ScrollArea className="h-[70vh]">
            <PrescriptionList prescriptions={filteredPrescriptions} />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PatientPrescriptions;