import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Calendar, User, MessageCircle, Pill, FileText, Paperclip, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link } from 'react-router-dom';

// Temporary data (remove in production)
const tempPrescriptionData = {
  "patientId": "324b8295-bed1-4c08-a4ad-14fb268fde9e",
  "doctorId": "772014c3-5bc0-4a30-9497-5708b3576675",
  "date": "2024-06-22T12:05:00.286Z",
  "attachments": [],
  "instructionForOtherDoctor": "Suffering from hyper tension.",
  "prescriptionType": "IMPORTANT",
  "status": "ACTIVE",
  "medications": [
    {
      "medicine": "B-Complex",
      "dosage": "100 mg",
      "instruction": "1 tablet per day before dinner",
      "numberOfTimes": 1,
      "numberOfDays": 7,
      "validTill": "2024-06-29T12:05:03.047Z",
      "status": "VALID"
    },
    {
      "medicine": "Olkem Trio",
      "dosage": "500 mg",
      "instruction": "1 tablet per day before breakfast",
      "numberOfTimes": 1,
      "numberOfDays": 90,
      "validTill": "2024-09-20T12:05:03.046Z",
      "status": "VALID"
    }
  ],
  "doctor": {
    "name": "Sujay Bagalur",
    "specialization": "NEONATOLOGIST",
    "contact": "1234567890"
  },
  "reports": [
    {
      "id": "4519850c-bab3-40b4-8bde-e04ff4e7f6d5",
      "date": "2024-07-01T13:09:31.695Z",
      "url": "http://res.cloudinary.com/dobgzdpic/image/upload/v1719837796/MRI.pdf",
      "type": "MRI"
    }
  ]
};

const EnhancedPrescription = ({ prescriptionId }) => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      setLoading(true);
      try {
        // Simulating API call with setTimeout
        setTimeout(() => {
          setPrescription(tempPrescriptionData);
          setLoading(false);
        }, 1000);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [prescriptionId]);

  if (loading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">Error: {error}</div>;
  if (!prescription) return <div className="text-center">No prescription found</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg mt-10 mb-5">
      <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-300 text-white">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Prescription Details</CardTitle>
          <Badge variant={prescription.prescriptionType === 'IMPORTANT' ? 'destructive' : 'secondary'} className="text-sm px-2 py-1">
            {prescription.prescriptionType === 'IMPORTANT' ? (
              <AlertCircle className="w-4 h-4 mr-1" />
            ) : (
              <FileText className="w-4 h-4 mr-1" />
            )}
            {prescription.prescriptionType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg">
              <Calendar className="w-5 h-5 mr-2 text-blue-500" />
              <span className="font-semibold">Date:</span>
              <span className="ml-2">{format(parseISO(prescription.date), 'PPP')}</span>
            </div>
            <div className="flex flex-col bg-gray-100 p-3 rounded-lg">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-green-500" />
                <span className="font-semibold">Doctor:</span>
                <Link href={`/doctors/${prescription.doctorId}`} className="ml-2 text-blue-600 hover:underline">
                  {prescription.doctor.name} ({prescription.doctor.specialization})
                </Link>
              </div>
              <div className="flex items-center mt-2">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-500" />
                <span className="font-semibold">Contact:</span>
                <span className="ml-2">{prescription.doctor.contact}</span>
              </div>
            </div>
          </div>

          {prescription.instructionForOtherDoctor && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
              <div className="flex">
                <MessageCircle className="w-5 h-5 mr-2 text-yellow-600" />
                <div>
                  <p className="font-semibold text-yellow-700">Instructions for Other Doctors:</p>
                  <p className="text-yellow-600">{prescription.instructionForOtherDoctor}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Pill className="w-5 h-5 mr-2 text-purple-500" />
            Medications
          </h3>
          <ScrollArea className="">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>
                  <TableHead>Dosage</TableHead>
                  <TableHead>Instruction</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Valid Till</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {prescription.medications.map((med, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{med.medicine}</TableCell>
                    <TableCell>{med.dosage}</TableCell>
                    <TableCell>{med.instruction}</TableCell>
                    <TableCell>{med.numberOfDays} days</TableCell>
                    <TableCell>{format(parseISO(med.validTill), 'PP')}</TableCell>
                    <TableCell>
                      <Badge variant={med.status === 'VALID' ? 'success' : 'destructive'}>
                        {med.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Paperclip className="w-5 h-5 mr-2 text-indigo-500" />
            Reports and Attachments
          </h3>
          {prescription.reports.length > 0 || prescription.attachments.length > 0 ? (
            <ul className="space-y-2">
              {prescription.reports.map((report, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <div>
                    <span className="font-medium">{report.type}</span>
                    <span className="text-sm text-gray-500 ml-2">
                      {format(parseISO(report.date), 'PP')}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={report.url} target="_blank" rel="noopener noreferrer">
                      View <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </li>
              ))}
              {prescription.attachments.map((attachment, index) => (
                <li key={`attachment-${index}`} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                  <span className="font-medium">Attachment {index + 1}</span>
                  <Button variant="outline" size="sm" asChild>
                    <a href={attachment} target="_blank" rel="noopener noreferrer">
                      View <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No reports or attachments available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPrescription;
