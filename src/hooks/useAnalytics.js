import { useCallback } from 'react';
import { trackGAEvent } from '@/components/GoogleAnalytics';

export const useAnalytics = () => {
  
  const trackEvent = useCallback((category, action, label = null, value = null) => {
    trackGAEvent(category, action, label, value);
  }, []);

  const trackButtonClick = useCallback((buttonName, location) => {
    trackGAEvent('Button', 'Click', `${buttonName} - ${location}`);
  }, []);

  const trackFormSubmission = useCallback((formName, status = 'Success') => {
    trackGAEvent('Form', 'Submit', `${formName} - ${status}`);
  }, []);

  const trackCalculatorInteraction = useCallback((calculatorName, action) => {
    trackGAEvent('Calculator', 'Interaction', `${calculatorName} - ${action}`);
  }, []);

  return {
    trackEvent,
    trackButtonClick,
    trackFormSubmission,
    trackCalculatorInteraction
  };
};

export default useAnalytics;