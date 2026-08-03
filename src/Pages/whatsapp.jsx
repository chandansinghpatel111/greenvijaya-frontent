// components/WhatsappButton.tsx
import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=919450058323&text&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 md:bottom-16 right-4 animate-pulse"
    >
      <button className="bg-green-500 text-white p-2 rounded-full shadow-lg flex items-center space-x-2 transition-transform duration-300 hover:scale-110">
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/495/946/original/whatsapp-logo-icon-free-png.png"
          alt="WhatsApp"
          className="w-14 h-14 sm:w-10 sm:h-10"
        />
      </button>
    </a>
  );
};

export default WhatsAppButton;
