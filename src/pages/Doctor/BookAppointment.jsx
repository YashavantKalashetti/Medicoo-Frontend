import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { format, parseISO } from 'date-fns';
import { MapPin, MessageSquare, Phone, Star, Clock, DollarSign, Award, Book, X, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

const DoctorAppointmentPage = () => {
  const {id }= useParams();
  const [doctorData, setDoctorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentType, setAppointmentType] = useState('online');
  const [socket, setSocket] = useState(null);
  const [showBookingConfirmation, setShowBookingConfirmation] = useState(false);

  const AppointmentTypeDropdown = ({ value, onChange }) => {
    return (
      <div className="mb-8 space-y-3">
        <Label htmlFor="appointment-type" className="text-lg font-semibold text-gray-800">
          Appointment Type
        </Label>
        <Select value={value} onValueChange={onChange}>
          <SelectTrigger
            id="appointment-type"
            className="w-full bg-white border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition duration-150 ease-in-out shadow-sm hover:border-gray-400"
          >
            <SelectValue placeholder="Select appointment type" />
          </SelectTrigger>
          <SelectContent className="bg-white rounded-md shadow-lg border border-gray-200">
            <SelectItem value="online" className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out">Online Consultation</SelectItem>
            <SelectItem value="offline" className="py-2 px-4 hover:bg-blue-50 cursor-pointer transition duration-150 ease-in-out">In-Person Visit</SelectItem>
          </SelectContent>
        </Select>
      </div>
    );
  };

  const doctorId = '1260d06d-daed-415b-b1d0-01760c96bc0a';
  const userId = '1260d06d-daed-415b-b1d0-01760c96bc0a';


  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3030/api/v1/search/doctors/${id}`);
        setDoctorData(response.data);
        if (response.data.availableSlotsByDate.length > 0) {
          setSelectedDate(response.data.availableSlotsByDate[0].date);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [id]);

  useEffect(() => {
    if (!doctorData) return;

    const newSocket = new WebSocket(`http://localhost:3030/details?userId=${userId}&type=doctor&id=${doctorId}`);
    setSocket(newSocket);

    newSocket.onopen = () => console.log('WebSocket connection for time slots opened');
    newSocket.onmessage = (event) => {
      const { type, details } = JSON.parse(event.data);
      if (type === 'timeSlots') {
        setDoctorData(prevData => ({
          ...prevData,
          availableSlotsByDate: details.availableSlotsByDate
        }));
      }
    };
    newSocket.onclose = (event) => console.log('WebSocket connection for time slots closed:', event);
    newSocket.onerror = (error) => console.error('WebSocket error for time slots:', error);

    return () => newSocket.close();
  }, [doctorData]);

  const handleBookAppointment = useCallback(() => {
    setShowBookingConfirmation(true);
  }, []);

  const handleConfirmBooking = (reason, acknowledged) => {
    console.log('Booking confirmed', {
      doctorId: id,
      date: selectedDate,
      time: selectedTime,
      reason: reason,
      appointmentType: appointmentType,
    });
    setShowBookingConfirmation(false);
  };

  const renderDateButtons = useCallback(() => {
    return doctorData.availableSlotsByDate.map((slot) => (
      <motion.button
        key={slot.date}
        onClick={() => setSelectedDate(slot.date)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2 rounded-full ${selectedDate === slot.date
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 text-gray-800 hover:bg-blue-100'
          } transition-all duration-300`}
      >
        {format(parseISO(slot.date), 'EEE, MMM d')}
      </motion.button>
    ));
  }, [doctorData, selectedDate]);

  const renderTimeSlots = useCallback(() => {
    const selectedSlots = doctorData.availableSlotsByDate.find(slot => slot.date === selectedDate)?.availableSlots || [];
    return (
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {selectedSlots.map((slot) => (
          <motion.button
            key={slot.time}
            onClick={() => setSelectedTime(slot.time)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-2 rounded-lg text-center transition-all duration-300 ${selectedTime === slot.time
              ? 'bg-blue-500 text-white shadow-md'
              : slot.isBooked
                ? 'bg-red-100 text-red-500'
                : 'bg-gray-100 hover:bg-blue-100'
              } ${slot.isBooked ? 'cursor-not-allowed' : ''}`}
            disabled={slot.isBooked}
          >
            {format(parseISO(`2000-01-01T${slot.time}`), 'h:mm a')}
          </motion.button>
        ))}
      </div>
    );
  }, [doctorData, selectedDate, selectedTime]);

  const BookingConfirmationModal = ({ onConfirm, onClose }) => {
    const [reason, setReason] = useState('');
    const [acknowledged, setAcknowledged] = useState(false);
    const [appointmentType, setAppointmentType] = useState('');

    const handleConfirm = () => {
      onConfirm(reason, acknowledged);
    };

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          className="bg-white rounded-lg p-8 max-w-md w-full m-4"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Confirm Appointment</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-gray-600 mb-2">Date: {format(parseISO(selectedDate), 'MMMM d, yyyy')}</p>
            <p className="text-gray-600 mb-4">Time: {format(parseISO(`2000-01-01T${selectedTime}`), 'h:mm a')}</p>
            <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Visit
            </label>
            <textarea
              id="reason"
              rows="3"
              className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Please briefly describe the reason for your visit"
            ></textarea>
          </div>
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-blue-600"
                checked={acknowledged}
                onChange={(e) => setAcknowledged(e.target.checked)}
              />
              <span className="ml-2 text-gray-700">I acknowledge that I have provided accurate information and consent to this appointment.</span>
            </label>
          </div>
          <button
            onClick={handleConfirm}
            disabled={!acknowledged || reason.trim() === ''}
            className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${(!acknowledged || reason.trim() === '') ? 'opacity-50 cursor-not-allowed' : ''
              }`}
          >
            Confirm Booking
          </button>
        </motion.div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="w-16 h-16 border-t-4 border-blue-500 rounded-full"
        />
      </div>
    );
  }

  if (!doctorData) {
    return <div className="flex items-center justify-center h-screen">Doctor not found</div>;
  }

  const { doctor } = doctorData;

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />

      <div className="flex h-screen font-['Poppins',sans-serif] mt-20 mb-20">
       

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1 p-8 overflow-hidden"
        >
          <div className="max-w-6xl mx-auto bg-slate-100 rounded-3xl shadow-lg overflow-hidden shadow-custom ">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="flex flex-col md:flex-row"
            >
              {/* Left section */}
              <div className="w-full md:w-2/3 p-8">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Make an Appointment</h1>

                {/* Appointment Type Dropdown */}
                <AppointmentTypeDropdown />

                {/* Date selection */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4 text-gray-700">Choose date</h2>
                  <div className="flex flex-wrap gap-2">
                    {renderDateButtons()}
                  </div>
                </div>

                {/* Time selection */}
                {selectedDate && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 text-gray-700">Choose time</h2>
                    {renderTimeSlots()}
                  </div>
                )}

                {/* Booking button */}
                <div className="mt-8 flex justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full md:w-1/2 bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300"
                    disabled={!selectedDate || !selectedTime}
                    onClick={handleBookAppointment}
                  >
                    Book Appointment
                  </motion.button>
                </div>
              </div>

              {/* Right section - Doctor details */}
              <div className="w-full md:w-1/3 bg-gray-50 p-8">
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                  className="flex flex-col items-center mb-6"
                >
                  <img src={doctor.avatar} alt={doctor.name} className="w-24 h-24 rounded-full mb-4 border-4 border-white shadow-lg object-cover" />
                  <h2 className="text-xl font-bold text-gray-800">{doctor.name}</h2>
                  <p className="text-gray-600 mb-2">{doctor.specialization}</p>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, index) => (
                      <Star key={index} className={`w-4 h-4 ${index < Math.round(doctor.rating) ? 'text-yellow-400' : 'text-gray-300'} mr-1`} fill="currentColor" />
                    ))}
                  </div>
                </motion.div>

                {/* Message and Call buttons */}
                <div className="flex justify-between mb-6">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-1/2 py-2 bg-blue-100 rounded-lg mr-2 hover:bg-blue-200 transition-all duration-300"
                  >
                    <MessageSquare className="w-4 h-4 text-blue-500 mr-2" />
                    <span className="text-blue-500 font-semibold text-sm">Message</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center justify-center w-1/2 py-2 bg-green-100 rounded-lg ml-2 hover:bg-green-200 transition-all duration-300"
                  >
                    <Phone className="w-4 h-4 text-green-500 mr-2" />
                    <span className="text-green-500 font-semibold text-sm">Call</span>
                  </motion.button>
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Award className="w-4 h-4 mr-2 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Experience</h3>
                      <p className="text-sm text-gray-600">{doctor.practicingSince ? `${new Date().getFullYear() - new Date(doctor.practicingSince).getFullYear()} years` : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Working Hours</h3>
                      <p className="text-sm text-gray-600">{`${doctor.availableStartTime} - ${doctor.availableEndTime}`}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-2 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Consultation Fee</h3>
                      <p className="text-sm text-gray-600">{doctor.consultingFees ? `${doctor.consultingFees}` : 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Book className="w-4 h-4 mr-2 text-indigo-500" />
                    <div>
                      <h3 className="font-semibold">Education</h3>
                      <p className="text-sm text-gray-600">{doctor.education || 'N/A'}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-2 text-red-500" />
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-sm text-gray-600 break-words">
                        {doctor.affiliatedHospitals.length > 0 ? doctor.affiliatedHospitals[0] : 'No affiliated hospital'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      {showBookingConfirmation && <BookingConfirmationModal onConfirm={handleConfirmBooking} onClose={() => setShowBookingConfirmation(false)} />}
    </>
  );
};

export default DoctorAppointmentPage;
