import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertCircle, Calendar, User, MessageCircle, Pill, FileText, Paperclip, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Link, useParams } from 'react-router-dom';
import CustomLoader from '@/Partials/CustomLoader';
import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';

const EnhancedPrescription = () => {
  const [prescription, setPrescription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchPrescription = async () => {
      setLoading(true);
      try {
        
        const data = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/patient/prescriptions/${id}`, {
          method: 'GET',
        });

        setPrescription(data.prescription);

      } catch (err) {
        setError(err.message);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchPrescription();
  }, [id]);

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>;
  }

  if (error) {
    return <div className='flex justify-center items-center h-screen'>Error: {error}</div>;
  }

  if (!prescription) return <div className="text-center">No prescription found</div>;

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-lg mt-10 mb-7 bg-white dark:bg-gray-800">
      <CardHeader className="bg-gradient-to-r from-blue-400 to-purple-300 text-white dark:from-blue-700 dark:to-purple-600">
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Prescription Details</CardTitle>
          <Badge 
            variant={prescription.prescriptionType === 'IMPORTANT' ? 'destructive' : 'secondary'} 
            className="text-sm px-2 py-1 dark:bg-gray-700 dark:text-gray-200"
          >
            {prescription.prescriptionType === 'IMPORTANT' ? (
              <AlertCircle className="w-4 h-4 mr-1" />
            ) : (
              <FileText className="w-4 h-4 mr-1" />
            )}
            {prescription.prescriptionType}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-6 dark:bg-gray-900 dark:text-gray-200">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-gray-200">
              <Calendar className="w-5 h-5 mr-2 text-blue-500 dark:text-blue-400" />
              <span className="font-semibold">Date:</span>
              <span className="ml-2">{format(parseISO(prescription.date), 'PPP')}</span>
            </div>
            <div className="flex flex-col bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-gray-200">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-2 text-green-500 dark:text-green-400" />
                <span className="font-semibold">Doctor:</span>
                <Link to={`/doctors/${prescription.doctorId}`} className="ml-2 text-blue-600 hover:underline dark:text-blue-400">
                  {prescription.doctor.name} ({prescription.doctor.specialization})
                </Link>
              </div>
              <div className="flex items-center mt-2">
                <MessageCircle className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
                <span className="font-semibold">Contact:</span>
                <span className="ml-2">{prescription.doctor.contactNumber}</span>
              </div>
            </div>
          </div>

          {prescription.instructionForOtherDoctor && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-300">
              <div className="flex">
                <MessageCircle className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                <div>
                  <p className="font-semibold text-yellow-700 dark:text-yellow-400">Instructions for Other Doctors:</p>
                  <p className="text-yellow-600 dark:text-yellow-300">{prescription.instructionForOtherDoctor}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center dark:text-gray-200">
            <Pill className="w-5 h-5 mr-2 text-purple-500 dark:text-purple-400" />
            Medications
          </h3>
          {
            prescription.medications.length > 0 ? (
              <ScrollArea className="">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="dark:bg-gray-700">Medicine</TableHead>
                      <TableHead className="dark:bg-gray-700">Dosage</TableHead>
                      <TableHead className="dark:bg-gray-700">Instruction</TableHead>
                      <TableHead className="dark:bg-gray-700">Duration</TableHead>
                      <TableHead className="dark:bg-gray-700">Valid Till</TableHead>
                      <TableHead className="dark:bg-gray-700">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescription.medications.map((med, index) => (
                      <TableRow key={index} className="dark:bg-gray-800">
                        <TableCell className="font-medium dark:text-gray-200">{med.medicine}</TableCell>
                        <TableCell className="dark:text-gray-200">{med.dosage}</TableCell>
                        <TableCell className="dark:text-gray-200">{med.instruction}</TableCell>
                        <TableCell className="dark:text-gray-200">{med.numberOfDays} days</TableCell>
                        <TableCell className="dark:text-gray-200">{format(parseISO(med.validTill), 'PP')}</TableCell>
                        <TableCell>
                          <Badge variant={med.status === 'VALID' ? 'success' : 'destructive'} className="dark:text-gray-200">
                            {med.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            ) : (
              <p className='text-gray-500 dark:text-gray-400'>No medications to display</p>
            )
          }
        </div>

        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 flex items-center dark:text-gray-200">
            <Paperclip className="w-5 h-5 mr-2 text-indigo-500 dark:text-indigo-400" />
            Reports and Attachments
          </h3>
          {prescription.reports.length > 0 ? (
            <ul className="space-y-2">
              {prescription.reports.map((report, index) => (
                <li key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg dark:bg-gray-700 dark:text-gray-200">
                  <div>
                    <span className="font-medium">{report.type}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={report.url} target="_blank" rel="noopener noreferrer">
                      View <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No reports or attachments available.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedPrescription;
