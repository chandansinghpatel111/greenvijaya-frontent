// components/WhatsappButton.tsx
import React from 'react';

const WhatsAppButton = () => {
  return (
    <a
      href="https://api.whatsapp.com/send/?phone=919450058323&text=Hello!%20I%20would%20like%20to%20know%20more."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 md:bottom-16 right-4 sm:right-6 z-[60] flex items-center gap-3 group"
    >
      {/* Speech Bubble */}
      <div className="bg-white px-4 py-2 rounded-2xl shadow-xl border border-gray-100 transition-all duration-300 group-hover:scale-105 hidden sm:block relative after:absolute after:top-1/2 after:-right-2 after:-mt-2 after:border-[8px] after:border-transparent after:border-l-white drop-shadow-md">
        <p className="text-xs sm:text-sm font-extrabold text-slate-700 whitespace-nowrap">Need help? <span className="text-green-500">Chat with us!</span></p>
      </div>

      <div className="bg-green-500 text-white p-1 rounded-full shadow-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <img
          src="https://static.vecteezy.com/system/resources/previews/021/495/946/original/whatsapp-logo-icon-free-png.png"
          alt="WhatsApp"
          className="w-14 h-14 sm:w-12 sm:h-12"
        />
      </div>
    </a>
  );
};

export default WhatsAppButton;
