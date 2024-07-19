import React, { useState } from 'react';
import { Card, Avatar, Typography, Divider, List, Tag, Tabs, Row, Col, Statistic, Timeline, Button, Space, Badge, Empty } from 'antd';
import { PhoneOutlined, MailOutlined, EnvironmentOutlined, CalendarOutlined, TeamOutlined, StarOutlined, ClockCircleOutlined, UserOutlined, MedicineBoxOutlined } from '@ant-design/icons';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { ScrollText } from 'lucide-react';
import { CardTitle, CardContent } from '@/components/ui/card';

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


const tempHospital = {
  "id": "66adfd3e-eba2-4a84-9a09-9b443084d2a5",
  "name": "BMS Hospital",
  "hospital_number": "HS6045314",
  "contactNumber": "8045088888",
  "email": "bms@email.com",
  "address": "No 618, Sri Mallikarjuna Swamy, Gangamma Temple St, NR Colony, Bengaluru, Karnataka 560019",
  "description": "MBBS, MS (General Surgery), M.Ch (Cardiothoracic Surgery), Fellowship in Heart & Lung transplant, Hannover Medical School, Fellowship in Minimally Invasive Cardiac Surgery, Lipzig Heart Centre, Germany",
  "speciality": "SUPER_SPECIALTY",
  "latitude": 12.9411334,
  "longitude": 77.5649215,
  "availableForConsult": false,
  "createdAt": "2024-06-22T11:56:44.462Z",
  "updatedAt": "2024-06-28T13:29:36.886Z",
  "registeredDoctors": [
      {
          "id": "002c94b1-8313-4528-a164-c4269ccca19c",
          "name": "Kavya Reddy",
          "email": "kavya.reddy@example.com",
          "contactNumber": "9812341234",
          "specialization": "ENDOCRINOLOGIST",
          "address": "JP Nagar, Bangalore",
          "rating": 0,
          "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png"
      },
      {
          "id": "0c8d9b9a-d1bb-47e4-9346-3be40e643445",
          "name": "Yagya",
          "email": "yagyabhatt@gmail.com",
          "contactNumber": "8185626810",
          "specialization": "CARDIOLOGIST",
          "address": "Jaksandra extension, KKormangala",
          "rating": 0,
          "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png"
      }
  ],
  "registeredPatients": []
}
const todayAppointment = []
const previousAppointments = []
const registeredDoctors = [
  {
      "id": "002c94b1-8313-4528-a164-c4269ccca19c",
      "name": "Kavya Reddy",
      "email": "kavya.reddy@example.com",
      "contactNumber": "9812341234",
      "specialization": "ENDOCRINOLOGIST",
      "address": "JP Nagar, Bangalore",
      "rating": 0,
      "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png"
  },
  {
      "id": "0c8d9b9a-d1bb-47e4-9346-3be40e643445",
      "name": "Yagya",
      "email": "yagyabhatt@gmail.com",
      "contactNumber": "8185626810",
      "specialization": "CARDIOLOGIST",
      "address": "Jaksandra extension, KKormangala",
      "rating": 0,
      "avatar": "https://res.cloudinary.com/dobgzdpic/image/upload/v1719312099/DoctorDefault_rbglsf.png"
  }
]
const patientsCount = 0
const emergencyAppointments = [{}]

const HospitalDashboard = () => {

  const [activeTab, setActiveTab] = useState('1');

  const [hospital, setHospital] = useState(tempHospital);

  const toggleAvailability = () => {
    setHospital(prevHospital => ({
      ...prevHospital,
      availableForConsult: !prevHospital.availableForConsult
    }));
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

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
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
          <AlertDialogTrigger>{hospital.availableForConsult ? "Available": "Unavailable"} </AlertDialogTrigger>
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
                      <Timeline.Item key={index} label={appointment.time}>
                        <Card size="small">
                          Appointment with Dr. {appointment.doctorName}
                          <br />
                          Patient: {appointment.patientName}
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
                      <Timeline.Item key={index} label={appointment.date}>
                        <Card size="small">
                          Appointment with Dr. {appointment.doctorName}
                          <br />
                          Patient: {appointment.patientName}
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
    </div>
  );
};

export default HospitalDashboard;