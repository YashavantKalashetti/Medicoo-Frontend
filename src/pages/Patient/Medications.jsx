import React, { useState } from 'react';
import { Clock, Calendar, AlertCircle, Plus, X, Pill } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import NotificationPusher from '@/Partials/NotificationPusher';
import NotificationComponent from '@/Partials/NotificationPusher';

const prescriptionData = [
  {
    "medicine": "Olkem Trio",
    "dosage": "500 mg",
    "instruction": "1 tablet per day before breakfast",
    "validTill": "2024-09-20T12:05:03.046Z",
    "prescriptionId": "dba525db-7059-4262-a872-35b83bd58f6b",
    "numberOfDays": 90,
    "numberOfTimes": 1,
    "color": "#FFD700"
  },
  {
    "medicine": "Amoxicillin",
    "dosage": "250 mg",
    "instruction": "1 capsule every 8 hours",
    "validTill": "2024-07-15T10:00:00.000Z",
    "prescriptionId": "a1b2c3d4-e5f6-7890-abcd-1234ef567890",
    "numberOfDays": 10,
    "numberOfTimes": 3,
    "color": "#FF6347"
  },
  {
    "medicine": "Lisinopril",
    "dosage": "10 mg",
    "instruction": "1 tablet daily with water",
    "validTill": "2024-12-31T23:59:59.999Z",
    "prescriptionId": "f7e6d5c4-b3a2-1098-7654-321cba098765",
    "numberOfDays": 180,
    "numberOfTimes": 1,
    "color": "#4682B4"
  }
];

const MedicationCard = ({ medication }) => {
  const validTillDate = new Date(medication.validTill);
  const formattedDate = validTillDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const daysLeft = Math.ceil((validTillDate - new Date()) / (1000 * 60 * 60 * 24));
  const progress = Math.min(100, Math.max(0, (daysLeft / medication.numberOfDays) * 100));

  return (
    <Card className="overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-2xl border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
      <CardContent className="p-0">
        <div className="p-6 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-t-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mr-4 shadow-lg" style={{ backgroundColor: medication.color }}>
                <Pill className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{medication.medicine}</h3>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{medication.dosage}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{daysLeft} days left</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">of {medication.numberOfDays} days</p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">{medication.instruction}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Valid till: {formattedDate}</span>
            </div>
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 mr-3 text-gray-400 dark:text-gray-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Take {medication.numberOfTimes}x daily</span>
            </div>
          </div>
        </div>
        <div className="px-6 py-4 bg-white border-t border-gray-200 dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Progress</span>
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">{Math.round(progress)}%</span>
          </div>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-300 dark:bg-gray-700">
              <div
                style={{ width: `${progress}%`, backgroundColor: medication.color }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center transition-all duration-500 ease-in-out"
              ></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const MedicationsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">Your Medications</h1>
        {/* <Button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
        >
          <Plus className="w-5 h-5 mr-2" /> Add Medication
        </Button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {prescriptionData.map((medication) => (
          <MedicationCard key={medication.prescriptionId} medication={medication} />
        ))}
      </div>
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg w-96 max-w-md shadow-lg">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Add New Medication</h2>
              <Button onClick={() => setShowAddModal(false)} variant="ghost" className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <X className="w-6 h-6 text-gray-600 dark:text-gray-300" />
              </Button>
            </div>
            {/* Add form fields here */}
            <p className="text-gray-600 dark:text-gray-400 mb-6">Form fields for adding a new medication would go here.</p>
            <div className="flex justify-end">
              <Button onClick={() => setShowAddModal(false)} className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition-transform duration-300 ease-in-out transform hover:-translate-y-1">
                Add Medication
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicationsPage;
