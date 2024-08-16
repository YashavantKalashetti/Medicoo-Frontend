import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';
import { AuthContext } from '@/context/AuthContext';
import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';
import { set } from 'react-hook-form';
import { motion } from 'framer-motion';

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

const PatientReportsPage = () => {
  const {user} = useContext(AuthContext);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] =  useState(null);
  const [selectedReportType, setSelectedReportType] = useState("All");
  const { id } = useParams();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctor/patient/${id}/reports`, {
        //   method: 'GET',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${user.access_token}`
        //   }
        // });

        // if (!response.ok) {
        //   throw new Error('Failed to fetch reports');
        // }
        const data = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/doctor/patient/${id}/reports`, {
          method: 'GET',
        })
        setReports(data.reports);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
        setError(error.message);
      }
    };

    fetchReports();
  }, [id]);

  const filteredReports = selectedReportType === "All" 
    ? reports 
    : reports.filter(report => report.type === selectedReportType);

    if (loading) {
      return (
        <div className={`flex items-center justify-center h-screen bg-gray-900 dark:bg-white`}>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1 }}
            className={`w-16 h-16 border-t-4 border-blue-400 dark:border-blue-500 rounded-full`}
          />
        </div>
      );
    }

  if(error){
    return <p className='flex items-center justify-center h-screen text-red-500 bg-gray-800 dark:bg-gray-900'>{error}</p>
  }

  return (
    <div className="p-6 dark:bg-gray-800 dark:text-white mt-7">
      <Card className="mb-4 dark:bg-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">Patient Reports</CardTitle>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Type</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.type}</TableCell>
                    <TableCell>{format(new Date(report.date), 'PPP')}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <a href={report.url} target="_blank" rel="noopener noreferrer">
                          View <ExternalLink className="w-4 h-4 ml-1" />
                        </a>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p>No reports available for the selected type.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientReportsPage;