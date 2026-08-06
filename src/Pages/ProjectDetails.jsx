import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiClient from "../api/apiClient";
import { FaWhatsapp } from "react-icons/fa";
import { getImageUrl } from "../utils/imageUtils";

const ProjectDetails = () => {
  const { city } = useParams();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleWhatsAppBooking = (project) => {
    const phoneNumber = "919450058323";
    const message = `Hello, I am interested in booking this project:\n\n*Project:* ${project.projectBuildingName}\n*City:* ${project.city}\n*Price:* ₹${project.price || "N/A"}\n*Area:* ${project.plotArea || "N/A"}\n\nPlease share more details.`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  useEffect(() => {
    const fetchCityProjects = async () => {
      try {

        const res = await apiClient.get('/projects');
        const allProjects = res.data;

        const cityProjects = allProjects.filter(
          (project) => project.city?.trim().toLowerCase() === city.toLowerCase()
        );

        setProjects(cityProjects);
      } catch (error) {
        console.error("Error fetching city projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCityProjects();
  }, [city]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (projects.length === 0) return <div className="p-8 text-center">No projects found in {city}</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-4 sm:pt-6 pb-12">
      <div className="text-center mb-10 sm:mb-12">
        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
          Explore Premium Properties in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d1e24] to-[#753441]">{city}</span>
        </h1>
        <p className="mt-4 text-slate-600 font-medium max-w-2xl mx-auto text-sm sm:text-base">
          Discover our exclusive portfolio of meticulously planned residential plots, commercial spaces, and luxury living opportunities tailored for your aspirations in {city}.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="border rounded-lg overflow-hidden shadow-md bg-white">
            {/* Image Block */}
            {Array.isArray(project.images) && project.images.length > 0 && getImageUrl(project.images[0]) ? (
              <img
                src={getImageUrl(project.images[0])}
                alt={project.projectBuildingName}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="h-48 bg-gray-200 flex items-center justify-center text-sm text-gray-600">
                No Image
              </div>
            )}

            {/* Text Details */}
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-1">{project.projectBuildingName}</h2>
              <p className="text-gray-500 mb-2">{project.city}</p>
              <p><strong>Price:</strong> ₹ {project.price || "N/A"}</p>
              <p><strong>Plot Area:</strong> {project.plotArea || "N/A"}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 text-sm">
                <p><strong>Listing Type:</strong> {project.listingType || "N/A"}</p>
                <p><strong>Category:</strong> {project.propertyCategory || "N/A"}</p>
                <p><strong>Property Type:</strong> {project.propertyType || "N/A"}</p>
                <p><strong>Facing:</strong> {project.facingType || "N/A"}</p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <button
                  onClick={() => handleWhatsAppBooking(project)}
                  className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white font-bold py-3 px-4 rounded-xl transition-all shadow-[0_4px_14px_rgba(37,211,102,0.3)] flex items-center justify-center gap-2"
                >
                  <FaWhatsapp size={20} />
                  Enquire on WhatsApp
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectDetails;
