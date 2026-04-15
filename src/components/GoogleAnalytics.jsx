import ReactGA from 'react-ga4';

const GA_MEASUREMENT_ID = '524810928';

export const initializeGA = () => {
  try {
    // Initialize GA4
    ReactGA.initialize(GA_MEASUREMENT_ID);
    console.log('GA4 Initialized with ID:', GA_MEASUREMENT_ID);
  } catch (error) {
    console.error('GA4 Initialization Error:', error);
  }
};

export const trackGAEvent = (category, action, label, value) => {
  try {
    ReactGA.event({
      category,
      action,
      label,
      value, // Optional numeric value
    });
  } catch (error) {
    console.error('GA4 Event Error:', error);
  }
};

export const trackGAPageView = (path) => {
  try {
    ReactGA.send({ hitType: "pageview", page: path });
  } catch (error) {
    console.error('GA4 PageView Error:', error);
  }
};

// Default export as a component if needed, though strictly we use the exports above
const GoogleAnalytics = () => {
  return null;
};

export default GoogleAnalytics;