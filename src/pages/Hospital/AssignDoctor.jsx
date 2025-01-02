import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus } from 'lucide-react';
import { Button } from 'antd';

const AssignDoctorLogo = ({ doctors, onAssign, appointment }) => {
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleSubmit = () => {
    if (selectedDoctor) {
      onAssign(selectedDoctor, appointment);
    }else{
        window.alert("Please select a doctor")
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className='bg-red-500 m-1 text-gray-100' variant="outline" size="icon">
          <UserPlus  className="h-5 w-5" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">Assign Doctor</h4>
          <Select onValueChange={setSelectedDoctor}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a doctor" />
            </SelectTrigger>
            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button onClick={handleSubmit} className="w-full">
            Assign
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default AssignDoctorLogo;