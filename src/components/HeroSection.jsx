import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useAnalytics } from '@/hooks/useAnalytics';

const HeroSection = () => {
  const { trackButtonClick } = useAnalytics();

  const scrollToSimulator = () => {
    trackButtonClick('Começar Agora', 'Hero Section');
    
    const simulatorSection = document.getElementById('simulador');
    if (simulatorSection) {
      simulatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      className="relative w-full h-screen min-h-[600px] flex flex-col bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: `url('https://horizons-cdn.hostinger.com/bc4d8315-00d2-4a09-8fc9-020dbc4f186b/1f8aeca2c69acf0fae964795d2ecbae5.jpg')`,
        backgroundPosition: 'center center',
        backgroundSize: 'cover'
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      {/* Main Content Container - Centered Layout with Proportional Spacing */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center gap-8 md:gap-10">
        
        {/* Top: Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex-none"
        >
          <img 
            src="https://horizons-cdn.hostinger.com/bc4d8315-00d2-4a09-8fc9-020dbc4f186b/f0c4b543cd3bbd39bdcbe0d5107a57d7.png" 
            alt="Akila Capital Logo" 
            className="w-[140px] sm:w-[160px] md:w-[220px] lg:w-[280px] h-auto object-contain drop-shadow-2xl"
          />
        </motion.div>

        {/* Middle: Main Heading - Adjusted for 2 lines */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="w-full max-w-[90%] md:max-w-4xl px-2"
        >
          <h1 className="text-[16px] xs:text-[18px] sm:text-[22px] md:text-[28px] lg:text-[34px] xl:text-[40px] font-semibold text-white uppercase leading-[1.4] md:leading-[1.4] drop-shadow-lg tracking-wide text-balance">
            Voe mais alto, consultoria especializada em consórcios e alavancagem patrimonial
          </h1>
        </motion.div>

        {/* Bottom: CTA Button - Ensuring visibility and no overflow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="flex-none block pt-2"
        >
          <Button 
            size="lg" 
            className="inline-flex items-center justify-center bg-[#FF6B35] hover:bg-[#E55A2B] text-white text-[15px] sm:text-[16px] md:text-[18px] font-bold px-8 py-6 rounded-md shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 whitespace-nowrap"
            onClick={scrollToSimulator}
          >
            Começar Agora
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;