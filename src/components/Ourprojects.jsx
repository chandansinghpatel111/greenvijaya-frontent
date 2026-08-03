import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { services } from "../data/ServiceOur";
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
        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 border border-rose-200 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#3d1e24] mb-3 shadow-sm">
          <Sparkles size={14} className="text-[#753441]" />
          PRESTIGE DEVELOPMENTS
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-950 tracking-tight">
          Featured Projects to <span className="text-[#3d1e24]">Explore</span>
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
                    <span className="absolute top-4 right-4 rounded-full bg-[#3d1e24]/90 backdrop-blur-md px-3.5 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase border border-white/20 shadow-md">
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
                      <h3 className="text-xl font-extrabold text-slate-950 mb-2.5 group-hover:text-[#3d1e24] transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 font-normal line-clamp-3">
                        {service.description}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <CustomButton
                        onClick={() => navigate(`/projects/${service.url}`)}
                        text="Explore Property"
                        className="w-full"
                      />
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
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-[#3d1e24] hover:bg-[#3d1e24] hover:text-white focus:outline-none"
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
                  index === currentIndex ? "bg-[#3d1e24] w-8" : "bg-slate-300 w-2.5 hover:bg-rose-300"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next Slide"
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-[#3d1e24] hover:bg-[#3d1e24] hover:text-white focus:outline-none"
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

