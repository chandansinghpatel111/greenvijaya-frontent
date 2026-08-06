
import { motion } from "framer-motion";
import { FaGooglePlay, FaApple } from "react-icons/fa";
import App from "../assets/usdAppimages.png";

const AppPromo = () => {
  return (
    <motion.div
      className="bg-orange-50 py-8"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left mb-6 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-brand-burgundy/90 mb-4">
            Download Usdunique Mobile App
          </h2>
          <p className="text-gray-600 mb-4">And never miss out on any update</p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Get to know about newly posted properties as soon as they are posted</li>
            <li>Manage your properties with ease and get instant alerts about responses</li>
          </ul>

          {/* Button Section */}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
            <a
              href="https://play.google.com/store/apps/details?id=com.difmo.usdunique"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 border border-brand-gold rounded-full bg-brand-gold text-white hover:bg-[#e07c13] transition-colors"
            >
              <FaGooglePlay size={20} />
              <span>Google Play</span>
            </a>

            <a
              href="https://play.google.com/store/apps/details?id=com.difmo.usdunique"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-2 border border-brand-gold rounded-full bg-brand-gold text-white hover:bg-[#e07c13] transition-colors"
            >
              <FaApple size={20} />
              <span>App Store</span>
            </a>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <img
            src={App}
            alt="Mobile App Screenshot"
            className="w-1/2 md:w-2/3 h-auto rounded-lg shadow-md"
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AppPromo;
