import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Modal, Alert, Button, List, Typography, Badge, notification } from 'antd';
import { AlertOutlined, CloseCircleOutlined, SoundOutlined, BellOutlined } from '@ant-design/icons';
import Draggable from 'react-draggable';
import useSound from 'use-sound';
import alertSound from './alert.mp3';
import { Ambulance } from 'lucide-react';

const { Title } = Typography;

const EmergencyNotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [playAlert] = useSound(alertSound, { volume: 0.7});
  const draggleRef = useRef(null);

  useEffect(() => {
    // Simulated notifications (replace with actual WebSocket logic)
    // const timer1 = setTimeout(() => {
    //   handleNewNotification({
    //     id: 1,
    //     title: 'High Priority Alert',
    //     message: 'Critical system failure detected!',
    //   });
    // }, 5000);

    // const timer2 = setTimeout(() => {
    //   handleNewNotification({
    //     id: 2,
    //     title: 'Weather Advisory',
    //     message: 'Severe thunderstorm warning in your area.',
    //   });
    // }, 10000);

    // return () => {
    //   clearTimeout(timer1);
    //   clearTimeout(timer2);
    // };
  }, []);

  const handleNewNotification = useCallback((newNotification) => {
    setNotifications((prevNotifications) => [...prevNotifications, newNotification]);
    playAlert();
    notification.open({
      message: 'New Emergency Notification',
      description: newNotification.title,
      icon: <AlertOutlined style={{ color: '#ff4d4f' }} />,
      duration: 4.5,
    });
  }, [playAlert]);

  const handleNotificationClick = useCallback((notification) => {
    setSelectedNotification(notification);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedNotification(null);
  }, []);

  const handleDismissNotification = useCallback((notificationId) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== notificationId)
    );
    if (selectedNotification && selectedNotification.id === notificationId) {
      setSelectedNotification(null);
    }
  }, [selectedNotification]);

  return (
    <>
      {selectedNotification && (
        <Draggable
          handle=".modal-header"
          bounds="parent"
        >
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
              onClick={() => handleDismissNotification(selectedNotification.id)}
              danger
              block
              size="large"
              style={{ marginTop: '20px' }}
              icon={<CloseCircleOutlined />}
            >
              Dismiss
            </Button>
          </Modal>
        </Draggable>
      )}

      <Badge count={notifications.length} offset={[-5, 5]} style={{display:"none"}}>
        <Button
          type="success"
          shape="circle"
          icon={<BellOutlined style={{display :"none"}} />}
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
                    <Button
                        onClick={() => handleNotificationClick(notification)}
                        icon={<SoundOutlined />}
                    >
                        View
                    </Button>
                    <Button
                        onClick={() => handleDismissNotification(notification.id)}
                        danger
                        icon={<CloseCircleOutlined />}
                    >
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
