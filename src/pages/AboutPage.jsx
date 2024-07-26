import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, FileText, Calendar, AlertCircle, Hospital, User, Shield, Clock, Ambulance } from 'lucide-react';

const About = () => {
  const [activeTab, setActiveTab] = useState('records');

  const features = [
    { icon: FileText, title: 'Centralized Medical Records', description: 'Secure storage for all your medical data in one place.', tab: 'records' },
    { icon: Calendar, title: 'Easy Consultations', description: 'Book appointments with doctors online or offline.', tab: 'consultations' },
    { icon: Ambulance, title: 'Emergency Services', description: 'Quick access to nearby hospitals and emergency care.', tab: 'emergency' },
    { icon: Hospital, title: 'Hospital Network', description: 'Track doctor availability and hospital presence in real-time.', tab: 'availability' },
  ];

  const tabContent = {
    records: {
      title: 'Centralized Medical Records',
      content: `Our platform offers a centralized and secure storage solution for all your medical-related information. With key functionalities like Upload and Storage, both doctors and patients can easily upload and store medical reports, prescriptions, and medication details in one secure location. History Tracking ensures that users can maintain a comprehensive medical history, recording all medical interactions and treatments for easy reference.
      
    Access Control allows users to manage who has access to their medical data, granting permissions to primary doctors, parents, or relatives. This feature ensures that sensitive information is only shared with authorized individuals, which is crucial in emergencies. Additionally, our platform supports the organization of the entire family's medical records in one place, making it easier to manage and access vital health information when needed.`
    },
    consultations: {
      title: 'Consultation Services',
      content: `The platform offers a robust system for consulting healthcare professionals, ensuring users have comprehensive access to the healthcare services they need. One of the key features is the Doctor and Hospital Directory. This directory includes a wide array of registered doctors and hospitals, allowing users to search and select healthcare providers effortlessly. The directory is designed to make finding the right doctor or hospital easy and efficient, thereby improving the overall healthcare experience for users.

    Additionally, the platform facilitates both Online Consultation Booking and Offline Appointment Scheduling. Users can book appointments with doctors online, with available time slots clearly displayed for easy selection. This feature provides the convenience of scheduling consultations from the comfort of one's home. For those who prefer face-to-face interactions, the platform also supports offline appointment scheduling, enabling users to visit hospitals in person. This dual approach ensures that users can choose the consultation mode that best fits their needs and preferences.
    `
    },
    emergency: {
      title: 'Emergency Services',
      content: `In emergencies, the platform is equipped to provide rapid assistance and critical information. One of the key features is the Emergency Hospital Finder, which utilizes geolocation technology to identify and direct users to the nearest hospital with the required specialty. This feature is crucial in time-sensitive situations, ensuring that users receive prompt medical attention when it is most needed. By leveraging geolocation, the platform can quickly pinpoint the nearest suitable hospital, significantly improving response times and potentially saving lives.
    
    The platform also includes Emergency Notifications and Access to Medical Records to further enhance its emergency services. Emergency notifications automatically alert the nearest hospital and the user's parents about the emergency, including the user's current location to facilitate a swift response. Additionally, during emergencies, doctors can access medical records that the user has pre-designated for emergency viewing. This ensures that healthcare providers have the necessary information to provide immediate and effective care, streamlining the process and improving the chances of a positive outcome in critical situations.
    `
    },
    availability: {
      title: 'Real-time Availability',
      content: `The platform ensures that users and hospitals can manage and monitor availability efficiently through its comprehensive Consultation Availability feature. This feature displays the current availability of doctors and hospitals for consultations, providing users with up-to-date information to schedule appointments conveniently. By having access to real-time availability data, users can avoid the frustration of overbooked schedules and long wait times. This not only enhances the user experience but also optimizes the utilization of healthcare resources, ensuring that consultations are planned effectively and efficiently.
    
    In addition to consultation scheduling, the platform offers a Real-time Doctor Presence feature, which allows hospitals to track which doctors are currently present within the facility. This functionality is particularly valuable for managing emergencies, as it ensures that the necessary medical personnel are available when needed most. By knowing the real-time presence of doctors, hospitals can make informed decisions quickly, deploying available doctors to urgent cases without delay. This capability enhances the hospital's operational efficiency and improves patient care by ensuring that medical professionals are always on hand to respond to emergencies promptly.
    `
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b ">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl font-extrabold text-blue-900 text-center mb-8 mt-10">
            Revolutionizing Healthcare Management
          </h1>
          <p className="text-xl text-blue-700 text-center max-w-3xl mx-auto mb-16 leading-relaxed">
            HealthHub is your all-in-one platform for managing medical records, consultations, and emergencies. Experience seamless healthcare like never before.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 cursor-pointer md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className={`p-8 rounded-xl  cursor-pointer shadow-lg ${
                activeTab === feature.tab ? 'bg-blue-600 text-white' : 'bg-white'
              }`}
              // whileHover={{ scale: 1.05 ,cursor:'pointer'}}
              // transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setActiveTab(feature.tab)}
            >
              <feature.icon className={`h-16 w-16 cursor-pointer mb-6 ${activeTab === feature.tab ? 'text-white' : 'text-blue-600'}`} />
              <h3 className={`text-xl font-bold mb-4 cursor-pointer ${activeTab === feature.tab ? 'text-white' : 'text-blue-900'}`}>
                {feature.title}
              </h3>
              <p className={`${activeTab === feature.tab ? 'text-blue-100' : 'text-blue-700'} leading-relaxed`}>{feature.description}</p>
            </motion.div>
          ))}
        </motion.section>

        <motion.section
          key={activeTab}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-10 rounded-xl shadow-lg mb-20"
        >
          <h2 className="text-3xl font-bold text-blue-900 mb-6">{tabContent[activeTab].title}</h2>
          <p className="text-blue-700 leading-relaxed">{tabContent[activeTab].content}</p>
        </motion.section>

        <section className="text-center mb-20">
          <h2 className="text-4xl font-bold text-blue-900 mb-12">Why Choose HealthHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: Shield, title: 'Privacy & Security', description: 'Your data is protected with state-of-the-art encryption and access controls.' },
              { icon: Clock, title: 'Time-Saving', description: 'Manage all your healthcare needs efficiently from a single platform.' },
              { icon: User, title: 'User-Centric', description: 'Designed with your needs in mind, ensuring a seamless healthcare experience.' },
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-blue-50 p-8 rounded-xl shadow-md"
              >
                <benefit.icon className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-blue-900 mb-4">{benefit.title}</h3>
                <p className="text-blue-700 leading-relaxed">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;