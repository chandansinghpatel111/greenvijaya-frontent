import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import CustomButton from "../components/Button";
import { getImageUrl } from "../utils/imageUtils";

const NewsProject = () => {
  const [projects, setProjects] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const navigate = useNavigate();

  const validCities = ["Lucknow", "Noida", "Gurugram", "Kanpur", "Varanasi"];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleWhatsAppEnquiry = (project) => {
    const phoneNumber = "919450058323";
    const message = `Hello, I am interested in your project:\n\n*Project:* ${project.projectBuildingName || "Untitled"}\n*City:* ${project.city || "Not specified"}\n\nPlease share more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const res = await apiClient.get('/projects');
        const allData = res.data;

        // Filter by valid cities (optional if we just want all projects)
        // If the user wants all projects, we just set all projects.
        // I will just use `allData` directly or keep the valid city filter if needed.
        // Let's just set all active projects.
        setProjects(allData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const getShortDescription = (text = "") => {
    const words = text.split(" ");
    return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  };

  const totalSlides = Math.max(0, projects.length - visibleCards + 1);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= totalSlides - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? totalSlides - 1 : prev - 1));
  };

  return (
    <div className="section-shell pt-4 sm:pt-6 pb-14 sm:pb-16">
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-5xl font-bold text-brand-burgundy tracking-tight">
          Prime Landmark Projects & <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-burgundy to-brand-gold">Real Estate Townships</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Explore Green-Vijaya&apos;s strategic projects developments engineered for luxury living, vibrant commercial growth, and high-value architectural excellence across premier urban destinations.
        </p>
      </div>

      <div className="relative -mx-2 sm:mx-0 px-2 sm:px-0">
        <div className="overflow-hidden py-4 px-2">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="w-full px-3"
                style={{ minWidth: `${100 / visibleCards}%` }}
              >
                <div className="bg-white border border-brand-burgundy/40 hover:border-brand-burgundy rounded-lg overflow-hidden  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-64 overflow-hidden">
                    {Array.isArray(project.images) && project.images.length > 0 && getImageUrl(project.images[0]) ? (
                      <img
                        src={getImageUrl(project.images[0])}
                        alt={project.projectBuildingName || "Project"}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-semibold text-sm">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-3 bg-white/95 text-brand-burgundy font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                      <MapPin size={14} />
                      {project.city || "Verified Project"}
                    </span>
                  </div>
                  <div className="p-4 text-left flex flex-col h-full justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-brand-burgundy line-clamp-1">{project.projectBuildingName || project.title || "Exclusive Project"}</h3>
                      <p className="text-slate-500 text-sm mb-4">{project.city}</p>

                      <div className="space-y-1 mb-2 text-sm text-slate-700">
                        <p><strong>Price:</strong> ₹ {project.price || "N/A"}</p>
                        <p><strong>Plot Area:</strong> {project.plotArea || "N/A"}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 rounded-lg border border-slate-100">
                        <p><strong>Listing Type:</strong><br />{project.listingType || "N/A"}</p>
                        <p><strong>Category:</strong><br />{project.propertyCategory || "N/A"}</p>
                        <p><strong>Property Type:</strong><br />{project.propertyType || "N/A"}</p>
                        <p><strong>Facing:</strong><br />{project.facingType || "N/A"}</p>
                      </div>

                      {/* <p className="text-slate-600 text-sm mb-2 leading-relaxed font-normal h-10 overflow-hidden text-ellipsis">
                        {project.description || "Explore exclusive real estate opportunities in this city."}
                      </p> */}
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-auto pt-2 border-t border-slate-100">
                      <CustomButton
                        onClick={() => navigate(`/project/${project.city}`)}
                        text="Learn More"
                        className="w-full justify-center py-2"
                      />
                      <button
                        onClick={() => handleWhatsAppEnquiry(project)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-burgundy to-brand-gold text-white font-bold py-2 px-4 rounded-full transition-all shadow-md hover:shadow-lg hover:opacity-90"
                      >
                        <FaWhatsapp size={18} />
                        Enquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Normal Navigation Controls - Static Left and Right side buttons below cards without floating overlays */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex items-center gap-1 bg-slate-100 border border-slate-200 py-2 px-1 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2.5 rounded-full ${index === currentIndex ? "bg-brand-burgundy w-8" : "bg-slate-300 w-2.5 hover:bg-rose-300"}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
            className="flex items-center gap-1 bg-slate-100 border border-slate-200 px-2 py-2 rounded-full font-bold text-sm text-brand-burgundy hover:bg-brand-burgundy hover:text-white focus:outline-none"
          >
            <span>Next</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsProject;
