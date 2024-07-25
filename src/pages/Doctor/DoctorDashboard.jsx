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
    registeredHospitals: [
      {
        name: "BMS Hospital",
        address: "No 618, Sri Mallikarjuna Swamy, Gangamma Temple St, NR Colony, Bengaluru, Karnataka 560019",
        contactNumber: "8045088888",
        email: "bms@email.com"
      }
    ]
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
    <>
      {/* Add Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div className="p-8 bg-gradient-to-br mt-8 min-h-screen font-poppins mb-20">
        <motion.div
          className="max-w-7xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="flex justify-between items-center mb-12">
            <div>
              <h1 className="text-4xl font-bold text-indigo-900">Welcome back, Dr. {doctor.name}</h1>
              <p className="text-indigo-600 mt-2">Here's what's happening with your appointments today.</p>
            </div>
            {/* <Avatar className="h-16 w-16 ring-4 ring-white shadow-lg">
              <AvatarImage src={doctor.avatar} />
              <AvatarFallback>{doctor.name[0]}</AvatarFallback>
            </Avatar> */}
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              className="lg:col-span-2 space-y-8"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-white shadow-lg rounded-xl overflow-hidden font-roboto">
                <CardContent className="p-8">
                  <motion.div
                    className="flex justify-between items-start mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <Avatar className="h-20 w-20 border-4 border-indigo-100 mr-6">
                          <AvatarImage src={"pexels-shkrabaanthony-5215024.jpg"||doctor.avatar} />
                          <AvatarFallback>{doctor.name[0]}</AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-1">Dr. {doctor.name}</h2>
                        <p className="text-indigo-600 font-medium text-lg">{doctor.specialization}</p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
                        onClick={() => {/* Handle edit functionality */ }}
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </Button>
                    </motion.div>
                  </motion.div>
                  <motion.div
                    className="grid grid-cols-2 md:grid-cols-3 gap-6"
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

              <Card className="overflow-hidden bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-semibold text-indigo-900">Recent Appointments</h2>
                    <Button variant="outline" className="text-indigo-600 hover:bg-indigo-100 hover:text-indigo-800 transition-colors duration-300">
                      View All <IoMdArrowForward className="ml-2" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {allAppointments.map((appointment, index) => (
                      <motion.div
                        key={appointment.id}
                        className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors duration-300"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Avatar className="h-12 w-12 mr-4">
                          <AvatarImage src={`https://i.pravatar.cc/48?img=${index + 1}`} />
                          <AvatarFallback>{appointment.reason[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="font-medium text-indigo-900">{appointment.reason}</div>
                          <div className="text-sm text-indigo-600">
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
              className="space-y-8"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="overflow-hidden bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Appointment Overview</h2>
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
                        <span className="text-sm text-indigo-700">{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              <Card className="overflow-hidden bg-white shadow-lg rounded-2xl hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <h2 className="text-2xl font-semibold text-indigo-900 mb-4">Affiliated Hospital</h2>
                  <div className="flex items-center mb-4">
                    <MdLocalHospital className="text-indigo-500 mr-3" size={28} />
                    <h3 className="text-xl font-semibold text-indigo-800">{doctor.affiliatedHospitals[0].name}</h3>
                  </div>
                  <p className="text-indigo-700 mb-2">{doctor.affiliatedHospitals[0].address}</p>
                  <p className="text-indigo-700">
                    <span className="font-medium">Contact:</span> {doctor.affiliatedHospitals[0].contactNumber}
                  </p>
                  <p className="text-indigo-700">
                    <span className="font-medium">Email:</span> {doctor.affiliatedHospitals[0].email}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  );
};



const InfoItem = ({ icon: Icon, label, value }) => (
  <motion.div
    className="flex items-center space-x-4"
    whileHover={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <Icon className="text-indigo-500 flex-shrink-0" size={24} />
    <div>
      <p className="text-sm font-medium text-gray-500 mb-1">{label}</p>
      <p className="text-base font-semibold text-gray-700">{value}</p>
    </div>
  </motion.div>
);

export default DoctorDashboard;