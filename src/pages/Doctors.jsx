import React, { useState, useMemo, useEffect } from 'react';
import { Search, Star, ChevronDown, Shield, Smile, Heart, Calendar, Clock, Map, Phone, CheckCircle, XCircle, Baby, Bone, Framer } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import CustomLoader from '@/Partials/CustomLoader';
import { FaHeart, FaHeartbeat, FaSearch, FaStethoscope, FaUserMd, FaUsers } from 'react-icons/fa';
import { Link } from 'react-router-dom';

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
          <Link to={`/doctors/${doctor.id} `}> <h3 className="text-xl font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>{doctor.name}</h3></Link>
          <p className="text-sm font-medium text-custom_blue mb-2" style={{ fontFamily: 'Roboto, sans-serif' }}>{doctor.specialization.charAt(0).toUpperCase() + doctor.specialization.slice(1).toLowerCase()}</p>
          <div className="flex items-center mb-4">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="text-sm font-medium text-gray-700" style={{ fontFamily: 'Roboto, sans-serif' }}>{doctor.rating.toFixed(1)} Rating</span>
          </div>
          <Button className="w-full bg-custom_blue hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors duration-300" style={{ fontFamily: 'Roboto, sans-serif' }}>
          <Link to={`/doctors/${doctor.id} `}> Book Appointment </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);  

const SearchBarWithDropdown = ({ searchTerm, setSearchTerm, selectedSpecialization, setSelectedSpecialization }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative w-full max-w-3xl mx-auto mb-12">
      <div className="flex items-center bg-white rounded-full shadow-md overflow-hidden">
        <div className="relative flex-grow">
          <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search doctors or specialties..."
            className="w-full pl-14 pr-4 py-3 text-base text-gray-700 placeholder-gray-500 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button
            className="flex items-center justify-between px-6 py-3 text-sm text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300 focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="mr-2">{selectedSpecialization || 'ALL'}</span>
            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.ul
                className="absolute z-10 w-48 right-0 mt-1 bg-white rounded-lg shadow-lg max-h-60 overflow-auto"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <motion.li
                  key="all"
                  className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${!selectedSpecialization ? 'bg-gray-100 font-medium' : ''}`}
                  onClick={() => {
                    setSelectedSpecialization('');
                    setIsDropdownOpen(false);
                  }}
                >
                  All
                </motion.li>
                {specializations.map((option) => (
                  <motion.li
                    key={option}
                    className={`px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors duration-150 ${option === selectedSpecialization ? 'bg-gray-100 font-medium' : ''}`}
                    onClick={() => {
                      setSelectedSpecialization(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const InteractiveHeader = () => (
  <div className="relative bg-gradient-to-r py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    <div className="relative max-w-7xl mx-auto">
      <motion.h1
        className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        style={{ fontFamily: 'Inter, sans-serif' }}
      >
        Welcome to Medico
      </motion.h1>
      <motion.p
        className="text-xl text-gray-700 text-center mb-12 max-w-3xl mx-auto leading-relaxed"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{ fontFamily: 'Roboto, sans-serif' }}
      >
        Your health is our priority. Discover top-rated doctors and book appointments easily.
      </motion.p>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-600"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, staggerChildren: 0.1 }}
      >
        {[
          { icon: FaStethoscope, text: "Access a wide network of specialists across various fields." },
          { icon: FaUserMd, text: "Connect with experienced and highly-rated professionals." },
          { icon: FaUsers, text: "Join thousands of satisfied patients." }
        ].map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <item.icon className="text-4xl text-blue-600 mb-4" />
            <p className="text-lg leading-relaxed">{item.text}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
    <div className="absolute top-0 right-0 -mt-20 -mr-20 lg:mt-0 lg:mr-0 lg:right-0">
      <svg
        width={404}
        height={404}
        fill="none"
        viewBox="0 0 404 404"
        aria-hidden="true"
        className="text-blue-100 opacity-20"
      >
        <defs>
          <pattern
            id="de316486-4a29-4312-bdfc-fbce2132a2c1"
            x={0}
            y={0}
            width={20}
            height={20}
            patternUnits="userSpaceOnUse"
          >
            <rect x={0} y={0} width={4} height={4} fill="currentColor" />
          </pattern>
        </defs>
        <rect width={404} height={404} fill="url(#de316486-4a29-4312-bdfc-fbce2132a2c1)" />
      </svg>
    </div>
  </div>
);


const FeaturedSpecialties = () => (
  <section className="mb-16">
    <h2 className="text-3xl font-bold mb-8 text-center">Featured Specialties</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {[
        { name: 'Cardiology', icon: Heart },
        { name: 'Pediatrics', icon: Baby },
        { name: 'Orthopedics', icon: Bone },
        { name: 'Dermatology', icon: Framer }
      ].map((specialty) => (
        <div
          key={specialty.name}
          className="bg-white rounded-lg shadow-md p-6 text-center cursor-pointer transition-all duration-300 ease-in-out hover:shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          <specialty.icon className="w-12 h-12 mx-auto mb-4 text-custom_blue" />
          <h3 className="text-xl font-semibold mb-2">{specialty.name}</h3>
          <p className="text-sm text-gray-600">Find top {specialty.name.toLowerCase()} specialists</p>
        </div>
      ))}
    </div>
  </section>
);

const HowItWorks = () => (
  <section className="mb-16 bg-gray-50 py-16 rounded-lg">
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

const DoctorSearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('ALL');
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/search/doctors?page=1&perPage=100`);
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
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen">Error: {error}</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <InteractiveHeader />

        <section className="mb-16">
          <div className="flex justify-center items-center mb-8">
            {/* <FaHeart className="text-custom_blue mr-2 text-4xl" /> */}
            <h2 className="text-4xl font-extrabold text-center text-custom_blue" style={{ fontFamily: 'Inter, sans-serif' }}>
              Find Your Doctor
            </h2>
            <FaStethoscope className="text-custom_blue ml-2 text-4xl" />
          </div>
          <div className="flex items-center justify-center">
            <FaSearch className="text-gray-400 mr-2" />
            <SearchBarWithDropdown
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              selectedSpecialization={selectedSpecialization}
              setSelectedSpecialization={setSelectedSpecialization}
            />
          </div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8"
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

        <FeaturedSpecialties />

        <HowItWorks />

        <Testimonials />

        <section className="bg-custom_blue text-white py-16 rounded-lg mb-16">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4 text-white">Need Immediate Assistance?</h2>
            <p className="mb-8">Our team is available 24/7 to help you with any medical concerns.</p>
            <div className="flex justify-center space-x-4">
              <Button className="bg-white text-custom_blue hover:bg-gray-100 transition-colors duration-300">
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
              <Button className="bg-white text-custom_blue hover:bg-gray-100 transition-colors duration-300">
                <Clock className="w-5 h-5 mr-2" />
                Schedule a Call
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}


export default DoctorSearchPage;