import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { FaLungs, FaTooth } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import { motion, useAnimation,AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, User, Calendar, Activity, Phone, Mail, MapPin, Menu, X, Stethoscope, Brain, Bone, Eye, Quote, Star, Ear } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import '../../css/landingpage.css'

const HealthcareLandingPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const statsVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const specialties = [
    { name: "Cardiology", icon: Heart, description: "Specializing in diseases of the heart and blood vessels." },
    { name: "Neurology", icon: Brain, description: "Focusing on disorders of the nervous system." },
    { name: "Ophthalmology", icon: Eye, description: "Dealing with the diagnosis and treatment of eye disorders." },
    { name: "Orthopedics", icon: Bone, description: "Concerned with conditions involving the musculoskeletal system." },
    { name: "Pulmonology", icon: FaLungs, description: "Specializing in diseases involving the respiratory tract." },
    { name: "ENT", icon: Ear, description: "Focusing on ears, nose, throat, and related structures of the head and neck." },
    { name: "Dentistry", icon: FaTooth, description: "Specializing in the diagnosis, prevention, and treatment of oral diseases." },
    { name: "General Medicine", icon: Stethoscope, description: "Providing primary healthcare and treating a wide range of conditions." },
  ];

  const SpecialtyCard = ({ specialty, isExpanded, onClick }) => (
    <motion.div
      layout
      className={`bg-white p-6 rounded-lg shadow-lg cursor-pointer ${
        isExpanded ? 'col-span-2 row-span-2' : ''
      }`}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,0,0,0.1)" }}
      onClick={onClick}
    >
      <motion.div layout className="flex flex-col items-center h-full">
        <motion.div
          layout
          className={`rounded-full ${
            isExpanded ? 'bg-blue-100 p-6' : 'bg-blue-50 p-4'
          }`}
        >
          <specialty.icon className={`${isExpanded ? 'h-16 w-16' : 'h-12 w-12'} text-blue-500`} />
        </motion.div>
        <motion.h3 layout className="mt-4 text-lg font-medium text-gray-900 text-center">
          {specialty.name}
        </motion.h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-gray-600 text-center"
            >
              {specialty.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
  
  const InteractiveMedicalSpecialties = () => {
    const [expandedIndex, setExpandedIndex] = useState(null);
  
    return (
      <div className="bg-gradient-to-br  py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-gray-900 text-center mb-4"
          >
            Our Medical Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-gray-600 text-center mb-12"
          >
            Explore our wide range of medical expertise
          </motion.p>
          <motion.div
            layout
            className="grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {specialties.map((specialty, index) => (
              <SpecialtyCard
                key={specialty.name}
                specialty={specialty}
                isExpanded={index === expandedIndex}
                onClick={() => setExpandedIndex(index === expandedIndex ? null : index)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    );
  };
  

  const testimonials = [
    {
      name: "John Doe",
      quote: "The care I received was exceptional. The staff was friendly and professional.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Jane Smith",
      quote: "Booking an appointment was easy, and the wait times were minimal. Great experience!",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Sam Johnson",
      quote: "The doctors are knowledgeable and take the time to listen. I highly recommend this clinic.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    },
  ];

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <img
              className="w-16 h-16 rounded-full border-4 border-blue-500"
              src={testimonial.image}
              alt={testimonial.name}
            />
            <div>
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <p className="text-sm text-gray-500">Patient</p>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                }`}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <Quote className="absolute top-0 left-0 w-8 h-8 text-blue-200 transform -translate-x-4 -translate-y-4" />
          <p className="text-gray-600 italic relative z-10">"{testimonial.quote}"</p>
        </div>
      </div>
    </motion.div>
  );

  const EyeCatchingTestimonials = () => {
    return (
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center text-4xl font-extrabold text-gray-900 sm:text-5xl mb-2">
              Hear from Our Patients
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12">
              Don't just take our word for it - see what our patients have to say!
            </p>
          </motion.div>
          <div className="grid gap-8 lg:grid-cols-3 lg:gap-x-8">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.name} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    );
  };

  // const specialties = [
  //   { icon: Stethoscope, name: 'General Practice' },
  //   { icon: Brain, name: 'Neurology' },
  //   { icon: Bone, name: 'Orthopedics' },
  //   { icon: Eye, name: 'Ophthalmology' },
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Hero Section with Floating Animation */}

      <HeroSection />


      {/* Features Section (unchanged) */}

      <div className="bg-white">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Our Services</h2>
            <p className="mt-4 text-lg text-gray-500">We offer a wide range of healthcare services to meet your needs.</p>
          </div>
          <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8  cxc">
            {[
              { icon: User, title: 'Personal Care', description: 'Tailored healthcare plans for your individual needs.' },
              { icon: Calendar, title: 'Easy Scheduling', description: 'Book appointments online or through our mobile app.' },
              { icon: Activity, title: 'Health Monitoring', description: 'Regular check-ups and health tracking services.' },
            ].map((feature) => (
              <Card key={feature.title} className='csx'>
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-blue-500" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* New Medical Specialties Section */}
      {/* <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Medical Specialties</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {specialties.map((specialty, index) => (
              <motion.div
                key={specialty.name}
                className="bg-white p-6 rounded-lg shadow-md text-center"
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <specialty.icon className="h-12 w-12 text-blue-500 mx-auto" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">{specialty.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div> */}
      <InteractiveMedicalSpecialties />

      {/* Scroll-Triggered Statistics Section */}
      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { number: "10k+", label: "Patients Served" },
              { number: "50+", label: "Specialist Doctors" },
              { number: "24/7", label: "Emergency Care" },
              { number: "98%", label: "Patient Satisfaction" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                custom={index}
                variants={statsVariants}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-blue-600">{stat.number}</p>
                <p className="mt-2 text-lg text-gray-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Testimonials Section with Parallax Effect */}
      {/* <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 overflow-hidden">
        <div className="relative max-w-7xl mx-auto">
          <div className="relative">
            <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Hear from Our Patients
            </h2>
            <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-3 lg:max-w-none">
              {[
                { name: "John Doe", quote: "The care I received was exceptional. The staff was friendly and professional." },
                { name: "Jane Smith", quote: "Booking an appointment was easy, and the wait times were minimal. Great experience!" },
                { name: "Sam Johnson", quote: "The doctors are knowledgeable and take the time to listen. I highly recommend this clinic." },
              ].map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <p className="text-xl font-semibold text-gray-900">"{testimonial.quote}"</p>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <img className="h-10 w-10 rounded-full" src={`https://github.com/shadcn.png`} alt="" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">Patient</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div> */}
      <EyeCatchingTestimonials />

      {/* Call to Action Section (unchanged) */}

      {/* Contact Section (unchanged) */}

      {/* Footer (unchanged) */}
    </div>
  );
};

export default HealthcareLandingPage;



