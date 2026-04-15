import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-bgDark border-t border-gray-800 w-full py-12 px-4 mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-center gap-3">
        <p className="text-sm md:text-base text-gray-300 text-center font-medium">
          © 2026 Akila Capital. Todos os direitos reservados.
        </p>
        <p className="text-sm text-gray-500 text-center">
          CNPJ: 65.065.069/0001-49
        </p>
      </div>
    </footer>
  );
};

export default Footer;