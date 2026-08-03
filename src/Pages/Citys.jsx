// City.jsx
import { motion } from "framer-motion";
import {
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";

const City = () => {
  const cities = [
    {
      id: 1,
      name: "Lucknow",
      image:
        "https://travelnthrill.com/wp-content/uploads/2015/09/Visit-Lucknow.jpg",
      mapUrl: "https://maps.google.com/?q=lucknow",
      contactUrl: "/contact"
    },
    {
      id: 2,
      name: "Kanpur",
      image:
        "https://content.r9cdn.net/rimg/dimg/e8/c1/3e82ae48-lm-66394-16c3def167a.jpg?width=1750&height=1000&xhint=2265&yhint=1476&crop=true",
      mapUrl: "https://maps.google.com/?q=kanpur",
      contactUrl: "/contact"
    },
    {
      id: 3,
      name: "Noida",
      image:
        "https://tse4.mm.bing.net/th?id=OIP.Kra_rvfFCUsuZdLMHu661wHaDm&pid=Api&P=0&h=180",
      mapUrl: "https://maps.google.com/?q=noida",
      contactUrl: "/contact"
    },
    {
      id: 4,
      name: "Varanasi",
      image:
        "https://tse2.mm.bing.net/th?id=OIP.WX33mi09UzX-3Nd5QeH_FQHaEK&pid=Api&P=0&h=180",
      mapUrl: "https://maps.google.com/?q=varanasi",
      contactUrl: "/contact"
    }
  ];

  return (
    <motion.div
      className="p-6 max-w-7xl mx-auto bg-white rounded-lg"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Heading */}
      <motion.h1
        className="text-3xl font-bold text-center mb-10 text-[#133763]"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Explore Real Estate in{" "}
        <span className="text-[#cb2b39]">Cities Across India</span>
      </motion.h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {cities.map((city, index) => (
          <motion.div
            key={city.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            {/* Image */}
            <div className="h-40 w-full overflow-hidden">
              <img
                src={city.image}
                alt={city.name}
                className="w-full h-full object-cover transform hover:scale-105 transition duration-300"
              />
            </div>
            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-40">
              <div>
                <h2 className="text-lg font-semibold text-[#133763]">
                  {city.name}
                </h2>
              </div>
              {/* Links */}
              <div className="mt-4 flex justify-between items-center">
                <a
                  href={city.contactUrl}
                  className="text-sm text-[#cb2b39] font-medium hover:underline"
                >
                  Contact Us
                </a>
                <a
                  href={city.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm text-green-600 font-medium hover:underline"
                >
                  <FaMapMarkerAlt className="mr-1" /> Map
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Map Section */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Our Location
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Visit us at our office to see how we innovate and bring your ideas to
          life.
        </p>
        <div className="flex justify-center">
          <iframe
            title="Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6810947293557!2d81.01123537462805!3d26.850771476654817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd104c6601b7%3A0x8923c0619e563456!2sDifmo%20Technologies!5e0!3m2!1sen!2sin!4v1708334543215!5m2!1sen!2sin"
            width="600"
            height="450"
            className="w-full rounded-lg shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </motion.div>

      {/* Social Media Section */}
      <motion.div
        className="text-center py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Connect With Us</h2>
        <div className="flex justify-center space-x-6">
          {[
            {
              name: "Facebook",
              Icon: FaFacebookF,
              link: "https://www.facebook.com/udham.singh.p"
            },
            {
              name: "Twitter",
              Icon: FaTwitter,
              link: "https://twitter.com"
            },
            {
              name: "LinkedIn",
              Icon: FaLinkedinIn,
              link: "https://www.linkedin.com/company/104143780/admin/dashboard/"
            },
            {
              name: "Instagram",
              Icon: FaInstagram,
              link: "https://www.instagram.com/udham.singh.p"
            }
          ].map(({ name, Icon, link }) => (
            <motion.a
              key={name}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-orange-300 transform transition duration-300 hover:scale-110"
              whileHover={{ scale: 1.2 }}
            >
              <Icon size={30} />
            </motion.a>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default City;
