import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { FaUserMd, FaCalendarAlt, FaLanguage, FaGraduationCap, FaClock, FaDollarSign } from 'react-icons/fa';
import { MdLocalHospital } from 'react-icons/md';
import { IoMdArrowForward } from 'react-icons/io';
import { FiEdit2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#14B8A6'];

const DoctorDashboard = () => {
  const doctorData = {
    doctor: {
      id: "772014c3-5bc0-4a30-9497-5708b3576675",
      name: "Sujay",
      doctor_number: "DR9922853",
      contactNumber: "8073889010",
      gender: "MALE",
      email: "sujay@gmail.com",
      dob: "1990-05-20T00:00:00.000Z",
      address: "123 Main St, City, India",
      avatar: "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png",
      consultingFees: 500,
      availableStartTime: "19:00",
      availableEndTime: "21:00",
      availableForConsult: false,
      languages: ["Kannada", "English", "Hindi"],
      specialization: "NEONATOLOGIST",
      practicingSince: "2024-06-13T04:35:15.117Z",
      education: "MBBS",
      attendingHospitalId: null,
      totalAppointments: 0,
      rating: 0,
      createdAt: "2024-06-22T11:29:03.722Z",
      updatedAt: "2024-06-25T11:46:15.651Z",
      affiliatedHospitals: [
        {
          name: "BMS Hospital",
          address: "No 618, Sri Mallikarjuna Swamy, Gangamma Temple St, NR Colony, Bengaluru, Karnataka 560019",
          contactNumber: "8045088888",
          email: "bms@email.com"
        },
        {
          name: "City General Hospital",
          address: "456 Health Avenue, Metropolis, India",
          contactNumber: "9876543210",
          email: "citygeneral@email.com"
        }
      ]
    },
    onlineAppointments: [
      {
        id: "49789e98-ea4b-4590-9929-317282f0fbf3",
        patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9e",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-22T19:00:00.000Z",
        reason: "Nausea",
        createdAt: "2024-06-22T12:08:43.106Z",
        updatedAt: "2024-06-22T12:08:43.106Z",
        status: "NORMAL",
        mode: "ONLINE",
        hospitalId: null
      },
      {
        id: "69789e98-ea4b-4590-9929-317282f0fbf4",
        patientId: "124b8295-bed1-4c08-a4ad-14fb268fde9f",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-23T18:00:00.000Z",
        reason: "Headache",
        createdAt: "2024-06-23T10:00:43.106Z",
        updatedAt: "2024-06-23T10:00:43.106Z",
        status: "NORMAL",
        mode: "ONLINE",
        hospitalId: null
      },
      {
        id: "79789e98-ea4b-4590-9929-317282f0fbf5",
        patientId: "224b8295-bed1-4c08-a4ad-14fb268fde9g",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-24T20:00:00.000Z",
        reason: "Back pain",
        createdAt: "2024-06-24T11:08:43.106Z",
        updatedAt: "2024-06-24T11:08:43.106Z",
        status: "NORMAL",
        mode: "ONLINE",
        hospitalId: null
      },
      {
        id: "89789e98-ea4b-4590-9929-317282f0fbf6",
        patientId: "324b8295-bed1-4c08-a4ad-14fb268fde9h",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-25T17:00:00.000Z",
        reason: "Skin rash",
        createdAt: "2024-06-25T13:08:43.106Z",
        updatedAt: "2024-06-25T13:08:43.106Z",
        status: "NORMAL",
        mode: "ONLINE",
        hospitalId: null
      }
    ],
    offlineAppointments: [
      {
        id: "39789e98-ea4b-4590-9929-317282f0fbf7",
        patientId: "424b8295-bed1-4c08-a4ad-14fb268fde9i",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-22T15:00:00.000Z",
        reason: "Cough",
        createdAt: "2024-06-22T12:00:43.106Z",
        updatedAt: "2024-06-22T12:00:43.106Z",
        status: "NORMAL",
        mode: "OFFLINE",
        hospitalId: "1a2b3c4d"
      },
      {
        id: "49789e98-ea4b-4590-9929-317282f0fbf8",
        patientId: "524b8295-bed1-4c08-a4ad-14fb268fde9j",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-23T14:00:00.000Z",
        reason: "Fever",
        createdAt: "2024-06-23T10:00:43.106Z",
        updatedAt: "2024-06-23T10:00:43.106Z",
        status: "NORMAL",
        mode: "OFFLINE",
        hospitalId: "1a2b3c4d"
      },
      {
        id: "59789e98-ea4b-4590-9929-317282f0fbf9",
        patientId: "624b8295-bed1-4c08-a4ad-14fb268fde9k",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-24T16:00:00.000Z",
        reason: "Stomach ache",
        createdAt: "2024-06-24T11:00:43.106Z",
        updatedAt: "2024-06-24T11:00:43.106Z",
        status: "NORMAL",
        mode: "OFFLINE",
        hospitalId: "1a2b3c4d"
      },
      {
        id: "69789e98-ea4b-4590-9929-317282f0fbf0",
        patientId: "724b8295-bed1-4c08-a4ad-14fb268fde9l",
        doctorId: "772014c3-5bc0-4a30-9497-5708b3576675",
        date: "2024-06-25T18:00:00.000Z",
        reason: "Allergy",
        createdAt: "2024-06-25T13:00:43.106Z",
        updatedAt: "2024-06-25T13:00:43.106Z",
        status: "NORMAL",
        mode: "OFFLINE",
        hospitalId: "1a2b3c4d"
      }
    ],
  };

  const { doctor, onlineAppointments, offlineAppointments } = doctorData;

  const totalAppointments = onlineAppointments.length + offlineAppointments.length;
  const pieData = [
    { name: 'Online', value: onlineAppointments.length },
    { name: 'Offline', value: offlineAppointments.length },
    { name: 'Pending', value: Math.floor(totalAppointments * 0.2) },
    { name: 'Completed', value: Math.floor(totalAppointments * 0.7) },
  ];

  const allAppointments = [...onlineAppointments, ...offlineAppointments]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 4);

  return (
    <div className="p-4 sm:p-6 md:p-8 bg-gradient-to-br from-background to-secondary/10 min-h-screen font-sans">
      <motion.div
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-primary">Welcome back, Dr. {doctor.name}</h1>
            <p className="text-secondary-foreground mt-2">Here's what's happening with your appointments today.</p>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          <motion.div
            className="lg:col-span-2 space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden">
              <CardContent className="p-6 sm:p-8">
                <motion.div
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <div className="flex items-center mb-4 sm:mb-0">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <Avatar className="h-16 sm:h-20 w-16 sm:w-20 border-4 border-primary/10 mr-4 sm:mr-6">
                        <AvatarImage src={doctor.avatar} alt={doctor.name} />
                        <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                      </Avatar>
                    </motion.div>
                    <div>
                      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-1">Dr. {doctor.name}</h2>
                      <p className="text-secondary-foreground font-medium text-base sm:text-lg">{doctor.specialization}</p>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => {/* Handle edit functionality */}}
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </motion.div>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <InfoItem icon={FaUserMd} label="Specialization" value={doctor.specialization} />
                  <InfoItem icon={FaCalendarAlt} label="Practicing Since" value={new Date(doctor.practicingSince).getFullYear()} />
                  <InfoItem icon={FaLanguage} label="Languages" value={doctor.languages.join(', ')} />
                  <InfoItem icon={FaGraduationCap} label="Education" value={doctor.education} />
                  <InfoItem icon={FaClock} label="Available Time" value={`${doctor.availableStartTime} - ${doctor.availableEndTime}`} />
                  <InfoItem icon={FaDollarSign} label="Consulting Fees" value={`₹${doctor.consultingFees}`} />
                </motion.div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4 sm:mb-0">Recent Appointments</h2>
                  <Link to="/doctor/appointments">
                    <Button variant="outline" className="text-primary hover:bg-primary/10 hover:text-primary transition-colors duration-300">
                      View All <IoMdArrowForward className="ml-2" />
                    </Button>
                  </Link>
                </div>
                <div className="space-y-4">
                  {allAppointments.map((appointment, index) => (
                    <motion.div
                      key={appointment.id}
                      className="flex items-center p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={`https://i.pravatar.cc/48?img=${index + 1}`} alt="Patient" />
                        <AvatarFallback>{appointment.reason[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="font-medium text-primary">{appointment.reason}</div>
                        <div className="text-sm text-secondary-foreground">
                          {new Date(appointment.date).toLocaleString()}
                        </div>
                      </div>
                      <Badge variant={appointment.mode === 'ONLINE' ? 'default' : 'secondary'} className="ml-2">
                        {appointment.mode}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            className="space-y-6 sm:space-y-8"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4">Appointment Overview</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {pieData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                      <span className="text-sm text-secondary-foreground">{entry.name}: {entry.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-primary mb-4">Affiliated Hospitals</h2>
                {doctor.affiliatedHospitals.map((hospital, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <div className="flex items-center mb-2">
                      <MdLocalHospital className="text-primary mr-3" size={24} />
                      <h3 className="text-lg font-semibold text-primary">{hospital.name}</h3>
                    </div>
                    <p className="text-secondary-foreground mb-1">{hospital.address}</p>
                    <p className="text-secondary-foreground">
                      <span className="font-medium">Contact:</span> {hospital.contactNumber}
                    </p>
                    <p className="text-secondary-foreground">
                      <span className="font-medium">Email:</span> {hospital.email}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value }) => (
  <motion.div
    className="flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Icon className="text-primary flex-shrink-0" size={24} />
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
      <p className="text-base font-semibold text-foreground">{value}</p>
    </div>
  </motion.div>
);

export default DoctorDashboard;