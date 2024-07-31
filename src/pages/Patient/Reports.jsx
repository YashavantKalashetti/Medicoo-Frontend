import React, { useState, useMemo, useEffect, useContext } from 'react';
import { Search, Download, Eye, X, Calendar } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import CustomLoader from '@/Partials/CustomLoader';
import { set } from 'react-hook-form';

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


const ReportOrganizer = () => {

  const {user} = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [viewingReport, setViewingReport] = useState(null);
  const [sampleReports, setSampleReports] = useState([]);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/patient/reports`,{
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user?.access_token}`,
          },
        });
  
        const data = await response.json();
        if(!response.ok) {
          setError(data.message);
        }else{
          setSampleReports(data.reports);
        }
      } catch (error) {
        setError("Error fetching reports");
      }finally {
        setLoading(false);
      }
    }
  )();
  }, []);

  

  const filteredReports = useMemo(() => {
    return sampleReports.filter(report => 
      (selectedType === 'All' || report.type === selectedType) &&
      ( report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
       report.date.includes(searchTerm))
    );
  }, [searchTerm, selectedType, sampleReports]);

  const handleView = (report) => {
    setViewingReport(report);
  };

  const handleDownload = (url) => {
    window.open(url, '_blank');
  };

  if (loading) {
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>;
  }

  if (error) {
    return <div className='text-3xl flex justify-center items-center h-screen text-red-500'>{error}</div>;
  }


  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl mt-4">
      <h1 className="text-3xl font-bold text-center mb-8">Medical Reports</h1>
      
      <div className="mb-6 flex space-x-4">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 border rounded-md"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="p-2 border rounded w-48 text-gray-600"
        >
          {fileTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map(report => (
          <div key={report.id} className="border rounded-md p-4 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold mb-2">{report.type}</h3>
              {/* If needed add a link for the prescription here */}
              {/* <p className="text-sm text-gray-600 mb-2">{report.type}</p> */}
              <p className="text-sm text-gray-500 mb-2 flex items-center">
                <Calendar size={16} className="mr-1" /> {report.date.split('T')[0]}
              </p>
            </div>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={() => handleView(report)} 
                className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                <Eye size={20} />
              </button>
              <button 
                onClick={() => handleDownload(report.url)} 
                className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {viewingReport && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          <div className="bg-white w-full h-full flex flex-col">
            <div className="flex justify-between items-center p-4 bg-gray-200">
              <div>
                <h2 className="text-2xl font-bold">{viewingReport.name}</h2>
                <p className="text-sm text-gray-600">{viewingReport.type} - {viewingReport.date}</p>
              </div>
              <button 
                onClick={() => setViewingReport(null)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <X size={24} />
              </button>
            </div>
            <div className="flex-grow overflow-hidden">
              <iframe src={viewingReport.url} className="w-full h-full" title={viewingReport.name}></iframe>
            </div>
            <div className="p-4 bg-gray-200">
              <button 
                onClick={() => handleDownload(viewingReport.url)}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportOrganizer;