import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusIcon, MinusIcon, UploadIcon, XIcon } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

const PrescriptionForm = () => {
  const [medications, setMedications] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [fileTypeDialogOpen, setFileTypeDialogOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);

  const fileTypes = [
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

  const validateMedications = () => {
    const newErrors = {};
    medications.forEach((med, index) => {
      if (!med.medicine || !med.dosage || !med.instruction || !med.numberOfDays || !med.numberOfTimes) {
        newErrors[`medication-${index}`] = "All fields are required for each medication.";
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (validateMedications()) {
      const formData = new FormData(event.target);
      const values = Object.fromEntries(formData.entries());
      values.medications = medications;
      values.attachments = attachments;
      console.log('Submitted values:', values);
      // Replace with your form submission logic
    }
  };

  const handleMedicationChange = (index, field, value) => {
    const updatedMedications = [...medications];
    updatedMedications[index][field] = value;
    setMedications(updatedMedications);
    if (errors[`medication-${index}`]) {
      const newErrors = { ...errors };
      delete newErrors[`medication-${index}`];
      setErrors(newErrors);
    }
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        medicine: '',
        dosage: '',
        instruction: '',
        numberOfDays: '',
        numberOfTimes: '',
      }
    ]);
  };

  const handleRemoveMedication = (index) => {
    const updatedMedications = [...medications];
    updatedMedications.splice(index, 1);
    setMedications(updatedMedications);
    const newErrors = { ...errors };
    delete newErrors[`medication-${index}`];
    setErrors(newErrors);
  };

  const handleAttachmentChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCurrentFile(file);
      setFileTypeDialogOpen(true);
    }
  };

  const handleFileTypeSelection = (fileType) => {
    if (currentFile && fileType) {
      const fileExtension = currentFile.name.split('.').pop();
      const newFileName = `${fileType}.${fileExtension}`;
      const renamedFile = new File([currentFile], newFileName, { type: currentFile.type });
      setAttachments([...attachments, renamedFile]);
    }
    setFileTypeDialogOpen(false);
    setCurrentFile(null);
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = [...attachments];
    updatedAttachments.splice(index, 1);
    setAttachments(updatedAttachments);
  };

  return (
    <form onSubmit={onSubmit} className="max-w-4xl mx-auto p-6 bg-gray-50 rounded-lg shadow-lg">
      <Card className="bg-white">
        <CardHeader>
          <h2 className="text-3xl font-bold text-center text-primary">Prescription Form</h2>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="prescriptionType" className="text-lg font-medium">Prescription Type</Label>
            <Select name="prescriptionType" defaultValue="IMPORTANT">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select prescription type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IMPORTANT">Important</SelectItem>
                <SelectItem value="NORMAL">Normal</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="instructionForOtherDoctor" className="text-lg font-medium">Instruction for Other Doctor</Label>
            <Textarea name="instructionForOtherDoctor" placeholder="Enter instructions..." className="min-h-[100px]" />
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Medications</Label>
            {medications.map((med, index) => (
              <Card key={index} className="p-4 border-2 border-primary/20 hover:border-primary/40 transition-colors">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Medicine"
                    value={med.medicine}
                    onChange={(e) => handleMedicationChange(index, 'medicine', e.target.value)}
                    className="bg-gray-50"
                  />
                  <Input
                    placeholder="Dosage"
                    value={med.dosage}
                    onChange={(e) => handleMedicationChange(index, 'dosage', e.target.value)}
                    className="bg-gray-50"
                  />
                  <Input
                    placeholder="Instruction"
                    value={med.instruction}
                    onChange={(e) => handleMedicationChange(index, 'instruction', e.target.value)}
                    className="bg-gray-50"
                  />
                  <Input
                    placeholder="Number of Days"
                    value={med.numberOfDays}
                    onChange={(e) => handleMedicationChange(index, 'numberOfDays', e.target.value)}
                    className="bg-gray-50"
                  />
                  <Input
                    placeholder="Number of Times"
                    value={med.numberOfTimes}
                    onChange={(e) => handleMedicationChange(index, 'numberOfTimes', e.target.value)}
                    className="bg-gray-50"
                  />
                </div>
                {errors[`medication-${index}`] && (
                  <Alert variant="destructive" className="mt-2">
                    <AlertDescription>{errors[`medication-${index}`]}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="mt-4"
                  onClick={() => handleRemoveMedication(index)}
                >
                  <MinusIcon className="w-4 h-4 mr-2" /> Remove Medication
                </Button>
              </Card>
            ))}
            <Button type="button" variant="outline" onClick={handleAddMedication} className="w-full">
              <PlusIcon className="w-4 h-4 mr-2" /> Add Medication
            </Button>
          </div>

          <div className="space-y-4">
            <Label htmlFor="attachments" className="text-lg font-medium">Attachments</Label>
            <Input
              id="attachments"
              type="file"
              onChange={handleAttachmentChange}
              className="hidden"
            />
            <Button type="button" variant="outline" onClick={() => document.getElementById('attachments').click()} className="w-full">
              <UploadIcon className="w-4 h-4 mr-2" /> Upload File
            </Button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
              {attachments.map((file, index) => (
                <Card key={index} className="p-4 bg-gray-50">
                  <div className="flex justify-between items-center">
                    <span className="truncate font-medium">{file.name}</span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveAttachment(index)}
                    >
                      <XIcon className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{(file.size / 1024).toFixed(2)} KB</p>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="w-full">Submit Prescription</Button>
        </CardFooter>
      </Card>

      <Dialog open={fileTypeDialogOpen} onOpenChange={setFileTypeDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Select File Type</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4">
            {fileTypes.map((type) => (
              <Button key={type} onClick={() => handleFileTypeSelection(type)} variant="outline">
                {type}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <Button onClick={() => setFileTypeDialogOpen(false)} variant="outline">Cancel</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </form>
  );
};

export default PrescriptionForm;