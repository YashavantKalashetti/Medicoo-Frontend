import React, { useState, useMemo } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Hospital, Phone, Mail, MapPin, Stethoscope, CheckCircle, XCircle, Search, SearchCheck, UserRoundX, UserRound } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { height } from '@mui/system';
import { Link } from 'react-router-dom';

const SPECIALTIES = [
  "SUPER_SPECIALTY", "MULTI_SPECIALTY", "FERTILITY", "EYE_CARE", "CARDIAC", "NEPHROLOGY", "ONCOLOGY",
  "GENERAL", "MATERNITY", "ORTHOPEDIC", "NEUROLOGY", "PSYCHIATRY", "PEDIATRIC", "GERIATRIC",
  "DERMATOLOGY", "GASTROENTEROLOGY", "PULMONOLOGY", "RHEUMATOLOGY", "UROLOGY", "ENT", "DENTAL",
  "ALLERGY", "ENDOCRINOLOGY", "PLASTIC_SURGERY", "REHABILITATION_CENTER"
];

const avatarImages = [
    "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/668298/pexels-photo-668298.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/668300/pexels-photo-668300.jpeg?auto=compress&cs=tinysrgb&w=600",
];

// Sample hospital data (15 hospitals)
const hospitals = [
  { id: 1, name: "City General Hospital", contactNumber: "123-456-7890", email: "info@citygeneral.com", address: "123 Main St, City", speciality: ["GENERAL", "MULTI_SPECIALTY"], availableForConsult: true },
  { id: 2, name: "Women's Health Center", contactNumber: "987-654-3210", email: "contact@womenshealth.com", address: "456 Elm St, Town", speciality: ["FERTILITY", "MATERNITY"], availableForConsult: false },
  { id: 3, name: "Children's Hospital", contactNumber: "456-789-0123", email: "info@childrenshospital.com", address: "789 Oak St, Village", speciality: ["PEDIATRIC"], availableForConsult: true },
  { id: 4, name: "Heart Institute", contactNumber: "321-654-9870", email: "info@heartinstitute.com", address: "321 Pine St, City", speciality: ["CARDIAC"], availableForConsult: true },
  { id: 5, name: "Cancer Research Center", contactNumber: "159-753-4680", email: "contact@cancercenter.com", address: "852 Maple St, Town", speciality: ["ONCOLOGY"], availableForConsult: false },
  { id: 6, name: "Orthopedic Specialists", contactNumber: "753-951-8520", email: "info@orthospecialists.com", address: "147 Birch St, City", speciality: ["ORTHOPEDIC"], availableForConsult: true },
  { id: 7, name: "Neurology Center", contactNumber: "852-741-9630", email: "contact@neurologycenter.com", address: "369 Cedar St, Town", speciality: ["NEUROLOGY"], availableForConsult: true },
  { id: 8, name: "Dental Clinic", contactNumber: "963-852-7410", email: "info@dentalclinic.com", address: "258 Walnut St, Village", speciality: ["DENTAL"], availableForConsult: false },
  { id: 9, name: "Eye Care Hospital", contactNumber: "741-852-9630", email: "contact@eyecare.com", address: "741 Spruce St, City", speciality: ["EYE_CARE"], availableForConsult: true },
  { id: 10, name: "Mental Health Institute", contactNumber: "852-963-7410", email: "info@mentalhealthinstitute.com", address: "963 Ash St, Town", speciality: ["PSYCHIATRY"], availableForConsult: true },
  { id: 11, name: "Respiratory Care Center", contactNumber: "147-258-3690", email: "contact@respiratorycare.com", address: "147 Beech St, Village", speciality: ["PULMONOLOGY"], availableForConsult: false },
  { id: 12, name: "Kidney & Dialysis Center", contactNumber: "258-369-1470", email: "info@kidneycenter.com", address: "258 Willow St, City", speciality: ["NEPHROLOGY"], availableForConsult: true },
  { id: 13, name: "Gastroenterology Clinic", contactNumber: "369-147-2580", email: "contact@gastroclinic.com", address: "369 Poplar St, Town", speciality: ["GASTROENTEROLOGY"], availableForConsult: true },
  { id: 14, name: "Dermatology & Cosmetic Center", contactNumber: "147-258-3690", email: "info@dermatologycenter.com", address: "147 Sycamore St, Village", speciality: ["DERMATOLOGY"], availableForConsult: false },
  { id: 15, name: "Sports Medicine Hospital", contactNumber: "258-369-1470", email: "contact@sportsmedicine.com", address: "258 Redwood St, City", speciality: ["ORTHOPEDIC", "REHABILITATION_CENTER"], availableForConsult: true },
];

const HospitalList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const hospitalsPerPage = 12;

  const filteredHospitals = useMemo(() => {
    return hospitals.filter(hospital => {
      const searchRegex = new RegExp(searchTerm, 'i');
      return (
        searchRegex.test(hospital.name) ||
        searchRegex.test(hospital.contactNumber) ||
        searchRegex.test(hospital.email) ||
        searchRegex.test(hospital.address) ||
        hospital.speciality.some(spec => searchRegex.test(spec))
      );
    });
  }, [searchTerm]);

  const indexOfLastHospital = currentPage * hospitalsPerPage;
  const indexOfFirstHospital = indexOfLastHospital - hospitalsPerPage;
  const currentHospitals = filteredHospitals.slice(indexOfFirstHospital, indexOfLastHospital);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto p-4">

      <h1 className="text-3xl font-bold mb-6 text-center">Hospital Directory</h1>

      <div className="relative flex items-center mb-10">
        <Search className="absolute left-3 text-gray-900" />
        <Input
            type="text"
            placeholder="Search by name, contact, email, address, or specialty..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        </div>

      {currentHospitals.map(hospital => (
        <Link to={`/hospitals/${hospital.id}`} key={hospital.id}>
          <Card key={hospital.id} className="mb-6 overflow-hidden" style={{"border": "2px solid black", "height": "42vh"}} >
          <div className="flex">
            <div className="">
              <img src={avatarImages[hospital.id % avatarImages.length]} alt={hospital.name} className="w-full h-full object-cover" />
            </div>
            <div className="w-2/3 p-4">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl justify-between">
                  <span className="flex items-center">
                    <Hospital className="mr-2" />
                    {hospital.name}
                  </span>
                  {hospital.availableForConsult ? (
                    <UserRound className="text-green-500" />
                ) : (
                    <UserRoundX className="text-red-500 bg" />
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="flex items-center mb-2"><Phone className="mr-2" /> {hospital.contactNumber}</p>
                <p className="flex items-center mb-2"><Mail className="mr-2" /> {hospital.email}</p>
                <p className="flex items-center mb-2"><MapPin className="mr-2" /> {hospital.address}</p>
                <p className="flex items-center">
                  <Stethoscope className="mr-2" /> 
                  {hospital.speciality.join(', ')}
                </p>
              </CardContent>
            </div>
          </div>
        </Card>
        </Link>
      ))}

      <div className="flex justify-center mt-6">
        {Array.from({ length: Math.ceil(filteredHospitals.length / hospitalsPerPage) }, (_, i) => (
          <Button
            key={i}
            onClick={() => paginate(i + 1)}
            variant={currentPage === i + 1 ? "default" : "outline"}
            className="mx-1"
          >
            {i + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default HospitalList;