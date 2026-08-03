import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import apiClient from '../api/apiClient'; // or appropriate path
import { motion } from "framer-motion";

// Icons from lucide-react
import {
  Wifi,
  Building2,
  Dumbbell,
  ShieldCheck,
  Sparkle,
  Shield,
  SquareParking,
  Sun,
  HelpCircle
} from "lucide-react";

// Amenity name to icon mapping
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
  const location = useLocation();
  const { projectId } = useParams();
  const [project, setProject] = useState(location.state?.project || null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!project && projectId) {
      const fetchProject = async () => {
        try {
          const projectRef = doc(db, "NewlyProject", projectId);
          const projectSnap = await getDoc(projectRef);
          if (projectSnap.exists()) {
            setProject({ id: projectSnap.id, ...projectSnap.data() });
          } else {
            console.log("No such project!");
          }
        } catch (error) {
          console.error("Error fetching project:", error);
        }
      };
      fetchProject();
    }
  }, [projectId, project]);

  if (!project) {
    return <div className="text-center py-12">Loading project details...</div>;
  }

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

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <button
        onClick={() => navigate("/")}
        className="mb-6 text-blue-600 hover:underline"
      >
        &larr; Back to Listings
      </button>

      {/* Image Carousel */}
      <div className="relative w-full max-w-5xl mx-auto h-[400px] rounded-xl overflow-hidden shadow-lg mb-10">
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
            {/* Arrows */}
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

      {/* Details Section */}
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#134763] mb-4">
        {project.projectBuildingName || "Untitled Project"}
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Locality:</strong> {project.locality || "Location not available"}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>City:</strong> {project.city || "City not available"}
        </p>
        <p className="text-xl text-gray-800 font-bold mb-4">
          <strong>Price:</strong> ₹ {project.price || "Not available"}
        </p>
        <p className="text-lg text-gray-600 mb-2">
          <strong>Plot Area:</strong> {project?.plotArea || "Not available"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
          <div><strong>Listing Type:</strong> {project?.listingType || "N/A"}</div>
          <div><strong>Category:</strong> {project?.propertyCategory || "N/A"}</div>
          <div><strong>Property Type:</strong> {project?.propertyType || "N/A"}</div>
          <div><strong>Facing Type:</strong> {project?.facingType || "N/A"}</div>
        </div>

        {/* Amenities with icons */}
        <div className="mt-6">
          <strong>Amenities:</strong>
          {Array.isArray(project?.amenities) && project.amenities.length > 0 ? (
            <ul className="mt-2 space-y-2">
              {project.amenities.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  {amenityIcons[item] || <HelpCircle className="w-5 h-5 text-gray-400" />}
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 mt-2">Not available</p>
          )}
        </div>
      </div>
    </div>
  );
}
