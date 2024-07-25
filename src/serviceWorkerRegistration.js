export function register() {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        }, error => {
          console.error('ServiceWorker registration failed: ', error);
        });
      });
    } else {
      console.warn('Push messaging is not supported');
    }
  }
  