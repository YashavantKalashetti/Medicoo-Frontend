import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

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
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedReportType, setSelectedReportType] = useState("All");
  const { id } = useParams();

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/doctor/patient/${id}/reports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI3NzIwMTRjMy01YmMwLTRhMzAtOTQ5Ny01NzA4YjM1NzY2NzUiLCJyb2xlIjoiRE9DVE9SIiwiZW1haWwiOiJzdWpheUBnbWFpbC5jb20iLCJpYXQiOjE3MjIxNDQ2NTYsImV4cCI6MTcyMjU3NjY1Nn0.xzyLwEu248PX8p0rnWg3sfKRrll79nLKJbZOTz5k9BU`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch reports');
        }
        const data = await response.json();
        setReports(data.reports);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reports:', error);
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

  const filteredReports = selectedReportType === "All" 
    ? reports 
    : reports.filter(report => report.type === selectedReportType);

  if (loading) {
    return <p>Loading reports...</p>;
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