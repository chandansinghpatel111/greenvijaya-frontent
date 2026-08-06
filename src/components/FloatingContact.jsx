import { Phone } from "lucide-react";

const FloatingContact = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end">
      {/* Phone Calling Button */}
      <a
        href="tel:+919450058323"
        className="group flex items-center bg-gradient-to-tr from-[#1a0c0f] to-[#3d1e24] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-[50px]"
        aria-label="Call for buy"
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
          <Phone size={20} className="group-hover:animate-pulse" />
        </div>
        <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs group-hover:px-3 group-hover:-ml-2 transition-all duration-300 font-medium text-sm">
          Call: +91 9450058323
        </span>
      </a>

      {/* WhatsApp Button */}
      <a
        href="https://api.whatsapp.com/send/?phone=919450058323&text=Hello!%20I%20would%20like%20to%20know%20more."
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center bg-gradient-to-tr from-[#25D366] to-[#128C7E] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden h-[50px]"
        aria-label="Chat on WhatsApp"
      >
        <div className="w-[50px] h-[50px] flex items-center justify-center flex-shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" stroke="none">
            <path d="M12.031 0C5.385 0 .002 5.383.002 12.029c0 2.122.553 4.195 1.603 6.012L.05 24l6.113-1.603a11.967 11.967 0 005.868 1.53h.005c6.645 0 12.027-5.383 12.027-12.029C24 5.281 18.631 0 12.031 0zm0 21.954h-.004a9.946 9.946 0 01-5.074-1.385l-.364-.216-3.771.989.999-3.676-.237-.376a9.92 9.92 0 01-1.52-5.26c0-5.485 4.465-9.95 9.954-9.95 2.66 0 5.161 1.037 7.042 2.918s2.917 4.382 2.917 7.043c-.001 5.485-4.466 9.95-9.941 9.95zm5.457-7.436c-.299-.15-1.771-.875-2.045-.975-.274-.101-.475-.15-.675.15-.2.3-.772.975-.947 1.176-.175.2-.35.225-.65.075-2.05-1.03-3.674-2.887-4.22-3.837-.175-.3-.018-.462.132-.612.135-.135.299-.35.45-.525.15-.175.2-.299.3-.5.101-.2.05-.375-.025-.525-.075-.15-.675-1.625-.925-2.225-.243-.585-.49-.505-.675-.515-.174-.009-.374-.009-.574-.009-.2 0-.525.075-.8.375-.275.3-1.05 1.025-1.05 2.5 0 1.475 1.075 2.9 1.225 3.1.15.2 2.115 3.226 5.122 4.526 1.834.793 2.5.875 3.425.75 1.002-.136 3.1-1.275 3.525-2.5.425-1.225.425-2.275.3-2.5-.125-.225-.475-.35-.775-.5z" />
          </svg>
        </div>
        <span className="whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-xs group-hover:px-4 group-hover:-ml-2 transition-all duration-300 font-medium text-sm">
          Chat on WhatsApp
        </span>
      </a>
    </div>
  );
};

export default FloatingContact;
