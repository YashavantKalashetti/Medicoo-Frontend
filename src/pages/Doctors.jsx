import { useState, useMemo, useEffect } from 'react';
import { Search, Star, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const DEFAULT_AVATAR = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";

const specializations = ['ALL'];

const DoctorCard = ({ doctor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Card className="overflow-hidden bg-white shadow-lg rounded-2xl">
      <CardContent className="p-0">
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center relative overflow-hidden">
          <motion.img 
            src={doctor.avatar || DEFAULT_AVATAR} 
            alt={doctor.name} 
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-2"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="text-sm font-medium">{doctor.availableForConsult ? 'Available for Consult' : 'Not Available'}</p>
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
          <p className="text-sm font-medium text-blue-500 mb-2">{doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1).toLowerCase()}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700">{doctor.rating.toFixed(1)} Rating</span>
          </div>
          <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-full text-sm font-medium transition-colors duration-300">
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const SearchBarWithDropdown = ({ searchTerm, setSearchTerm, selectedSpecialization, setSelectedSpecialization }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative flex-grow max-w-md w-full">
      <div className="flex items-center bg-white rounded-full shadow-md">
        <Search className="absolute left-4 text-blue-500 w-6 h-6" />
        <Input
          type="text"
          placeholder="Search doctors..."
          className="pl-12 pr-4 py-3 w-full rounded-full focus:ring-2 focus:ring-blue-300 transition-all duration-300"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex items-center justify-between py-3 px-4 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-300 transition-all duration-300 rounded-full"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedSpecialization}
          <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
        </button>
      </div>
      <AnimatePresence>
        {isDropdownOpen && (
          <motion.ul
            className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto border border-gray-200"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {specializations.map((option) => (
              <motion.li
                key={option}
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${
                  option === selectedSpecialization ? 'bg-blue-100 font-medium' : ''
                } rounded-full mx-2 my-1`}
                onClick={() => {
                  setSelectedSpecialization(option);
                  setIsDropdownOpen(false);
                }}
                whileHover={{ backgroundColor: '#EBF5FF' }}
                whileTap={{ backgroundColor: '#BFDBFE' }}
              >
                {option}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

const DoctorSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('ALL');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://medicoo.onrender.com/api/v1/search/doctors');
        const doctors = response.data.doctors.map(doctor => ({
          ...doctor,
          avatar: doctor.avatar || DEFAULT_AVATAR
        }));

        setDoctors(doctors);
        specializations.push(...new Set(doctors.map(doctor =>
          doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1).toLowerCase()
        )));
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = useMemo(() => {
    return doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedSpecialization === 'ALL' || doctor.specialization.toLowerCase() === selectedSpecialization.toLowerCase())
    );
  }, [searchTerm, selectedSpecialization, doctors]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 bg-gray-50 min-h-screen">
      <motion.h1 
        className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'Arial, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
      >
        Find Your Doctor
      </motion.h1>
      <div className="mb-12 flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
        <SearchBarWithDropdown
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
        />
      </div>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, staggerChildren: 0.1 }}
      >
        {filteredDoctors.map(doctor => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DoctorCard doctor={doctor} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DoctorSearchPage;
