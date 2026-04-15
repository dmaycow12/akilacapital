import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import HomePage from '@/pages/HomePage';
import FloatingWhatsAppButton from '@/components/FloatingWhatsAppButton';
import { initializeGA } from '@/components/GoogleAnalytics';

function App() {
  useEffect(() => {
    initializeGA();
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <FloatingWhatsAppButton />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;