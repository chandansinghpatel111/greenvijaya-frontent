import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Search, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Slider() {
  const navigate = useNavigate();
  const [propertyType, setPropertyType] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const media = [
    { type: 'video', src: '/video22.mp4' },
    { type: 'image', src: '/image123.avif' },
    { type: 'image', src: '/image456.webp' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % media.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full min-h-[100vh] overflow-hidden bg-slate-900 flex flex-col -mt-14">
      {/* Background Media Slider */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 w-full h-full z-0"
        >
          {media[currentIndex].type === 'video' ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={media[currentIndex].src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={media[currentIndex].src}
              alt={`Slide ${currentIndex}`}
              className="w-full h-full object-cover"
            />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full flex-grow flex items-center justify-center section-shell pt-24 sm:pt-28 lg:pt-32 pb-12 md:pb-16">
        <motion.div
          className="flex flex-col items-center text-center max-w-4xl px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Search Bar Section (Smaller Size & Theme Colors) */}
          <div className="flex flex-col sm:flex-row items-center gap-1.5 rounded-2xl sm:rounded-full border border-white/20 bg-white/10 backdrop-blur-md p-1.5 w-full max-w-xl mx-auto shadow-sm -mt-4 sm:-mt-6 mb-8 sm:mb-10">
            <div className="flex items-center w-full px-3 py-1.5 sm:py-1">
              <MapPin size={16} className="text-rose-300 shrink-0 mr-2" />
              <input
                type="text"
                placeholder="Search city or project..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent text-white w-full focus:outline-none placeholder-gray-300 text-[13px]"
              />
            </div>

            <div className="hidden sm:block w-[1px] h-6 bg-white/20 shrink-0"></div>

            <div className="flex items-center w-full sm:w-auto px-3 py-1.5 sm:py-1 border-t border-white/10 sm:border-t-0 relative">
              <div
                className="bg-transparent text-gray-100 w-full sm:w-32 focus:outline-none text-[13px] appearance-none cursor-pointer outline-none flex justify-between items-center"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {propertyType || "Property Type"}
                <svg className={`w-3 h-3 ml-2 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </div>

              {isDropdownOpen && (
                <div className="absolute top-full left-0 w-full mt-3 bg-white/95 backdrop-blur-xl border border-gray-100/50 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden z-50">
                  <div className="py-1.5 overflow-y-auto max-h-60">
                    {["", "Residential", "Commercial", "Flat/Apartment", "Independent House/Villa", "Plot/Land", "1 RK/Studio Apartment", "Office", "Retail", "Storage", "Industry"].map((type) => (
                      <div
                        key={type}
                        className={`px-4 py-2.5 text-[13px] cursor-pointer transition-all duration-200 flex items-center ${propertyType === type
                          ? "bg-slate-50 text-[#b8860b] font-semibold border-l-[3px] border-[#d4af37]"
                          : "text-slate-600 hover:bg-slate-50/80 hover:text-[#d4af37] border-l-[3px] border-transparent"
                          }`}
                        onClick={() => { setPropertyType(type); setIsDropdownOpen(false); }}
                      >
                        {type === "" ? "Property Type" : type}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                navigate(`/Search?query=${encodeURIComponent(searchQuery)}&type=${propertyType}`);
              }}
              className="flex items-center justify-center w-full bg-[#e0a973] backdrop-blur-md text-white sm:w-auto from-[#d4af37] to-[#b8860b] hover:from-[#f0e6d2] hover:to-[#d4af37] text-[#240a12] rounded-xl sm:rounded-full px-6 py-2.5 sm:py-2 font-bold text-[13px] transition-all shadow-md shrink-0"
            >
              <Search size={14} className="mr-1.5" /> Search
            </button>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.1] mb-6">
            Building spaces where <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-white">
              Memories thrive
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-gray-300 font-normal leading-relaxed max-w-2xl mb-10">
            Green-Vijaya brings architectural innovation and trusted excellence to modern real estate. We specialize in luxury residential villas, prime commercial spaces, and government-approved urban townships.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <button
              onClick={() => navigate('/Search')}
              className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#240a12]/80 backdrop-blur-sm text-white px-8 py-4 text-sm sm:text-base font-bold text-[#240a12] shadow-lg shadow-[#d4af37]/20 transition-all duration-300 hover:scale-[1.03] active:scale-95"
            >
              <span>Explore Properties</span>
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5 shrink-0" />
            </button>

            <button
              onClick={() => navigate('/contact')}
              className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border border-[#d4af37]/50 bg-[#e0a973] px-8 py-4 text-sm sm:text-base font-bold transition-all duration-300  hover:scale-[1.03] active:scale-95"
            >
              <Calendar size={18} className="text-white shrink-0" />
              <span>Schedule Visit</span>
            </button>
          </div>

          {/* Trust Badges / Quick Stats */}
          <div className="mt-14 grid grid-cols-3 gap-4 sm:gap-10 pt-8 border-t border-white/20 w-full max-w-3xl">
            <div>
              <p className="text-2xl sm:text-4xl font-bold text-white">50+</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Luxury Projects</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-bold text-rose-300">98%</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Satisfaction</p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-bold text-white">2+ Yrs</p>
              <p className="text-xs sm:text-sm text-gray-300 mt-1 uppercase tracking-wider font-medium">Excellence</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Slider;

