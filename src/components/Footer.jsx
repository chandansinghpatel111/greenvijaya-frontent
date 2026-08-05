import {
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const quickLinks = [
    { name: 'About Us', href: '/about' },
    { name: 'Service', href: '/service' },
    { name: 'City', href: '/city' },
    { name: 'Contact Us', href: '/contact' },
  ];

  const services = [
    { name: 'Buy a home', href: '/services/home' },
    { name: 'Buying a commercial property', href: '/services/commercial' },
    { name: 'Renting a home', href: '/services/rent' },
  ];

  const contactInfo = {
    address: 'Ward 15, 21/N/1, Tilak Marg, Ram Mohan Rai Marg, Butler Colony, Lucknow, Uttar Pradesh 226001',
    email: 'uniqueusdinfrapvtltd@gmail.com',
    phone: '+91 9450058323 / 9473802415',
  };

  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-br from-[#1a0c0f] to-[#3d1e24] text-white border-t border-rose-900/40"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(244,63,94,0.15),_transparent_55%)] pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.8fr_0.9fr_1.1fr]">
          <div className="text-left">
            {/* <div className="inline-flex items-center gap-2 rounded-full border border-rose-400/30 bg-rose-500/10 px-3.5 py-1 text-xs font-extrabold tracking-wider uppercase text-rose-300 shadow-sm">
              <Sparkles size={14} className="text-rose-400" />
              Premium Real Estate Advisory
            </div> */}
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-rose-100 to-rose-300 tracking-tight">
              Green Vijaya Infra
            </h3>
            <p className="mt-3 max-w-md text-sm leading-7 text-rose-100/80 font-normal">
              We redefine modern living through trusted property guidance, government-approved architectural developments, and a commitment to sustained capital value.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="https://www.facebook.com/share/16ZPuAWVye/" aria-label="Facebook" className="rounded-2xl border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-[#3d1e24] hover:text-rose-300 hover:border-rose-400">
                <Facebook size={18} />
              </a>
              <a href="https://www.youtube.com/@UniqueUSD-com" aria-label="Youtube" className="rounded-2xl border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-[#3d1e24] hover:text-rose-300 hover:border-rose-400">
                <Youtube size={18} />
              </a>
              <a href="https://www.instagram.com/uniqueusd?utm_source=qr&igsh=aXZ6Ymw0bDBubTho" aria-label="Instagram" className="rounded-2xl border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-[#3d1e24] hover:text-rose-300 hover:border-rose-400">
                <Instagram size={18} />
              </a>
              <a href="https://www.linkedin.com/in/chandan-singh-754418303?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" aria-label="Linkedin" className="rounded-2xl border border-white/20 bg-white/10 p-3 transition-all duration-300 hover:scale-110 hover:bg-[#3d1e24] hover:text-rose-300 hover:border-rose-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div className="text-left">
            <h4 className="text-lg font-bold text-white tracking-wide border-l-4 border-rose-400 pl-3">Quick Links</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="flex items-center gap-2.5 transition duration-200 hover:text-rose-300 hover:translate-x-1.5 font-medium">
                    <ArrowRight size={15} className="text-rose-400 shrink-0" /> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-lg font-bold text-white tracking-wide border-l-4 border-rose-400 pl-3">Our Services</h4>
            <ul className="mt-5 space-y-3 text-sm text-slate-200">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.href} className="flex items-center gap-2.5 transition duration-200 hover:text-rose-300 hover:translate-x-1.5 font-medium">
                    <ArrowRight size={15} className="text-rose-400 shrink-0" /> {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="text-left">
            <h4 className="text-lg font-bold text-white tracking-wide border-l-4 border-rose-400 pl-3">Corporate Office</h4>
            <div className="mt-5 space-y-4 text-sm text-slate-200">
              <div className="flex items-start gap-3.5">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-rose-400" />
                <span className="leading-relaxed font-medium text-rose-100/90">{contactInfo.address}</span>
              </div>
              <div className="flex items-center gap-3.5">
                <Mail size={18} className="flex-shrink-0 text-rose-400" />
                <span className="font-medium text-rose-100/90">{contactInfo.email}</span>
              </div>
              <div className="flex items-center gap-3.5">
                <Phone size={18} className="flex-shrink-0 text-rose-400" />
                <span className="font-medium text-rose-100/90">{contactInfo.phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 border-t border-rose-800/60 pt-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between text-left">
            <div className="flex flex-col gap-1 text-sm text-rose-200/80 md:flex-row md:gap-4 font-normal">
              <span>© {new Date().getFullYear()} Green Vijaya Infra Works Pvt. Ltd. All rights reserved.</span>
              <span className="hidden md:block text-rose-700">|</span>
              <span>
                Developed by <a href="https://agniit.com" target="_blank" rel="noopener noreferrer" className="font-bold text-rose-300 transition hover:text-white underline decoration-rose-500/50">agniit.com</a>
              </span>
            </div>

            <div className="flex flex-wrap gap-6 text-sm font-medium text-rose-200/80">
              <Link to="/privacy" className="transition hover:text-rose-300">Privacy Policy</Link>
              <Link to="/terms" className="transition hover:text-rose-300">Terms of Service</Link>
              <Link to="/cookies" className="transition hover:text-rose-300">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

