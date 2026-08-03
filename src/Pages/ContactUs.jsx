import { useState } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MapPin, Phone, Mail, Send, Sparkles, Building2 } from "lucide-react";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const validateFields = () => {
    if (!name.trim()) return "❌ Name cannot be empty.";
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
      // For general contact requests, we send to a contact or general enquiry route
      await apiClient.post("/enquiries", {
        name,
        email,
        mobileNumber,
        message,
        isContactForm: true
      });

      setResponseMessage("✅ Your message has been sent successfully!");
      setName("");
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
    <div className="section-shell pt-6 pb-14 sm:pt-8 sm:pb-16 relative overflow-hidden bg-white">
      <div className="relative z-10">

        {/* Brand Green Title Section */}
        <div className="mb-14 text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.3em] text-[#3d1e24] mb-4">
            <Sparkles size={14} className="text-[#753441]" />
            GREEN-VIJAYA REAL ESTATE ADVISORY
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-950 sm:text-5xl tracking-tight">
            Connect With Our <span className="text-[#3d1e24]">Property Specialists</span>
          </h2>
          <p className="mt-4 text-slate-600 font-normal text-base sm:text-lg leading-relaxed">
            Have questions about Green-Vijaya&apos;s premier residential townships, commercial property portfolios, or scheduling a private site visit? Reach out directly to our senior real estate advisory team.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 mb-20 text-left items-start">

          {/* Contact Information - Clean Layout with Smooth Upward Hover Lifts (No Box Borders or Ad Shadows) */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-[#3d1e24] mb-3">Green-Vijaya Advisory Info</h3>
              <p className="text-slate-600 leading-relaxed font-normal text-sm sm:text-base">
                Whether you are exploring luxury residential real estate investments or planning strategic commercial land acquisitions, our property consultants provide tailored, transparent guidance every step of the way.
              </p>
            </div>

            {/* Interactive Image Showcase Card with Hover Elevation */}
            <div className="group relative h-64 w-full rounded-3xl overflow-hidden bg-slate-900 transition-transform duration-500 hover:-translate-y-2.5">
              <img
                src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80"
                alt="Green Vijaya Headquarters Architecture"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#261116]/90 via-[#261116]/40 to-transparent opacity-85" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="text-rose-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 size={15} /> Butler Colony, Lucknow
                </p>
                <h4 className="text-xl font-bold mt-1 group-hover:text-rose-300 transition-colors">
                  Visit Our Experience Center
                </h4>
              </div>
            </div>

            {/* Direct Contact Items with Upward Hover Float */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-[#3d1e24] mb-3.5">
                  <Phone size={22} />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Direct Contact</h4>
                <p className="mt-1 text-base font-bold text-[#3d1e24]">+91 9450058323</p>
                <p className="text-xs font-semibold text-slate-600">+91 9473802415</p>
              </div>

              <div className="rounded-2xl p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-[#3d1e24] mb-3.5">
                  <Mail size={22} />
                </div>
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Electronic Mail</h4>
                <p className="mt-1 text-base font-bold text-[#3d1e24]">info@greenvijaya.com</p>
                <p className="text-xs font-semibold text-slate-500">24/7 client advisory support</p>
              </div>

              <div className="sm:col-span-2 rounded-2xl p-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-50 text-[#3d1e24]">
                    <MapPin size={22} />
                  </div>
                  <div>
                    <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Corporate Headquarters</h4>
                    <p className="mt-1 font-bold text-[#3d1e24] text-sm leading-relaxed">
                      Ward 15, 21/N/1, Tilak Marg, Ram Mohan Rai Marg, Butler Colony, Lucknow, Uttar Pradesh 226001
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form - Simple & Modern without Boxy Ad Border or Heavy Shadows */}
          <div className="bg-slate-50/80 rounded-3xl p-8 sm:p-10 ">
            <h3 className="text-2xl font-bold text-[#3d1e24] mb-2">Request Private Consultation</h3>
            <p className="text-xs text-slate-500 font-normal mb-6">Fill in your requirements below and an executive consultant will call you shortly.</p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { id: "name", type: "text", value: name, setter: setName, placeholder: "Enter your full name", label: "Full Name" },
                { id: "mobileNumber", type: "text", value: mobileNumber, setter: setMobileNumber, placeholder: "Enter your 10-digit mobile number", label: "Mobile Number" },
                { id: "email", type: "email", value: email, setter: setEmail, placeholder: "Enter your email address", label: "Email Address" },
              ].map(({ id, type, value, setter, placeholder, label }) => (
                <div key={id}>
                  <label htmlFor={id} className="block text-xs font-extrabold uppercase tracking-wider text-[#3d1e24] mb-1.5">{label}</label>
                  <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={(e) => setter(e.target.value)}
                    required
                    placeholder={placeholder}
                    className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 border-none focus:outline-none focus:ring-2 focus:ring-[#753441] transition-all"
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-extrabold uppercase tracking-wider text-[#3d1e24] mb-1.5">Message / Inquiry</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell us about your property preferences or schedule a private site visit..."
                  className="w-full rounded-2xl bg-white px-4 py-3.5 text-sm font-medium text-slate-900 placeholder-slate-400 border-none focus:outline-none focus:ring-2 focus:ring-[#753441] transition-all"
                  rows="4"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`mt-6 flex w-full items-center justify-center gap-3 rounded-full px-8 py-4 font-extrabold text-white transition-all duration-300 ${loading
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-[#3d1e24] hover:bg-[#291217] hover:-translate-y-1 active:translate-y-0"
                  }`}
              >
                {loading ? (
                  "Submitting..."
                ) : (
                  <>
                    <span>Submit Consultation Request</span>
                    <Send size={18} className="shrink-0" />
                  </>
                )}
              </button>

              {responseMessage && (
                <div className={`mt-4 rounded-2xl p-4 text-center text-sm font-bold ${responseMessage.includes("❌") ? "bg-red-50 text-red-600" : "bg-rose-50 text-[#3d1e24]"}`}>
                  {responseMessage}
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Google Map - Simple & Clean with Upward Hover Lift */}
        <div className="mb-20">
          <div className="mb-8 text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-950">Our Headquarters & Experience Center</h2>
            <p className="mt-2 text-slate-600 text-sm font-normal">Visit our corporate offices in Butler Colony, Lucknow to view architectural masterplans and project layouts.</p>
          </div>
          <div className="overflow-hidden h-80 sm:h-[420px] lg:h-[480px]">
            <iframe
              title="Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.6810947293557!2d81.01123537462805!3d26.850771476654817!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399bfd104c6601b7%3A0x8923c0619e563456!2sDifmo%20Technologies!5e0!3m2!1sen!2sin!4v1708334543215!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0 w-full h-full"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>

        {/* Social Media Network with Hover Lifts */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-[#3d1e24] mb-6">Connect With Our Professional Network</h2>
          <div className="flex justify-center gap-6">
            {[
              { name: "Facebook", Icon: FaFacebookF, link: "https://www.facebook.com/share/16ZPuAWVye/", color: "hover:bg-[#1877F2] hover:text-white" },
              { name: "Twitter", Icon: FaTwitter, link: "#", color: "hover:bg-[#1DA1F2] hover:text-white" },
              { name: "LinkedIn", Icon: FaLinkedinIn, link: "https://www.linkedin.com/in/chandan-singh-754418303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", color: "hover:bg-[#0A66C2] hover:text-white" },
              { name: "Instagram", Icon: FaInstagram, link: "https://www.instagram.com/uniqueusd?utm_source=qr&igsh=aXZ6Ymw0bDBubTho", color: "hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white" },
            ].map(({ name, Icon, link, color }) => (
              <a
                key={name}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-[#3d1e24] transition-all duration-300 hover:-translate-y-2 hover:scale-105 ${color}`}
                aria-label={name}
              >
                <Icon size={24} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
