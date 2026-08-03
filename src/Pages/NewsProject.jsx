import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import CustomButton from "../components/Button";

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

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data } = await apiClient.get('/projects');
        // Show all projects directly without deduplicating by city
        setProjects(data);
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
    <div className="section-shell pt-6 pb-14 sm:pt-8 sm:pb-16">
      <div className="text-center mb-10">
        <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-[#3d1e24] mb-2">GREEN-VIJAYA DEVELOPMENTS</p>
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
          Prime Landmark Projects & <span className="text-[#3d1e24]">Real Estate Townships</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Explore Green-Vijaya&apos;s strategic property developments engineered for luxury living, vibrant commercial growth, and high-value architectural excellence across premier urban destinations.
        </p>
      </div>

      <div className="relative sm:mx-0 px-2 sm:px-0">
        <div className="overflow-hidden py-4">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
          >
            {projects.map((project, index) => (
              <div
                key={project._id || project.id || index}
                className="w-full px-3"
                style={{ minWidth: `${100 / visibleCards}%` }}
              >
                <div className="bg-white border border-slate-200/80 rounded-lg overflow-hidden  transition-all duration-300">
                  <div className="relative h-52 overflow-hidden">
                    {Array.isArray(project.images) && project.images.length > 0 ? (
                      <img
                        src={project.images[0]}
                        alt={project.projectBuildingName || "Project"}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-semibold text-sm">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-60" />
                    <span className={`absolute bottom-3 left-3 font-black text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm backdrop-blur-md border ${project.status === 'Active' ? 'bg-green-500/90 text-white border-green-400' :
                      project.status === 'Completed' ? 'bg-blue-500/90 text-white border-blue-400' :
                        'bg-[#ec9322]/90 text-white border-[#ec9322]'
                      }`}>
                      {project.status || "Active"}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/95 text-slate-800 font-bold text-[10px] uppercase tracking-wider px-3 py-1.5 rounded-full shadow-sm">
                      {project.city}
                    </span>
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-bold text-slate-950 mb-2 truncate" title={project.projectBuildingName || project.title}>
                      {project.projectBuildingName || project.title || "Exclusive Project"}
                    </h3>

                    <p className="text-slate-600 text-sm mb-5 leading-relaxed font-normal h-10 overflow-hidden text-ellipsis">
                      {project.description || "Explore exclusive real estate opportunities in this premium development."}
                    </p>
                    <CustomButton
                      onClick={() => navigate(`/project/${project.city}`)}
                      text="View City Projects"
                      className="w-full justify-center"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Normal Navigation Controls - Static Left and Right side buttons below cards without floating overlays */}
        <div className="flex items-center justify-between mt-6 px-3">
          <button
            onClick={prevSlide}
            aria-label="Previous slide"
            className="flex items-center gap-2 bg-slate-100 border border-slate-200 px-5 py-2.5 rounded-full font-bold text-sm text-[#3d1e24] hover:bg-[#3d1e24] hover:text-white focus:outline-none"
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
                className={`h-2.5 rounded-full ${index === currentIndex ? "bg-[#3d1e24] w-8" : "bg-slate-300 w-2.5 hover:bg-rose-300"}`}
              />
            ))}
          </div>

          <button
            onClick={nextSlide}
            aria-label="Next slide"
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

export default NewsProject;
