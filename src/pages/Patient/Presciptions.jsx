import React, { useState } from 'react';
import { format } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Calendar, User, MessageCircle, Paperclip, Pill, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';


const PrescriptionCard = ({ prescription }) => (
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
      </div>
    </CardContent>
  </Card>
);

const PrescriptionList = ({ prescriptions }) => {
  return (
    <div className="space-y-4">
      {prescriptions.map((prescription, index) => (
        <PrescriptionCard key={index} prescription={prescription} />
      ))}
    </div>
  );
};

const PatientPrescriptions = ({ importantPrescriptions, normalPrescriptions }) => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const allPrescriptions = [...importantPrescriptions, ...normalPrescriptions];

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

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
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