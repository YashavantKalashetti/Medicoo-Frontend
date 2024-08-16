import React, { useState, useEffect, useContext } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, User, FileText, Pill, Paperclip, ExternalLink, Eye, Heart, Stethoscope, ArrowUpRight } from 'lucide-react';
import { format } from 'date-fns';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '@/context/AuthContext';

const fileTypes = [
  "All",
  "Blood Report",
  "MRI",
  "CT Scan",
  "X-Ray",
  "Ultrasound",
  "ECG",
  "Pathology Report",
  "Prescription",
  "Other"
];

const DocPatientDashboard = () => {
  const {user} = useContext(AuthContext);
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState("All");

  const { id } = useParams();

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctor/patient/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.access_token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch patient details');
        }
        const data = await response.json();
        setPatient(data.patient);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching patient details:', error);
        setLoading(false);
      }
    };

    fetchPatientDetails();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!patient) {
    return <p>No patient data available.</p>;
  }

  const { name, contactNumber, dob, gender, medicalDetails, prescriptions } = patient;
  const { medicalHistory, bloodGroup, height, weight, allergies, systolic, diastolic } = medicalDetails;

  const allMedications = prescriptions.reduce((acc, prescription) => {
    if (prescription.medications) {
      acc.push(...prescription.medications);
    }
    return acc;
  }, []);

  const allReports = prescriptions.reduce((acc, prescription) => {
    if (prescription.reports) {
      acc.push(...prescription.reports);
    }
    return acc;
  }, []);

  const filteredReports = selectedReportType === "All" 
    ? allReports 
    : allReports.filter(report => report.type === selectedReportType);

  return (
    <div className="p-6 dark:bg-gray-800 dark:text-white mt-4">
      {/* Patient Details Card */}
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center">
            <User className="w-6 h-6 mr-2" /> Patient Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-lg">{name || "-"}</div>
          <div className="text-sm">
            <span className="font-semibold">Contact:</span> {contactNumber || "-"}
          </div>
          <div className="text-sm">
            <Calendar className="inline-block w-4 h-4 mr-2" />
            <span className="font-semibold">Date of Birth:</span> {dob ? format(new Date(dob), 'PPP') : "-"}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Gender:</span> {gender || "-"}
          </div>
        </CardContent>
      </Card>

      {/* Medical Details Card */}
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center">
            <Heart className="w-6 h-6 mr-2" /> Medical Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="text-sm">
            <span className="font-semibold">Blood Group:</span> {bloodGroup || "-"}
          </div>
          <div className="text-sm">
            <span className="font-semibold">Height:</span> {height || "-"} cm
          </div>
          <div className="text-sm">
            <span className="font-semibold">Weight:</span> {weight || "-"} kg
          </div>
          <div className="text-sm">
            <span className="font-semibold">Systolic BP:</span> {systolic || "-"} mmHg
          </div>
          <div className="text-sm">
            <span className="font-semibold">Diastolic BP:</span> {diastolic || "-"} mmHg
          </div>
          <div className="text-sm">
            <span className="font-semibold">Allergies:</span> {allergies.length > 0 ? allergies.join(", ") : "-"}
          </div>
        </CardContent>
      </Card>

      {/* Medical History Card */}
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold flex items-center">
            <FileText className="w-6 h-6 mr-2" /> Medical History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {medicalHistory.length > 0 ? (
            <ScrollArea className="max-h-48">
              <ul className="list-disc list-inside">
                {medicalHistory.map((historyItem, index) => (
                  <li key={index} className="text-sm">
                    <Stethoscope className="inline-block w-4 h-4 mr-2" />
                    {historyItem}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          ) : (
            <p>No medical history to display</p>
          )}
        </CardContent>
      </Card>

      {/* Medications Card */}
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <Pill className="w-6 h-6 mr-2" /> Medications
            </CardTitle>
            <Link to={`/p/${id}/medications`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {allMedications.length > 0 ? (
            <ScrollArea className="max-h-48">
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
                  {allMedications.slice(0, 5).map((med, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{med.medicine || "-"}</TableCell>
                      <TableCell>{med.dosage || "-"}</TableCell>
                      <TableCell>{med.instruction || "-"}</TableCell>
                      <TableCell>{med.numberOfDays ? `${med.numberOfDays} days` : "-"}</TableCell>
                      <TableCell>{med.validTill ? format(new Date(med.validTill), 'PPP') : "-"}</TableCell>
                      <TableCell>
                        <Badge variant={med.status === 'VALID' ? 'success' : 'destructive'}>
                          {med.status || "-"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <p>No medications to display</p>
          )}
        </CardContent>
      </Card>

      {/* Reports and Attachments Card */}
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-semibold flex items-center">
              <Paperclip className="w-6 h-6 mr-2" /> Reports and Attachments
            </CardTitle>
            <Link to={`/p/${id}/reports`} className="text-blue-600 dark:text-blue-400 hover:underline flex items-center">
              View All <ArrowUpRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Select value={selectedReportType} onValueChange={setSelectedReportType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select report type" />
              </SelectTrigger>
              <SelectContent>
                {fileTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {filteredReports.length > 0 ? (
            <ScrollArea className="max-h-48">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Link</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{report.type || "-"}</TableCell>
                      <TableCell>{report.date ? format(new Date(report.date), 'PPP') : "-"}</TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <a href={report.url || "#"} target="_blank" rel="noopener noreferrer">
                            View <ExternalLink className="w-4 h-4 ml-1" />
                          </a>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          ) : (
            <p>No reports or attachments available for the selected type.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DocPatientDashboard;