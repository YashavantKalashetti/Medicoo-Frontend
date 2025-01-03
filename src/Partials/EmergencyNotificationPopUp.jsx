import React, { useState, useCallback, useEffect, useRef, useContext, forwardRef, useImperativeHandle } from 'react';
import { Modal, Alert, Button, List, Typography, Badge, notification } from 'antd';
import { AlertOutlined, CloseCircleOutlined, SoundOutlined, BellOutlined, EnvironmentOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import useSound from 'use-sound';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import alertSound from './alert.mp3';
import { Ambulance, MapPin, SquareActivity } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { fetchWithInterceptors } from '@/Interceptors/FetchInterceptors';

const { Title } = Typography;

const EmergencyNotificationSystem = forwardRef((props, ref) => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [playAlert] = useSound(alertSound, { volume: 0.7 });
  const draggleRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);
  const [error, setError] = useState(null);
  const [closeWebSocket, setCloseWebSocket] = useState(() => () => {});

  useImperativeHandle(ref, () => ({
    callChildFunction: closeWebSocket,
  }));

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  const {user} = useContext(AuthContext)

  useEffect(() => {

    if(user && user.userId != null){
      const newSocket = new WebSocket(`ws://localhost:8080/dedicatedMessages?userId=${user.userId}`);
      setSocket(newSocket);

      // console.log("Changes")

      newSocket.onopen = () => {
        console.log('WebSocket connection for doctor details opened');
        setSocketOpen(true);
      };

      newSocket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        handleNewNotification({
          id: message.from,
          title: 'Emergency Medical Alert',
          message: message.data,
        });
        setError(null);
      };

      newSocket.onclose = (event) => {
        console.log('WebSocket connection for doctor details closed:', event);
        setSocketOpen(false);
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error for doctor details:', error);
        setError(error);
      };

      setCloseWebSocket(() => () => newSocket.close());
    }
  }, []);

  const extractCoordinates = (message) => {
    const regex = /Latitude:\s*(-?\d+\.\d+),\s*Longitude:\s*(-?\d+\.\d+)/;
    const match = message.match(regex);
    if (match) {
      return {
        latitude: parseFloat(match[1]),
        longitude: parseFloat(match[2]),
      };
    } else {
      return {
        latitude: null,
        longitude: null,
      };
    }
  };

  const handleNewNotification = useCallback(
    (newNotification) => {
      setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
      playAlert();
      notification.open({
        message: 'New Emergency Notification',
        description: newNotification.title,
        icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
        duration: 4.5,
      });
    },
    [playAlert]
  );

  const handleNotificationClick = useCallback((notification) => {
    const { latitude, longitude } = extractCoordinates(notification.message);
    setLocation({ latitude, longitude });
    setSelectedNotification(notification);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedNotification(null);
  }, []);

  const handleDismissNotification = useCallback(
    (notificationId) => {
      setNotifications((prevNotifications) => prevNotifications.filter((notification) => notification.id !== notificationId));
      if (selectedNotification && selectedNotification.id === notificationId) {
        setSelectedNotification(null);
      }
    },
    [selectedNotification]
  );

  const handleNavigateToGoogleMaps = () => {
    if (location.latitude && location.longitude) {
      const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
      window.open(googleMapsUrl, '_blank');
    }
  };

  function extractPatientId(message) {
    const patientIdRegex = /PatientId\s*:\s*(PT\d+)/;
    const match = message.match(patientIdRegex);
    return match ? match[1] : null;
  }

  const handleOvertakeAppointment = async () => {
    try {

      const patient_number = extractPatientId(selectedNotification.message)
      if(!patient_number){
        throw new Error("Patient Number is not present")
      }
      // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/hospital/patientEmergencyAppointment/${patient_number}`,{
      //   headers:{
      //     'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NmFkZmQzZS1lYmEyLTRhODQtOWEwOS05YjQ0MzA4NGQyYTUiLCJyb2xlIjoiSE9TUElUQUwiLCJlbWFpbCI6ImJtc0BlbWFpbC5jb20iLCJpYXQiOjE3MjE5MjczNzIsImV4cCI6MTcyMjM1OTM3Mn0.B4F2ENVluUsiTWMgJsbD5wwV95VJk0-U1bAY04yOi3k`
      //   }
      // })
      // if(!response.ok){
      //   throw new Error("Appointment already undertaken by other hospital")
      // }

      const data = await fetchWithInterceptors(`${import.meta.env.VITE_BACKEND_URL}/hospital/patientEmergencyAppointment/${patient_number}`, {
        method: 'GET',
      });

      notification.success({
        message: 'Appointment Request Considered',
        description: 'The appointment request has been successfully considered.',
        duration: 4.5,
      });
    } catch (error) {
      notification.error({
        message: 'Appointment Request Denied',
        description: `${error.message}`,
        duration: 4.5,
      })
    }
  };

  // Leaflet marker icon fix
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  });

  return (
    <>
      {selectedNotification && (
        <Draggable handle=".modal-header" bounds="parent">
          <Modal
            title={
              <div className="modal-header">
                <AlertOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                {selectedNotification.title}
              </div>
            }
            open={true}
            onCancel={handleClose}
            footer={null}
            modalRender={(modal) => <div ref={draggleRef}>{modal}</div>}
          >
            <Alert
              message={selectedNotification.message}
              type="error"
              icon={<Ambulance />}
              style={{ width: '100%', marginBottom: '10px' }}
            />
            <Button
              onClick={handleOvertakeAppointment}
              type="primary"
              block
              size="large"
              danger
              style={{ margin: '7px 0px 10px 0px' }}
            >
              <SquareActivity />
              Overtake Appointment
            </Button>
            {location.latitude && location.longitude && (
              <div style={{ height: '300px' }}>
                <MapContainer center={[location.latitude, location.longitude]} zoom={14} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[location.latitude, location.longitude]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
            <Button
              onClick={handleNavigateToGoogleMaps}
              type="primary"
              block
              size="large"
              style={{ marginTop: '20px' }}
              icon={<MapPin />}
            >
              View on Map
            </Button>
            <Button
              onClick={() => handleDismissNotification(selectedNotification.id)}
              danger
              block
              size="large"
              style={{ marginTop: '10px' }}
              icon={<CloseCircleOutlined />}
            >
              Dismiss
            </Button>
          </Modal>
        </Draggable>
      )}

      <Badge count={notifications.length} offset={[-5, 5]} style={{ display: 'none' }}>
        <Button
          type="success"
          shape="circle"
          icon={<BellOutlined style={{ display: 'none' }} />}
          size="large"
          onClick={() => setSelectedNotification(notifications[0])}
        />
      </Badge>

      <Modal
        title={
          <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
            <AlertOutlined /> Emergency Notifications
          </Title>
        }
        visible={notifications.length > 0}
        onCancel={() => setNotifications([])}
        footer={null}
        centered
        width={600}
        closeIcon={<CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />}
        bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
      >
        <List
          dataSource={notifications}
          renderItem={(notification) => (
            <List.Item key={notification.id}>
              <Alert
                message={notification.title}
                description={notification.message}
                type="error"
                showIcon
                icon={<Ambulance />}
                action={
                  <Button.Group>
                    <Button onClick={() => handleNotificationClick(notification)} icon={<SoundOutlined />}>
                      View
                    </Button>
                    <Button onClick={() => handleDismissNotification(notification.id)} danger icon={<CloseCircleOutlined />}>
                      Dismiss
                    </Button>
                  </Button.Group>
                }
                style={{ width: '100%', marginBottom: '10px' }}
              />
            </List.Item>
          )}
          style={{ maxHeight: '50vh', overflowY: 'auto' }}
        />
        {notifications.length > 0 && (
          <Button
            onClick={() => setNotifications([])}
            danger
            block
            size="large"
            style={{ marginTop: '20px' }}
            icon={<CloseCircleOutlined />}
          >
            Close All Notifications
          </Button>
        )}
      </Modal>
    </>
  );
});

export default EmergencyNotificationSystem;
