// import React, { useState, useCallback, useEffect, useRef } from 'react';
// import { Modal, Alert, Button, List, Typography, Badge, notification } from 'antd';
// import { AlertOutlined, CloseCircleOutlined, SoundOutlined, BellOutlined } from '@ant-design/icons';
// import Draggable from 'react-draggable';
// import useSound from 'use-sound';
// import alertSound from './alert.mp3';
// import { Ambulance } from 'lucide-react';

// const { Title } = Typography;

// const EmergencyNotificationSystem = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [selectedNotification, setSelectedNotification] = useState(null);
//   const [playAlert] = useSound(alertSound, { volume: 0.7});
//   const draggleRef = useRef(null);

//   const [socket, setSocket] = useState(null);
//   const [socketOpen, setSocketOpen] = useState(false);
//   const [error, setError] = useState(null);

//   const [location, setLocation] = useState({ latitude: null, longitude: null });

//   useEffect(() => {
//     // Simulated notifications (replace with actual WebSocket logic)
//     // const timer1 = setTimeout(() => {
//     //   handleNewNotification({
//     //     id: 1,
//     //     title: 'High Priority Alert',
//     //     message: 'Critical system failure detected!',
//     //   });
//     // }, 5000);

//     // const timer2 = setTimeout(() => {
//     //   handleNewNotification({
//     //     id: 2,
//     //     title: 'Weather Advisory',
//     //     message: 'Severe thunderstorm warning in your area.',
//     //   });
//     // }, 10000);

//     // return () => {
//     //   clearTimeout(timer1);
//     //   clearTimeout(timer2);
//     // };

//     const newSocket = new WebSocket(`ws://localhost:8080/dedicatedMessages?userId=66adfd3e-eba2-4a84-9a09-9b443084d2a5`);
//     setSocket(newSocket);

//     newSocket.onopen = () => {
//       console.log('WebSocket connection for doctor details opened');
//       setSocketOpen(true);
//     };

//     newSocket.onmessage = (event) => {
//       const message = JSON.parse(event.data);
//       console.log('Message from doctor details:', message);
//       handleNewNotification({
//               id: message.from,
//               title: 'Emergency Medical Alert',
//               message: message.data,
//             });
//       setError(null);
//     };

//     newSocket.onclose = (event) => {
//       console.log('WebSocket connection for doctor details closed:', event);
//       setSocketOpen(false);
//     };

//     newSocket.onerror = (error) => {
//       console.error('WebSocket error for doctor details:', error);
//       setError(error);
//     };

//     // return () => {
//     //   newSocket.close();
//     // };

//   }, []);

//   const extractCoordinates = (message) => {
//     const regex = /Latitude:\s*(-?\d+\.\d+),\s*Longitude:\s*(-?\d+\.\d+)/;
//     const match = message.match(regex);
//     if (match) {
//       return {
//         latitude: parseFloat(match[1]),
//         longitude: parseFloat(match[2])
//       };
//     } else {
//       return {
//         latitude: null,
//         longitude: null
//       };
//     }
//   };
  

//   const handleNewNotification = useCallback((newNotification) => {
//     setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
//     playAlert();
//     const { latitude, longitude } = extractCoordinates(newNotification.title);
//     setLocation({ latitude, longitude });
//     notification.open({
//       message: 'New Emergency Notification',
//       description: newNotification.title,
//       icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
//       duration: 4.5,
//     });
//   }, [playAlert]);

//   const handleNotificationClick = useCallback((notification) => {
//     setSelectedNotification(notification);
//   }, []);

//   const handleClose = useCallback(() => {
//     setSelectedNotification(null);
//   }, []);

//   const handleDismissNotification = useCallback((notificationId) => {
//     setNotifications((prevNotifications) =>
//       prevNotifications.filter((notification) => notification.id !== notificationId)
//     );
//     if (selectedNotification && selectedNotification.id === notificationId) {
//       setSelectedNotification(null);
//     }
//   }, [selectedNotification]);

