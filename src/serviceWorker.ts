// register service worker 
export default function registerServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      const serviceWorkerURL: any = process.env.REACT_APP_SERVICE_WORKER;
			navigator.serviceWorker.register(serviceWorkerURL).then(function(registration) {
				console.log('ServiceWorker registration successful with scope: ',
					registration.scope);
			}, function(err) {
        console.log('ServiceWorker registration failed: ', err);
      });
    });
  }
}
