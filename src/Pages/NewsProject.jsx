import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
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

        const querySnapshot = await getDocs(collection(db, "NewlyProjectunique"));



        const allData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Filter by valid cities
        const filtered = allData.filter(project =>
          validCities.includes(project.city?.trim())
        );

        // Get only one project per city
        const uniqueCityProjects = [];
        const seenCities = new Set();

        for (const project of filtered) {
          const city = project.city?.trim();
          if (city && !seenCities.has(city)) {
            seenCities.add(city);
            uniqueCityProjects.push(project);
          }
        }

        setProjects(uniqueCityProjects);
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
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
          Prime Landmark Projects & <span className="text-[#3d1e24]">Real Estate Townships</span>
        </h2>
        <p className="mt-3 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto font-normal">
          Explore Green-Vijaya&apos;s strategic property developments engineered for luxury living, vibrant commercial growth, and high-value architectural excellence across premier urban destinations.
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
                <div className="bg-white border border-[#3d1e24]/40 hover:border-[#3d1e24] rounded-lg overflow-hidden  transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative h-52 overflow-hidden">
                    {Array.isArray(project.imageUrls) && project.imageUrls.length > 0 ? (
                      <img
                        src={project.imageUrls[0]}
                        alt={project.projectBuildingName || "Project"}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400 font-semibold text-sm">
                        No Image Available
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-60" />
                    <span className="absolute bottom-3 left-3 bg-white/95 text-[#3d1e24] font-extrabold text-xs px-3 py-1.5 rounded-full shadow-sm">
                      Verified City
                    </span>
                  </div>
                  <div className="p-6 text-left">
                    <h3 className="text-2xl font-bold text-slate-950 mb-2">{project.city}</h3>

                    <p className="text-slate-600 text-sm mb-5 leading-relaxed font-normal">
                      {getShortDescription(project.projectBuildingName || "Explore exclusive real estate opportunities in this city.")}
                    </p>
                    <CustomButton
                      onClick={() => navigate(`/project/${project.city}`)}
                      text="Learn More"
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
