import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { motion } from "framer-motion";
import {
  Wifi, Building2, Dumbbell, ShieldCheck, Sparkle,
  Shield, SquareParking, Sun, HelpCircle
} from "lucide-react";

const amenityIcons = {
  "WiFi": <Wifi className="w-5 h-5 text-blue-600" />,
  "Parking": <SquareParking className="w-5 h-5 text-green-600" />,
  "Gym": <Dumbbell className="w-5 h-5 text-red-500" />,
  "Security": <ShieldCheck className="w-5 h-5 text-purple-600" />,
  "Lift": <Building2 className="w-5 h-5 text-yellow-600" />,
  "Power Backup": <Sparkle className="w-5 h-5 text-indigo-600" />,
  "24x7 Water": <Sun className="w-5 h-5 text-sky-600" />,
  "Fire Safety": <Shield className="w-5 h-5 text-rose-600" />,
};

export default function NewlyProjectD() {
  const navigate = useNavigate();
  const { projectId, city: selectedCity } = useParams();
  const [project, setProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (projectId) {
      const fetchProject = async () => {
        try {
          const res = await apiClient.get(`/projects/${projectId}`);
          if (res.data) {
            setProject(res.data);
          } else {
            console.log("No such project!");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
        }
      };

      fetchProject();
    }
  }, [projectId]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    );
  };

  const showProject =
    project?.city?.toLowerCase().trim() === selectedCity?.toLowerCase().trim();

  return (
    <div className="flex flex-col bg-gray-100 min-h-screen">
      {/* Top Navigation */}
      <div className="w-full bg-white shadow-md p-6">
        <button
          onClick={() => navigate("/")}
          className="text-blue-600 hover:underline"
        >
          &larr; Back to Listings
        </button>
      </div>

      <div className="p-6">
        {!project ? (
          <div className="text-gray-500">Loading project...</div>
        ) : !showProject ? (
          <div className="text-center text-gray-600 py-12">
            This project is not listed under <strong>{selectedCity}</strong>.
          </div>
        ) : (
          <>
            {/* Image Carousel */}
            <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg mb-10">
              {Array.isArray(project.images) && project.images.length > 0 ? (
                <>
                  <motion.img
                    key={currentImageIndex}
                    src={project.images[currentImageIndex]}
                    alt={`Project image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    initial={{ opacity: 0.5, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <button
                    onClick={handlePrevImage}
                    className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90"
                  >
                    ◀
                  </button>
                  <button
                    onClick={handleNextImage}
                    className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white bg-opacity-70 rounded-full p-2 shadow hover:bg-opacity-90"
                  >
                    ▶
                  </button>
                </>
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500 text-sm">
                  No Images Available
                </div>
              )}
            </div>

            {/* Project Details */}
            <div className="bg-white rounded-xl shadow-xl p-8">
              <h1 className="text-3xl font-bold text-[#134763] mb-4">
                {project.projectBuildingName || "Untitled Project"}
              </h1>
              <p><strong>Locality:</strong> {project.locality || "N/A"}</p>
              <p><strong>City:</strong> {project.city || "N/A"}</p>
              <p><strong>Price:</strong> ₹ {project.price || "N/A"}</p>
              <p><strong>Plot Area:</strong> {project.plotArea || "N/A"}</p>
              <div className="grid grid-cols-2 gap-4 mt-4">
                <p><strong>Listing Type:</strong> {project.listingType || "N/A"}</p>
                <p><strong>Category:</strong> {project.propertyCategory || "N/A"}</p>
                <p><strong>Property Type:</strong> {project.propertyType || "N/A"}</p>
                <p><strong>Facing:</strong> {project.facingType || "N/A"}</p>
              </div>

              {/* Amenities */}
              <div className="mt-6">
                <strong>Amenities:</strong>
                {Array.isArray(project.amenities) && project.amenities.length > 0 ? (
                  <ul className="mt-2 space-y-2">
                    {project.amenities.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-700">
                        {amenityIcons[item] || <HelpCircle className="w-5 h-5 text-gray-400" />}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 mt-2">No amenities listed.</p>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
