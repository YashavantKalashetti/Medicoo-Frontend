self.addEventListener('push', function(event) {
    const title = 'Scheduled Notification';
    const options = {
      body: 'This notification was scheduled 5 seconds ago.',
      icon: '/path/to/icon.png',
      badge: '/path/to/badge.png'
    };
    event.waitUntil(self.registration.showNotification(title, options));
  });
  
  self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SCHEDULE_NOTIFICATION') {
      const { delay } = event.data;
      setTimeout(() => {
        self.registration.showNotification('Scheduled Notification', {
          body: 'This notification was scheduled 5 seconds ago.',
          icon: '/path/to/icon.png',
          badge: '/path/to/badge.png'
        });
      }, delay);
    }
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(
      clients.matchAll({type: 'window'}).then(windowClients => {
        for (var i = 0; i < windowClients.length; i++) {
          var client = windowClients[i];
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/');
        }
      })
    );
  });