// NotificationComponent.jsx
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const NotificationComponent = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/service-worker.js')
        .then(async (registration) => {
          console.log('Service Worker registered');
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        });
    }
  }, []);

  const subscribeUser = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: 'BLJrnDFVUXWsci7tVgfKDV\_\_2ZzIUJ\_\_7OhEBaJiqGtPVkyLDX23M\_\_i8kxVzRqMxK4YYUdNZoLzv5sJUY9wRX4'
        });
        console.log('User is subscribed:', subscription);
        setIsSubscribed(true);
        // Here you would typically send the subscription to your server
      } catch (error) {
        console.error('Failed to subscribe the user: ', error);
      }
    }
  };

  const scheduleNotification = () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.ready.then(registration => {
        registration.active.postMessage({
          type: 'SCHEDULE_NOTIFICATION',
          delay: 5000 // 5 seconds delay
        });
      });
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Background Notification System</h1>
      {!isSubscribed && (
        <Button onClick={subscribeUser} className="mb-4">
          Subscribe to Notifications
        </Button>
      )}
      <Button onClick={scheduleNotification}>
        Schedule Notification (5s)
      </Button>
    </div>
  );
};

export default NotificationComponent;
