import React, { useContext, useEffect, useState } from 'react';
import { Card, Avatar, Typography, Divider, List, Tag, Tabs, Row, Col, Statistic, Timeline, Button, Space, Badge, Empty, message } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, CalendarOutlined, TeamOutlined, StarOutlined, ClockCircleOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ScrollText } from 'lucide-react';
import { CardTitle, CardContent } from '@/components/ui/card';

import {Tooltip,TooltipContent,TooltipProvider,TooltipTrigger} from "@/components/ui/tooltip"

const { Title, Text } = Typography;
const { TabPane } = Tabs;
import {
  AlertDialog,
  AlertDialogAction,  
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Link } from 'react-router-dom';
import { set } from 'react-hook-form';
import CustomLoader from '@/Partials/CustomLoader';
import { AuthContext } from '@/context/AuthContext';
import AssignDoctorLogo from './AssignDoctor';
import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';


const HospitalDashboard = () => {

  const [activeTab, setActiveTab] = useState('1');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hospital, setHospital] = useState();
  const [registeredDoctors, setRegisteredDoctors] = useState([]);
  const [todayAppointment, setTodayAppointment] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [patientsCount, setPatientsCount] = useState(0);
  const [emergencyAppointments, setEmergencyAppointments] = useState([]);

  const {user} = useContext(AuthContext)

  useEffect(() => {
    fetchHospital();
  }, []);
  

  const fetchHospital = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hospital`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.access_token}`
        },
      });
      const data = await response.json();
      if(response.status >= 400) {
        setError(data?.message || 'Something went wrong');
        return;
      }
      // console.log("previous Days",data.previousAppointments)
      // console.log("Todays appointments", data.todayAppointment)
      setHospital(data.hospital);
      setRegisteredDoctors(data.registeredDoctors);
      setTodayAppointment(data.todayAppointment);
      setPreviousAppointments(data.previousAppointments);
      setPatientsCount(data.patientsCount);
      setEmergencyAppointments(data.emergencyAppointments);
    } catch (error) {
      setError('Unable to fetch hospital data');
    }finally{
      setLoading(false);
    }
  
  };

  const toggleAvailability = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hospital/setAvailability?availability=${!hospital.availableForConsult}`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user?.access_token}`
        },
      })
  
      if(response.status >= 400) {
        const data = await response.json();
        setError(data?.message || 'Something went wrong');
        return;
      }
  
      setHospital(prevHospital => ({
        ...prevHospital,
        availableForConsult: !prevHospital.availableForConsult
      }));
    } catch (error) {
      setError('Unable to update availability');
    }
  };


  const handleAssign = async (doctorId, appointment) => {
    // Make your API call here to assign the doctor
    try {
      const data = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/hospital/appointDoctorForEmergency`, {
        method: 'POST',
        body: JSON.stringify({
          doctorId,
          appointment
        })
      });

      message.success(data.msg || 'Doctor assigned successfully');
    } catch (error) {
      message.error( error?.message || 'Failed to assign doctor');
    }

  };

  const StatCard = ({ title, value, icon, color }) => (
    <Card hoverable style={{ height: '100%' }}>
      <Statistic
        title={<span style={{ fontSize: '16px', color: color }}>{title}</span>}
        value={value}
        valueStyle={{ color: color, fontSize: '24px' }}
        prefix={React.cloneElement(icon, { style: { fontSize: '24px', color: color } })}
      />
    </Card>
  );

  if(loading) {
    return <div className='flex justify-center items-center h-screen'><CustomLoader /></div>
  }

  if(error) {
    return <div className='flex justify-center items-center h-screen text-red-500'>Error: {error}</div>
  }

  return (
    <div style={{ padding: '20px', marginTop:"20px", backgroundColor: '#f0f2f5' }}>
      {
        hospital && 
        <Row gutter={[16, 16]}>
        <Col span={24}>
          <div className="relative h-64 md:h-96">
          <img 
            src={`https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg?auto=compress&cs=tinysrgb&w=600`} 
            alt={hospital.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{hospital.name}</h1>
            <p className="text-sm md:text-base opacity-80">Hospital ID: {hospital.hospital_number}</p>
          </div>

          <Badge className="absolute top-4 right-4 text-sm md:text-base">
      <Tag color={hospital.availableForConsult ? "green" : "red"} icon={<ClockCircleOutlined />}>
        <AlertDialog>
          <TooltipProvider>
            <Tooltip>
            <TooltipTrigger><AlertDialogTrigger>{hospital.availableForConsult ? "Available": "Unavailable"} </AlertDialogTrigger></TooltipTrigger>
            <TooltipContent>
            <p>Change Hopital Availability</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Confirm Availability Change</AlertDialogTitle>
              
              <AlertDialogDescription>
                Are you sure you want to change the availability status to {hospital.availableForConsult ? 'Unavailable' : 'Available'}?
              </AlertDialogDescription>
              
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={toggleAvailability}>Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Tag>
    </Badge>
          
        </div>
        </Col>
        <Col xs={24} lg={6}>
          <Link to="/hospital/emergency-appointments" ><StatCard title="Emergency" value={emergencyAppointments.length} icon={<MedicineBoxOutlined />} color="#f5222d" /></Link>
        </Col>
        <Col xs={24} lg={6}>
          <StatCard title="Today's Appointments" value={todayAppointment.length} icon={<CalendarOutlined />} color="#faad14" />
        </Col>

        <Col xs={24} lg={6}>
          <Link to="/hospital/doctors" ><StatCard title="Doctors" value={registeredDoctors.length} icon={<TeamOutlined />} color="#1890ff" /></Link>
        </Col>
        <Col xs={24} lg={6}>
        <Link to="/hospital/doctors" ><StatCard title="Patients" value={patientsCount} icon={<UserOutlined />} color="#52c41a" /> </Link>
        </Col>

        <Col xs={24} lg={16}>
          <Card 
            title={<Title level={3}>Hospital Information</Title>} 
            extra={<Text type="secondary">Last updated: {new Date(hospital.updatedAt).toLocaleDateString()}</Text>}
            style={{ borderRadius: '8px', overflow: 'hidden', height: '100%' }}  // Adjusted height style
          >
            <Row gutter={[16, 16]}>

              <Col span={24}>
                <CardTitle className="text-lg flex items-center">
                  <ScrollText className='mr-2 h-6 w-7' />About
                </CardTitle>
                {/* <CardContent> */}
                  <p className="text-sm">{hospital.description}</p>
                {/* </CardContent> */}
              </Col>

              <Col span={12}>
                <Statistic 
                  title={<Text strong>Contact</Text>} 
                  value={hospital.contactNumber} 
                  prefix={<PhoneOutlined />} 
                  valueStyle={{ fontSize: '1.2em' }}
                />
              </Col>
              
              <Col span={12}>
                <Statistic 
                  title={<Text strong>Email</Text>} 
                  value={hospital.email} 
                  prefix={<MailOutlined />} 
                  valueStyle={{ fontSize: '1.2em' }}
                />
              </Col>
              <Col span={24}>
                <Statistic 
                  title={<Text strong>Address</Text>} 
                  value={hospital.address} 
                  prefix={<EnvironmentOutlined />} 
                  valueStyle={{ fontSize: '1.2em' }}
                />
              </Col>
              <Col span={12}>
                <Statistic 
                  title={<Text strong>Speciality</Text>} 
                  value={hospital.speciality} 
                  prefix={<MedicineBoxOutlined />} 
                  valueStyle={{ fontSize: '1.2em' }}
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="Location" style={{ height: '100%' }}>
            <div style={{ height: '300px' }}>
              {/* Your map or location content */}
            </div>
          </Card>
        </Col>

        <Col span={24}>
          <Card>
            <Tabs activeKey={activeTab} onChange={setActiveTab}>
              <TabPane tab="Registered Doctors" key="1">
                <List
                  grid={{ gutter: 16, xs: 1, sm: 2, md: 3, lg: 3, xl: 4, xxl: 4 }}
                  dataSource={registeredDoctors}
                  renderItem={doctor => (
                    <List.Item>
                      <Card hoverable>
                        <Card.Meta
                          avatar={<Avatar src={doctor.avatar} size={64} />}
                          title={<a href={`/doctor/${doctor.id}`}>{doctor.name}</a>}
                          description={
                            <>
                              <Tag color="blue">{doctor.specialization}</Tag>
                              <div>{doctor.email}</div>
                              <div>{doctor.contactNumber}</div>
                              <div>{doctor.address}</div>
                              <div>
                                <StarOutlined style={{ color: '#fadb14' }} /> {doctor.rating}
                              </div>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </TabPane>
              <TabPane tab="Today's Appointments" key="2">
                {todayAppointment.length > 0 ? (
                  <Timeline mode="left">
                    {todayAppointment.map((appointment, index) => (
                      <Timeline.Item key={index} label={appointment?.time}>
                        <Card size="small">
                          {
                            appointment?.doctor?.name ?
                              `Appointment with Dr. ${appointment?.doctor?.name} - ${appointment?.doctor?.contactNumber}` :
                              <div className='dflex-jac'>
                                <AssignDoctorLogo doctors={hospital?.registeredDoctors} appointment={appointment} onAssign={handleAssign} />
                                <p className='text-red-500' >Emergency Appointment Doctor not assigned</p>
                               </div>
                          }
                          <br />
                          <p>Patient: {appointment?.patient?.name}</p>
                          <p>Contact: {appointment?.patient?.contactNumber}</p>
                        </Card>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                ) : (
                  <Empty description="No appointments for today" />
                )}
              </TabPane>
              <TabPane tab="Previous Appointments" key="3">
                {previousAppointments.length > 0 ? (
                  <Timeline mode="left">
                    {previousAppointments.map((appointment, index) => (
                      <Timeline.Item key={index} label={appointment?.time}>
                        <Card size="small">
                          {
                            appointment?.doctor?.name ?
                            `Appointment with Dr. ${appointment?.doctor?.name} - ${appointment?.doctor?.contactNumber}` : 
                            <p className='text-red-500' >Emergency Appointment Doctor not assigned</p>
                          }
                          <br />
                          <p>Patient: {appointment?.patient?.name}</p>
                          <p>Contact: {appointment?.patient?.contactNumber}</p>
                        </Card>
                      </Timeline.Item>
                    ))}
                  </Timeline>
                ) : (
                  <Empty description="No previous appointments" />
                )}
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      }
    </div>
  );
};

export default HospitalDashboard;