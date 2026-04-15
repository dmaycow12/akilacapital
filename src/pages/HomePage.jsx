import React from 'react';
import { Helmet } from 'react-helmet';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import SimuladorSection from '@/components/SimuladorSection';
import InvestmentSection from '@/components/InvestmentSection';
import CartasSection from '@/components/CartasSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Akila Capital - Consultoria em Consórcios e Alavancagem Patrimonial</title>
        <meta 
          name="description" 
          content="Você merece. Consultoria especializada em consórcios e alavancagem patrimonial. Simule agora e conquiste seus objetivos financeiros." 
        />
      </Helmet>
      <div className="min-h-screen bg-bgDark flex flex-col">
        <main className="flex-grow">
          <HeroSection />
          <ServicesSection />
          <SimuladorSection />
          <InvestmentSection />
          <CartasSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default HomePage;