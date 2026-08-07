import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../data/services";
import CustomButton from "./Button";
import { ChevronLeft, ChevronRight, MapPin, Building2, Sparkles } from "lucide-react";

// Import images
import our1 from "../assets/our7.jpeg";
import our2 from "../assets/our1.jpeg";
import our3 from "../assets/our2.webp";
import our4 from "../assets/our9.jpeg";
import our5 from "../assets/our4.jpeg";

const Ourprojects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  const images = [our1, our2, our3, our4, our5];
  const fallbackImg = "/fallback.jpg";
  const totalSlides = Math.max(0, services.length - visibleCards + 1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCards(2);
      } else {
        setVisibleCards(3);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="max-w-7xl px-4 py-16 mx-auto">
      {/* Brand-Aligned Section Title */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-brand-burgundy mb-3 shadow-sm">
          <Sparkles size={14} className="text-brand-gold" />
          PRESTIGE DEVELOPMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-burgundy tracking-tight">
          Featured Projects to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy to-brand-gold">Explore</span>
        </h2>
        <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
          Discover our premier selection of luxury residential townships, commercial centers, and high-appreciation urban plots.
        </p>
      </div>

      <div className="relative px-2 sm:px-6">
        {/* Slider Content */}
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {services.map((service, index) => (
              <div
                key={service.title}
                className="w-full px-3 transition-all duration-300"
                style={{ minWidth: `${100 / visibleCards}%` }}
              >
                {/* Luxury Real Estate Property Card */}
                <div className="group bg-white border border-slate-200/80 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl hover:border-rose-300 transition-all duration-500 flex flex-col h-full hover:-translate-y-1">
                  
                  {/* Image & Overlay Badge */}
                  <div className="relative h-56 sm:h-64 overflow-hidden bg-slate-900">
                    <img
                      src={images[index % images.length] || fallbackImg}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                    
                    {/* Featured Tag */}
                    <span className="absolute top-4 right-4 rounded-full bg-brand-burgundy/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase border border-white/20 shadow-md">
                      Verified Title
                    </span>

                    {/* Location Badge Overlay on Image */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <div className="flex items-center gap-1.5 text-rose-300 text-xs font-semibold mb-1">
                        <Building2 size={14} className="shrink-0 text-rose-400" />
                        <span>Green Vijaya Township</span>
                      </div>
                    </div>
                  </div>

                  {/* Text Details & Action Button */}
                  <div className="p-6 flex flex-col flex-grow justify-between text-left bg-white">
                    <div>
                      <h3 className="text-xl font-extrabold text-brand-burgundy mb-2.5 group-hover:text-brand-burgundy transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 flex flex-col gap-3">
                      <CustomButton
                        onClick={() => navigate(`/projects/${service.url}`)}
                        text="Explore Property"
                        className="w-full justify-center"
                      />
                      <button
                        onClick={() => {
                          const phoneNumber = "919450058323";
                          const message = `Hello, I am interested in your project: ${service.title}\n\nPlease share more details.`;
                          window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
                        }}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-burgundy to-brand-gold text-white font-bold py-2.5 px-4 rounded-full transition-all shadow-md hover:shadow-lg hover:opacity-90"
                      >
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="18" width="18" xmlns="http://www.w3.org/2000/svg"><path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zM223.9 438.3c-33.1 0-65.5-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path></svg>
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Normal Navigation Controls - Static Left and Right side buttons below cards */}
        <div className="flex items-center justify-between mt-8 px-3">
          <button
            onClick={prevSlide}
            aria-label="Previous Slide"
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Dots Navigation */}
          <div className="flex items-center gap-2.5">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full ${
                  index === currentIndex ? "bg-brand-burgundy w-8" : "bg-slate-300 w-2.5 hover:bg-rose-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ourprojects;

