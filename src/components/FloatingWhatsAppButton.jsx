import React from 'react';
import { motion } from 'framer-motion';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import InstagramLogo from '@/components/ui/InstagramLogo';

const FloatingWhatsAppButton = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-50 flex flex-row items-center gap-2 md:gap-3"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* WhatsApp Button */}
      <motion.a
        href="https://wa.me/5534998918954"
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-lg cursor-pointer hover:bg-[#20bd5a] transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1, boxShadow: "0px 8px 20px rgba(37, 211, 102, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
           {/* Pulse Animation for WhatsApp */}
           <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.3, 0, 0.3]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-white/30"
          />
          <WhatsAppLogo className="w-5 h-5 md:w-8 md:h-8 text-white" />
        </div>
      </motion.a>

      {/* Instagram Button */}
      <motion.a
        href="https://www.instagram.com/akilacapital?igsh=MXdldXA4eXkydDZmZw=="
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-10 h-10 md:w-14 md:h-14 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-full shadow-lg cursor-pointer transition-all duration-300"
        variants={itemVariants}
        whileHover={{ scale: 1.1, boxShadow: "0px 8px 20px rgba(220, 39, 67, 0.4)" }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="relative flex items-center justify-center w-full h-full">
          <InstagramLogo className="w-5 h-5 md:w-7 md:h-7 text-white" />
        </div>
      </motion.a>
    </motion.div>
  );
};

export default FloatingWhatsAppButton;