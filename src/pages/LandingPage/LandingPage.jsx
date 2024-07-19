import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, User, Calendar, Activity, Phone, Mail, MapPin, Menu, X, Stethoscope, Brain, Bone, Eye } from 'lucide-react';
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
    { icon: Stethoscope, name: 'General Practice' },
    { icon: Brain, name: 'Neurology' },
    { icon: Bone, name: 'Orthopedics' },
    { icon: Eye, name: 'Ophthalmology' },
  ];

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
      <div className="bg-blue-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
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
      </div>

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
      <div className="bg-gray-50 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 overflow-hidden">
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
      </div>

      {/* Contact Section (unchanged) */}

      {/* Footer (unchanged) */}
    </div>
  );
};

export default HealthcareLandingPage;


import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

