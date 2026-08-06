import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { MapPin, Phone, Mail, Send } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

const ContactUs = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // Replaced Subject with Mobile for functionality
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    if (!firstName.trim()) return "❌ First Name cannot be empty.";
    if (!/^\d{10}$/.test(mobileNumber)) return "❌ Invalid mobile number. Enter 10 digits.";
    if (!/\S+@\S+\.\S+/.test(email)) return "❌ Invalid email format.";
    if (!message.trim()) return "❌ Message cannot be empty.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    const validationError = validateFields();
    if (validationError) {
      setResponseMessage(validationError);
      return;
    }

    setLoading(true);
    try {
      await apiClient.post('/enquiries', {
        name: `${firstName} ${lastName}`.trim(),
        email,
        phone: mobileNumber,
        message,
      });

      setResponseMessage("✅ Your message has been sent successfully!");

      // Generate WhatsApp Link
      const adminWhatsApp = "919450058323";
      const textMessage = encodeURIComponent(
        `Hi Green Vijaya Team,\n\nI have a new enquiry.\n\n*Name:* ${firstName} ${lastName}\n*Email:* ${email}\n*Mobile:* ${mobileNumber}\n*Message:* ${message}`
      );
      const whatsappUrl = `https://wa.me/${adminWhatsApp}?text=${textMessage}`;
      
      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');

      setFirstName("");
      setLastName("");
      setEmail("");
      setMobileNumber("");
      setMessage("");

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setResponseMessage("❌ An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f6f9fa] min-h-screen font-sans w-full overflow-hidden flex flex-col justify-center pt-2 sm:pt-1 pb-12 sm:pb-16 lg:pb-24">
      <div className="section-shell max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Get in Touch (Now visually on Left) */}
          <div className="lg:col-span-6 lg:order-first pt-0 lg:pr-10 lg:pl-4">
            <span className="text-[#753441] font-extrabold tracking-[0.3em] uppercase text-[10px] sm:text-xs mb-3 block">WE'RE HERE TO HELP</span>
            <h2 className="text-5xl sm:text-6xl font-black text-[#291217] mb-5 leading-[1.05] tracking-tight">
              Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d1e24] to-[#753441]">Connect</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-[17px] leading-relaxed mb-8 max-w-md font-medium">
              Whether you're exploring our luxury residential townships or seeking strategic commercial spaces, our expert real estate advisory team is here to guide you every step of the way.
            </p>

            {/* Brand Theme Horizontal Line */}
            <div className="w-40 h-[2px] bg-gradient-to-r from-[#753441] to-transparent mb-6"></div>

            {/* Contact Info Items */}
            <div className="space-y-5">
              <div className="flex items-center gap-4 text-[14px] sm:text-[15px] font-bold text-[#3d1e24]">
                <Mail size={20} className="text-[#753441]" />
                <span>info@greenvijaya.com</span>
              </div>
              <div className="flex items-center gap-4 text-[14px] sm:text-[15px] font-bold text-[#3d1e24]">
                <Phone size={20} className="text-[#753441]" />
                <span>+91 9450058323</span>
              </div>
              <div className="flex items-start gap-4 text-[14px] sm:text-[15px] font-bold text-[#3d1e24]">
                <MapPin size={20} className="text-[#753441] shrink-0 mt-0.5" />
                <span className="leading-snug max-w-[250px]">Ward 15, 21/N/1, Tilak Marg, Butler Colony, Lucknow</span>
              </div>
            </div>

            {/* Social Icons matching the brand vibe */}
            <div className="flex items-center gap-4 mt-8">
              {[
                { Icon: FaFacebookF, link: "https://www.facebook.com/share/16ZPuAWVye/" },
                { Icon: FaTwitter, link: "#" },
                { Icon: FaLinkedinIn, link: "https://www.linkedin.com/in/chandan-singh-754418303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" },
                { Icon: FaInstagram, link: "https://www.instagram.com/uniqueusd?utm_source=qr&igsh=aXZ6Ymw0bDBubTho" },
              ].map(({ Icon, link }, i) => (
                <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-[#753441] hover:bg-[#3d1e24] hover:text-white hover:border-[#3d1e24] transition-colors">
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Right Column: The Form (Now visually on Right) */}
          <div className="lg:col-span-6 lg:order-last bg-white rounded-[2rem] p-6 sm:p-8 lg:p-10 shadow-[0_15px_50px_rgba(0,0,0,0.06)] h-fit">
            <h3 className="text-lg sm:text-xl font-bold text-[#3d1e24] mb-1.5 uppercase tracking-wide">HOW CAN WE HELP?</h3>
            <p className="text-[13px] sm:text-[14px] text-[#753441] mb-6 sm:mb-8 font-medium tracking-tight">Feel free to ask a question or simply leave a comment</p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  placeholder="First Name"
                  className="w-full bg-[#fafbfc] border border-slate-100 rounded-full px-5 py-3 text-[14px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441]/30 transition-all"
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Last Name"
                  className="w-full bg-[#fafbfc] border border-slate-100 rounded-full px-5 py-3 text-[14px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441]/30 transition-all"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="E-mail"
                  className="w-full bg-[#fafbfc] border border-slate-100 rounded-full px-5 py-3 text-[14px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441]/30 transition-all"
                />
                <input
                  type="text"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                  placeholder="Mobile Number"
                  className="w-full bg-[#fafbfc] border border-slate-100 rounded-full px-5 py-3 text-[14px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441]/30 transition-all"
                />
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                placeholder="Comments / Questions"
                rows="3"
                className="w-full bg-[#fafbfc] border border-slate-100 rounded-2xl sm:rounded-3xl px-5 py-4 text-[14px] font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#753441]/20 focus:border-[#753441]/30 transition-all resize-none"
              ></textarea>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-gradient-to-r from-[#291217] to-[#4e222d] text-white rounded-full px-10 py-3 sm:py-3.5 text-[14px] font-bold hover:shadow-lg hover:-translate-y-0.5 transition-all disabled:bg-slate-400 disabled:shadow-none disabled:translate-y-0"
                >
                  {loading ? "Submitting..." : "Click here"}
                </button>
              </div>

              {responseMessage && (
                <div className={`mt-3 rounded-xl p-3 text-[14px] font-bold ${responseMessage.includes("❌") ? "text-red-600" : "text-[#753441]"}`}>
                  {responseMessage}
                </div>
              )}
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContactUs;
