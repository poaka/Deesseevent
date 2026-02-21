// Google Analytics 4 Setup
// Add your GA4 Measurement ID in the environment variable VITE_GA_ID

export const GA_ID = import.meta.env.VITE_GA_ID || '';

export const initGA = () => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  // Load GA4 script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);
  
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', GA_ID, {
    page_title: document.title,
    page_location: window.location.href,
    send_page_view: true
  });
};

export const trackPageView = (path) => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  if (window.gtag) {
    window.gtag('config', GA_ID, {
      page_path: path,
      page_location: window.location.href,
      page_title: document.title
    });
  }
};

export const trackEvent = (eventName, eventParams = {}) => {
  if (!GA_ID || typeof window === 'undefined') return;
  
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

export default {
  initGA,
  trackPageView,
  trackEvent
};
