import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { trackGAPageView } from '@/components/GoogleAnalytics';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  // Scroll to top on route change
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  // Track page view on route change
  useEffect(() => {
    trackGAPageView(pathname);
  }, [pathname]);

  return null;
};

export default ScrollToTop;