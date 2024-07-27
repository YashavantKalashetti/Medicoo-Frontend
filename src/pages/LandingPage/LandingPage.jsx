import React, { useState, useEffect } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Heart, User, Calendar, Activity, Phone, Mail, MapPin, Menu, X, Stethoscope, Brain, Bone, Eye, Quote, Star, Ear } from 'lucide-react';
import { FaLungs, FaTooth } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import Navbar from './Navbar';
import '../../css/landingpage.css'
import HeroSection from './HeroSection';

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
      className={`bg-card p-6 rounded-lg shadow-lg cursor-pointer ${
        isExpanded ? 'col-span-2 row-span-2 border border-primary dark:border-gray-600' : 'border border-transparent dark:border-gray-600'
      }`}
      whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(0,0,0,0.1)" }}
      onClick={onClick}
    >
      <motion.div layout className="flex flex-col items-center h-full">
        <motion.div
          layout
          className={`rounded-full ${isExpanded ? 'bg-primary/10 p-6' : 'bg-primary/5 p-4'}`}
        >
          <specialty.icon className={`${isExpanded ? 'h-16 w-16' : 'h-12 w-12'} text-primary`} />
        </motion.div>
        <motion.h3 layout className="mt-4 text-lg font-medium text-foreground text-center dark:text-white">
          {specialty.name}
        </motion.h3>
        <AnimatePresence>
          {isExpanded && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-2 text-muted-foreground text-center dark:text-gray-400"
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
      <div className="bg-background py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-extrabold text-foreground text-center mb-4 dark:text-white"
          >
            Our Medical Specialties
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground text-center mb-12 dark:text-gray-400"
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
      name: "Khushi",
      quote: "The care I received was exceptional. The staff was friendly and professional.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=1"
    },
    {
      name: "Yash",
      quote: "Booking an appointment was easy, and the wait times were minimal. Great experience!",
      rating: 4,
      image: "https://i.pravatar.cc/150?img=2"
    },
    {
      name: "Mithun",
      quote: "The doctors are knowledgeable and take the time to listen. I highly recommend this clinic.",
      rating: 5,
      image: "https://i.pravatar.cc/150?img=3"
    },
  ];

  const TestimonialCard = ({ testimonial }) => (
    <motion.div
      className="bg-card rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:shadow-xl border border-border"
      whileHover={{ scale: 1.02 }}
    >
      <div className="p-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <Avatar className="w-16 h-16 border-4 border-primary">
              <AvatarImage src={testimonial.image} alt={testimonial.name} />
              <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-foreground">{testimonial.name}</h3>
              <p className="text-sm text-muted-foreground">Patient</p>
            </div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < testimonial.rating ? 'text-yellow-400' : 'text-muted-foreground'
                }`}
                fill="currentColor"
              />
            ))}
          </div>
        </div>
        <div className="relative">
          <Quote className="absolute top-0 left-0 w-8 h-8 text-primary/20 transform -translate-x-4 -translate-y-4" />
          <p className="text-muted-foreground italic relative z-10">"{testimonial.quote}"</p>
        </div>
      </div>
    </motion.div>
  );

  const EyeCatchingTestimonials = () => {
    return (
      <div className="bg-secondary/5 py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-t border-border">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-center text-4xl font-extrabold text-foreground sm:text-5xl mb-2">
              Hear from Our Patients
            </h2>
            <p className="text-center text-xl text-muted-foreground mb-12">
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

  return (
    <div className="min-h-screen bg-background text-foreground">

      <HeroSection />

      <div className="bg-card border-t border-b border-border">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold text-foreground">Our Services</h2>
            <p className="mt-4 text-lg text-muted-foreground">We offer a wide range of healthcare services to meet your needs.</p>
          </div>
          <div className="mt-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 lg:gap-x-8">
            {[
              { icon: User, title: 'Personal Care', description: 'Tailored healthcare plans for your individual needs.' },
              { icon: Calendar, title: 'Easy Scheduling', description: 'Book appointments online or through our mobile app.' },
              { icon: Activity, title: 'Health Monitoring', description: 'Regular check-ups and health tracking services.' },
            ].map((feature) => (
              <Card key={feature.title} className="border-border">
                <CardHeader>
                  <feature.icon className="h-8 w-8 text-primary" />
                  <h3 className="mt-2 text-lg font-medium text-foreground">{feature.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="mt-2 text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <InteractiveMedicalSpecialties />

      <motion.div
        ref={ref}
        animate={controls}
        initial="hidden"
        className="bg-card py-16 px-4 sm:px-6 lg:py-24 lg:px-8 border-t border-b border-border"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-foreground text-center mb-12">Our Impact</h2>
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
                <p className="text-4xl font-extrabold text-primary">{stat.number}</p>
                <p className="mt-2 text-lg text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      <EyeCatchingTestimonials />
    </div>
  );
};

export default HealthcareLandingPage;