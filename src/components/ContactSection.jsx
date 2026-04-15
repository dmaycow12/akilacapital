import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const whatsappNumber = '5534998918954';
  const message = 'Olá, gostaria de solicitar uma proposta personalizada.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="contato" className="py-20 bg-[#0A0A0B] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Pronto para alavancar seu patrimônio?
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Nossa equipe de especialistas está pronta para desenhar a melhor estratégia de consórcio e investimento para você.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button 
                onClick={handleWhatsAppClick}
                size="lg" 
                className="w-full sm:w-auto bg-[#FF6B35] hover:bg-[#E55A2B] text-white font-bold py-7 px-8 text-lg rounded-xl shadow-lg shadow-[#FF6B35]/20 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <MessageSquare className="w-6 h-6" />
                Solicitar proposta personalizada
              </Button>
            </div>

            <div className="mt-12 pt-12 border-t border-white/5 flex flex-col items-center gap-4">
              <p className="text-gray-500 text-sm">Ou fale conosco diretamente:</p>
              <a 
                href="tel:+5534998918954" 
                className="text-white hover:text-[#FF6B35] transition-colors text-xl font-medium"
              >
                (34) 99891-8954
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;