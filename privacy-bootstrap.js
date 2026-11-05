
    // Check for the newest service worker each time Spider Stats opens.
    if ('serviceWorker' in navigator && location.protocol !== 'file:') {
      window.addEventListener('load', async () => {
        try {
          const registration = await navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' });
          await registration.update();
        } catch (error) {
          console.warn('Spider Stats service worker update failed:', error);
        }
      });
    }
  
// Replace inline image handlers so inline scripts can remain blocked.
document.addEventListener('error', event => {
  if (event.target instanceof HTMLImageElement) event.target.classList.add('image-missing');
}, true);