//   return (
//     <>
//       {selectedNotification && (
//         <Draggable
//           handle=".modal-header"
//           bounds="parent"
//         >
//           <Modal
//             title={
//               <div className="modal-header">
//                 <AlertOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
//                 {selectedNotification.title}
//               </div>
//             }
//             open={true}
//             onCancel={handleClose}
//             footer={null}
//             modalRender={(modal) => <div ref={draggleRef}>{modal}</div>}
//           >
//             <Alert
//               message={selectedNotification.message}
//               type="error"
//               icon={<Ambulance />}
//               style={{ width: '100%', marginBottom: '10px' }}
//             />
//             <Button
//               onClick={() => handleDismissNotification(selectedNotification.id)}
//               danger
//               block
//               size="large"
//               style={{ marginTop: '20px' }}
//               icon={<CloseCircleOutlined />}
//             >
//               Dismiss
//             </Button>
//           </Modal>
//         </Draggable>
//       )}

//       <Badge count={notifications.length} offset={[-5, 5]} style={{display:"none"}}>
//         <Button
//           type="success"
//           shape="circle"
//           icon={<BellOutlined style={{display :"none"}} />}
//           size="large"
//           onClick={() => setSelectedNotification(notifications[0])}
//         />
//       </Badge>

//       <Modal
//         title={
//           <Title level={4} style={{ color: '#ff4d4f', margin: 0 }}>
//             <AlertOutlined /> Emergency Notifications
//           </Title>
//         }
//         visible={notifications.length > 0}
//         onCancel={() => setNotifications([])}
//         footer={null}
//         centered
//         width={600}
//         closeIcon={<CloseCircleOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />}
//         bodyStyle={{ maxHeight: '80vh', overflowY: 'auto' }}
//       >
//         <List
//           dataSource={notifications}
//           renderItem={(notification) => (
//             <List.Item key={notification.id}>
//               <Alert
//                 message={notification.title}
//                 description={notification.message}
//                 type="error"
//                 showIcon
//                 icon={<Ambulance />}
//                 action={
//                     <Button.Group>
//                     <Button
//                         onClick={() => handleNotificationClick(notification)}
//                         icon={<SoundOutlined />}
//                     >
//                         View
//                     </Button>
//                     <Button
//                         onClick={() => handleDismissNotification(notification.id)}
//                         danger
//                         icon={<CloseCircleOutlined />}
//                     >
//                     Dismiss
//                     </Button>
//                 </Button.Group>
//             }
//             style={{ width: '100%', marginBottom: '10px' }}
//             />
//             </List.Item>
//           )}
//           style={{ maxHeight: '50vh', overflowY: 'auto' }}
//         />
//         {notifications.length > 0 && (
//           <Button
//             onClick={() => setNotifications([])}
//             danger
//             block
//             size="large"
//             style={{ marginTop: '20px' }}
//             icon={<CloseCircleOutlined />}
//           >
//             Close All Notifications
//           </Button>
//         )}
//       </Modal>
//     </>
//   );
// };

// export default EmergencyNotificationSystem;



import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Modal, Alert, Button, List, Typography, Badge, notification } from 'antd';
import { AlertOutlined, CloseCircleOutlined, SoundOutlined, BellOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import useSound from 'use-sound';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import alertSound from './alert.mp3';
import { Ambulance, MapPinned } from 'lucide-react';
import MapComponent from '@/Auth/MapComponent';

const { Title } = Typography;

const EmergencyNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [playAlert] = useSound(alertSound, { volume: 0.7 });
  const draggleRef = useRef(null);

  const [socket, setSocket] = useState(null);
  const [socketOpen, setSocketOpen] = useState(false);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const newSocket = new WebSocket(`ws://localhost:8080/dedicatedMessages?userId=2bf9c26f-4a32-43fa-9f64-29a225d78644`);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connection for doctor details opened');
      setSocketOpen(true);
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log('Message from doctor details:', message);
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
            {location.latitude && location.longitude && (
              <div style={{ height: '300px' }}>
                <MapComponent lat={location.latitude} lng={location.longitude} />
              </div>
            )}
            <Button
              onClick={handleNavigateToGoogleMaps}
              type="primary"
              block
              size="large"
              style={{ marginTop: '20px' }}
              icon={<MapPinned />}
            >
              Navigate with Google Maps
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
};

export default EmergencyNotificationSystem;
