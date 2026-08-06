import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, MapPin, ArrowRight, CheckCircle2, Ruler, Sofa, Layers } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { getImageUrl } from "../utils/imageUtils";

const PostPropertyListing = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [Properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await apiClient.get('/properties');
        setProperties(res.data);
      } catch (error) {
        console.error("Error fetching Properties: ", error);
      }
    };

    fetchProperties();
  }, []);

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

  const filteredProperties = Properties; // backend already returns Approved properties
  const totalSlides = Math.max(1, filteredProperties.length - visibleCards + 1);

  const nextSlide = () => {
    if (totalSlides > 1) {
      setCurrentIndex((current) => (current + 1) % totalSlides);
    }
  };

  const prevSlide = () => {
    if (totalSlides > 1) {
      setCurrentIndex((current) => (current - 1 + totalSlides) % totalSlides);
    }
  };

  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  const formatPrice = (priceStr) => {
    if (!priceStr) return "Price on Request";
    if (isNaN(priceStr)) return priceStr;
    const price = Number(priceStr);
    if (price >= 10000000) return `₹ ${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹ ${(price / 100000).toFixed(2)} Lac`;
    return `₹ ${price.toLocaleString('en-IN')}`;
  };

  const handleWhatsAppEnquiry = (project) => {
    const phoneNumber = project.postedBy?.mobileNumber || "919450058323";
    const message = `Hello, I am interested in your property:\n\n*Property:* ${project.ProjectBuildingName || project.title || "Untitled"}\n*Location:* ${project.City || project.location?.city || project.locality || "Not specified"}\n*Price:* ₹ ${project.Price || project.price || "N/A"}\n\nPlease share more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="bg-white relative">
      <motion.div
        ref={ref}
        className="section-shell pt-8 sm:pt-12 pb-16 sm:pb-20 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Header Section */}
        <div className="mb-14 flex flex-col lg:flex-row lg:items-center lg:justify-between border-b border-brand-burgundy/10 pb-10 gap-8">
          <div className="max-w-2xl text-left">

            <h2 className="text-4xl font-black text-brand-burgundy sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">
              Explore Premium Properties to <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy to-brand-gold">Buy, Sell & Rent</span>
            </h2>
            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Step into a world of real estate excellence. Whether you are looking to buy your dream home, rent a luxury apartment, or sell a commercial space, our meticulously curated collection offers unparalleled options for every need.
            </p>
          </div>

          {/* Right Side Image */}
          <div className="w-full lg:w-[400px] xl:w-[500px] shrink-0">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-[#3d1e24]/20 border border-slate-200 aspect-[16/9] lg:aspect-[4/3] group">
              <img
                src="/image99.jpg"
                alt="Luxury Masterpiece"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0e]/80 via-transparent to-transparent opacity-80"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-rose-200">Featured Masterpiece</p>
                <p className="text-lg font-bold">A glimpse of perfection</p>
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="relative -mx-2 sm:mx-0 px-2 sm:px-0">
          <div className="overflow-hidden py-4 px-2">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
              style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
            >
              {filteredProperties.map((project, index) => (
                <div
                  key={project.id || index}
                  className="w-full shrink-0 px-3 sm:px-4"
                  style={{ width: `${100 / visibleCards}%` }}
                >
                  <motion.div
                    className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-slate-200/80 bg-white shadow-lg shadow-slate-200/50 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-900/10 hover:border-blue-300"
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    {/* Image Section */}
                    <div className="relative mx-3 mt-3 aspect-[4/3] overflow-hidden rounded-md">
                      {Array.isArray(project.images) && project.images.length > 0 && getImageUrl(project.images[0]) ? (
                        <img
                          src={getImageUrl(project.images[0])}
                          alt={project.ProjectBuildingName || project.projectBuildingName || project.title || "Property"}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-slate-200 text-slate-500">
                          <span className="font-medium">No Image Available</span>
                        </div>
                      )}

                      {/* Gradient Overlay for Text Readability */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                      {/* Top Badges */}
                      <div className="absolute left-4 top-4 flex gap-2">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#013b9a] shadow-sm backdrop-blur-md">
                          <CheckCircle2 size={14} className="text-[#3866f1]" />
                          {project.propertyCategory || "Premium"}
                        </span>
                      </div>

                      {/* Bottom Image Overlay Content */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div className="rounded-md bg-white/95 px-4 py-2 font-bold text-brand-burgundy shadow-lg backdrop-blur-md">
                          {formatPrice(project.price)}
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="flex flex-1 flex-col p-6 pt-5">
                      <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-brand-gold">
                        <MapPin size={16} />
                        <span className="truncate">{project.Locality || project.locality || project.city || "Prime location"}</span>
                      </div>

                      <h3 className="mb-4 line-clamp-1 text-2xl font-bold text-brand-burgundy group-hover:text-brand-burgundy transition-colors">
                        {project.ProjectBuildingName || project.projectBuildingName || project.title || "Exclusive Property"}
                      </h3>

                      {/* Property Details Pills */}
                      <div className="mb-6 flex flex-wrap gap-2">
                        {(project.plotArea || project.totalFloors) && (
                          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                            <Ruler size={16} className="text-brand-gold" />
                            {project.plotArea ? `${project.plotArea} sq.ft` : `${project.totalFloors} Floors`}
                          </div>
                        )}
                        {project.furnishing && (
                          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                            <Sofa size={16} className="text-brand-gold" />
                            {project.furnishing}
                          </div>
                        )}
                        {(project.floorNumber) && (
                          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700">
                            <Layers size={16} className="text-brand-gold" />
                            Floor {project.floorNumber}
                          </div>
                        )}

                        {/* Fallback if no specific details exist */}
                        {!project.plotArea && !project.furnishing && !project.floorNumber && (
                          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                            Premium Selection
                          </div>
                        )}
                      </div>

                      <div className="mt-auto border-t border-slate-100 pt-3 flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/listing-detail`, { state: { project } })}
                          className="group/btn flex w-full items-center justify-between rounded-xl bg-slate-50 px-4 py-2.5 text-sm font-semibold text-brand-burgundy/90 transition-all hover:bg-rose-50 hover:text-brand-burgundy hover:shadow-sm"
                        >
                          View Property Details
                          <ArrowRight size={18} className="transition-transform group-hover/btn:translate-x-1.5 text-brand-burgundy" />
                        </button>
                        <button
                          onClick={() => handleWhatsAppEnquiry(project)}
                          className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#3d1e24] hover:bg-[#3d1e24] px-4 py-2.5 text-sm font-bold text-white transition-all shadow-[0_4px_10px_rgba(37,211,102,0.3)] hover:shadow-[0_6px_15px_rgba(37,211,102,0.4)]"
                        >
                          <FaWhatsapp size={18} />
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </div>
          </div>

          {/* Normal Navigation Controls - Static Left and Right side buttons below cards matching NewsProject.jsx */}
          <div className="flex items-center justify-between mt-1">
            <button
              onClick={prevSlide}
              aria-label="Previous slide"
              className="flex items-center gap-2 bg-[#e0a973] border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none transition-all duration-300 active:scale-95"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Previous</span>
            </button>

            {/* Dots */}
            <div className="flex items-center gap-2.5">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-brand-burgundy w-8" : "bg-slate-300 w-2.5 hover:bg-rose-300"
                    }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              aria-label="Next slide"
              className="flex items-center gap-2 bg-[#e0a973] border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none transition-all duration-300 active:scale-95"
            >
              <span>Next</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PostPropertyListing;

