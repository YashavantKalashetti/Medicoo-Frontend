import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, Siren, X } from 'lucide-react';
import { Popover } from 'antd';

const style= {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const NotificationComponent = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, senderId: 'User1', message: 'Default notification 1', read: false },
    { id: 2, senderId: 'User2', message: 'Default notification 2', read: false },
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const ws = useRef(null);

  

  useEffect(() => {
    // Connect to WebSocket
    // ws.current = new WebSocket('wss://localhost:3030/notify');

    // ws.current.onmessage = (event) => {
    //   const newNotification = JSON.parse(event.data);
    //   setNotifications(prev => [...prev, { ...newNotification, read: false }]);
    // };

    // return () => {
    //   if (ws.current) ws.current.close();
    // };
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationClick = (notification) => {
    setSelectedNotification(notification);
    markAsRead(notification.id);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const closePopup = () => {
    setSelectedNotification(null);
  };

  return (
    <div className="relative z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-blue-500 text-white rounded-full fixed"
          style={{ top: '1.5vh', right: '3.1vw', zIndex: isOpen ? '100' : '10' }}
        >
          <Bell size={23} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
              {unreadCount}
            </span>
          )}
        </button>

      {isOpen && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-4 overflow-y-auto" style={{ width: '450px', zIndex: '101' }}>
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 p-2 rounded-full"
          >
            <X size={35} />
          </button>
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          {notifications.map(notification => (
            <div
              key={notification.id}
              onClick={() => handleNotificationClick(notification)}
              className={`p-2 mb-2 rounded cursor-pointer ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}
            >
              <p className="font-semibold">{notification.senderId}</p>
              <p className="truncate">{notification.message}</p>
            </div>
          ))}
        </div>
      )}

      {selectedNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">{selectedNotification.senderId}</h3>
            <p className="mb-4">{selectedNotification.message}</p>
            <button
              onClick={closePopup}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const EmergencyButton = () => {
  return (
    <Link to="/emergency" className="flex items-center justify-center bg-red-500 text-white rounded-full z-10" style={{width: '40px', height: '40px', margin:"2px"}}>
        <div style={style}>
        <Popover content="Click here in case of Emergency">
          <Siren size={24}/>
        </Popover>
      </div>
    </Link>
  );
};

export default EmergencyButton;

// const EmergencyNotificationButton = () => {
//   return (
//     <>
//         <div style={{display:"flex", flexDirection:"column"}}>
//           <EmergencyButton />
//           <NotificationComponent />
//         </div>
//     </>
//   );
// };

// export default EmergencyNotificationButton;
