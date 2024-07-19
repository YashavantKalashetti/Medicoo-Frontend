import { useState, useMemo, useEffect } from 'react';
import { Search, Star, ChevronDown, Shield, Smile, Heart, Calendar, Clock, Map, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';
import CustomLoader from '@/Partials/CustomLoader';
// import { Clock } from '@mui/x-date-pickers/TimeClock/Clock';

const DEFAULT_AVATAR = "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png";

const specializations = ['ALL'];

const DoctorCard = ({ doctor }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <Card className="overflow-hidden bg-white shadow-lg rounded-lg">
      <CardContent className="p-0">
        <div className="h-48 flex items-center justify-center relative overflow-hidden">
          <motion.img
            src={doctor.avatar || DEFAULT_AVATAR}
            alt={doctor.name}
            className="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white py-1 flex items-center justify-center space-x-2 rounded-t-lg"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {doctor.availableForConsult ? (
              <>
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-xs font-medium">Available</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-red-500" />
                <span className="text-xs font-medium">Unavailable</span>
              </>
            )}
          </motion.div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{doctor.name}</h3>
          <p className="text-sm font-medium text-custom_blue mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1).toLowerCase()}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{doctor.rating.toFixed(1)} Rating</span>
          </div>
          <Button className="w-full bg-custom_blue hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors duration-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);


const FeaturedSpecialties = () => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">Featured Specialties</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {['Cardiology', 'Pediatrics', 'Orthopedics', 'Dermatology'].map((specialty) => (
        <motion.div
          key={specialty}
          className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3 className="text-xl font-semibold mb-2">{specialty}</h3>
          <p className="text-sm text-gray-600">Find top {specialty.toLowerCase()} specialists</p>
        </motion.div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="mb-16 bg-gray-50 py-16">
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: Search, title: "Search", description: "Find doctors by specialty or name" },
          { icon: Calendar, title: "Book", description: "Choose a convenient time slot" },
          { icon: CheckCircle, title: "Consult", description: "Meet your doctor online or in-person" }
        ].map((step, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <step.icon className="w-16 h-16 text-custom_blue mb-4" />
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-600">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);


const Testimonials = () => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">What Our Patients Say</h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {[
        { name: "John Doe", text: "Excellent service! Found a great doctor quickly." },
        { name: "Jane Smith", text: "The booking process was smooth and hassle-free." },
        { name: "Mike Johnson", text: "I'm impressed with the quality of care I received." }
      ].map((testimonial, index) => (
        <motion.div
          key={index}
          className="bg-white rounded-lg shadow-md p-6"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
          <p className="font-semibold">{testimonial.name}</p>
        </motion.div>
      ))}
    </div>
  </section>
);


const SearchBarWithDropdown = ({ searchTerm, setSearchTerm, selectedSpecialization, setSelectedSpecialization }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative w-full max-w-lg mx-auto mb-12">
      <div className="flex items-center bg-white rounded-lg shadow-md relative">
        <Search className="absolute left-4 text-custom_blue w-6 h-6" />
        <Input
          type="text"
          placeholder="Search doctors..."
          className="pl-12 pr-32 py-3 w-full rounded-lg focus:outline-none focus:ring-0 focus:ring-2 focus:ring-transparent focus:border-transparent focus:shadow-lg transition-all duration-300"
          style={{
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            transition: "box-shadow 0.3s ease-in-out",
            border: "1px solid transparent"
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1), 0 0 10px rgba(255, 255, 255, 0.5), 0 0 20px rgba(192, 192, 192, 0.5)";
            e.target.style.border = "1px solid transparent";
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.1)";
            e.target.style.border = "1px solid transparent";
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="flex items-center justify-between py-3 px-4 text-sm text-gray-700 font-medium focus:outline-none focus:ring-2 focus:custom_blue transition-all duration-300 rounded-lg absolute right-0 top-0 bottom-0"
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
                className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 transition-colors duration-150 ${option === selectedSpecialization ? 'bg-blue-100 font-medium' : ''} rounded-lg mx-2 my-1`}
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

const InteractiveHeader = () => (
  <div className="text-center mb-12 px-4">
    <motion.h1
      className="text-5xl font-bold mb-6  bg-clip-text"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ fontFamily: 'Inter, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}
    >
      Welcome to Medico
    </motion.h1>
    <motion.p
      className="text-lg text-gray-700 mb-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ fontFamily: 'Roboto, sans-serif' }}
    >
      Your health is our priority. Discover top-rated doctors and book appointments easily.
    </motion.p>
    <motion.div
      className="flex flex-wrap justify-center items-center gap-8 mt-8"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-72 h-72"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Heart className="w-16 h-16 text-custom_blue mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Quality Care</h3>
        <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>We provide the best health services with top-rated doctors.</p>
      </motion.div>
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-72 h-72"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Shield className="w-16 h-16 text-custom_blue mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Trusted Services</h3>
        <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>Your health data is secure and protected with us.</p>
      </motion.div>
      <motion.div
        className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center w-72 h-72"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Smile className="w-16 h-16 text-custom_blue mb-4" />
        <h3 className="text-2xl font-semibold text-gray-800 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>Patient Satisfaction</h3>
        <p className="text-sm text-gray-600 text-center" style={{ fontFamily: 'Roboto, sans-serif' }}>Our goal is to ensure you have a positive experience.</p>
      </motion.div>
    </motion.div>
  </div>
);

const DoctorSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('ALL');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('https://medicoo-backend-main.onrender.com/api/v1/search/doctors');
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
    return <div className='flex justify-center items-center h-screen '><CustomLoader /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <InteractiveHeader />
        <SearchBarWithDropdown
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedSpecialization={selectedSpecialization}
          setSelectedSpecialization={setSelectedSpecialization}
        />
        <FeaturedSpecialties />
        <HowItWorks />
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Find Your Doctor</h2>
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
        </section>
        <Testimonials />
        <section className="bg-custom_blue text-white py-16 rounded-lg">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Need Immediate Assistance?</h2>
            <p className="mb-8">Our team is available 24/7 to help you with any medical concerns.</p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-custom_blue hover:bg-gray-100">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button className="bg-white text-custom_blue hover:bg-gray-100">
                <Clock className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>
      </div>
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Medico</h3>
              <p className="text-sm">Your trusted healthcare partner</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Find a Doctor</a></li>
                <li><a href="#" className="hover:text-gray-300">Our Services</a></li>
                <li><a href="#" className="hover:text-gray-300">About Us</a></li>
                <li><a href="#" className="hover:text-gray-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-gray-300">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-gray-300">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm">
            © 2024 Medico. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DoctorSearchPage;
