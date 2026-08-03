import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import {
  MapPin, Building, Home, ArrowLeft, CheckCircle, Image as ImageIcon, Map, IndianRupee
} from 'lucide-react';

const ProjectDetails = () => {
  const { city } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCityProjects = async () => {
      try {
        const { data } = await apiClient.get('/projects');

        const cityProjects = data.filter(
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-[#ec9322] dark:border-t-[#ec9322] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
        <Building className="w-20 h-20 text-slate-300 dark:text-slate-700 mb-6" />
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">No Projects Found in {city}</h2>
        <button onClick={() => navigate("/")} className="px-6 py-2 bg-gradient-to-r from-[#753441] to-[#ec9322] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98]">
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-screen px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="mb-10 text-center relative">
          <button
            onClick={() => navigate("/")}
            className="absolute left-0 top-1/2 group flex items-center gap-2 text-slate-500 hover:text-[#753441] dark:text-slate-400 dark:hover:text-rose-400 font-bold transition-colors bg-white/50 dark:bg-slate-900/50 p-2 rounded-full shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 mt-3" />
          </button>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight capitalize">
            Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#753441] to-[#ec9322]">{city}</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium mt-3 uppercase tracking-[0.2em] text-sm">
            Premium Real Estate Projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div key={project._id || project.id} className="group bg-white dark:bg-slate-900 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)]">

              {/* Image Hero */}
              <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                {Array.isArray(project.images) && project.images.length > 0 ? (
                  <img
                    src={project.images[0]}
                    alt={project.projectBuildingName || project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                    <ImageIcon className="w-12 h-12 mb-2 opacity-30" />
                    <span className="font-semibold text-sm">No Image</span>
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 pointer-events-none transition-opacity duration-300"></div>

                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg backdrop-blur-md border ${project.status === 'Active' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                    project.status === 'Completed' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      'bg-orange-500/20 text-orange-300 border-orange-500/30'
                    }`}>
                    {project.status || "Active"}
                  </span>
                </div>

                {/* Title overlay */}
                <div className="absolute bottom-6 left-6 pr-6">
                  <h2 className="text-3xl font-black text-white mb-2 leading-tight">
                    {project.projectBuildingName || project.title}
                  </h2>
                  <div className="flex items-center gap-2 text-slate-200 font-medium text-sm">
                    <MapPin className="w-4 h-4 text-[#ec9322]" />
                    <span>{project.locality}, {project.city}</span>
                  </div>
                </div>
              </div>

              {/* Content Details */}
              <div className="p-8">

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
                      <IndianRupee className="w-4 h-4 text-[#ec9322]" /> Starting Price
                    </div>
                    <span className="text-xl font-black text-slate-900 dark:text-white">
                      {project.price ? `₹${project.price.toLocaleString('en-IN')}` : "On Request"}
                    </span>
                  </div>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase">
                      <Map className="w-4 h-4 text-[#ec9322]" /> Plot Area
                    </div>
                    <span className="text-lg font-black text-slate-900 dark:text-white">
                      {project.plotArea || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mb-8">
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>

                {/* Amenities */}
                {Array.isArray(project.amenities) && project.amenities.length > 0 && (
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider mb-4 border-b border-slate-100 dark:border-slate-800 pb-2">Top Amenities</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.amenities.slice(0, 4).map((amenity, idx) => (
                        <span key={idx} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-lg border border-slate-200 dark:border-slate-700">
                          <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                          {amenity}
                        </span>
                      ))}
                      {project.amenities.length > 4 && (
                        <span className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg">
                          +{project.amenities.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* CTA Button */}
                <button className="mt-8 w-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-[#ec9322] dark:hover:bg-[#ec9322] dark:hover:text-white py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-colors duration-300">
                  View Full Details
                </button>
              </div>
            </div>
          ))}

          {/* Placeholder / CTA Card for empty grid slots */}
          {projects.length % 2 !== 0 && (
            <div className="group bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-900 dark:to-slate-800/50 rounded-[2rem] p-8 sm:p-12 flex flex-col justify-center items-center text-center border-2 border-dashed border-slate-200 dark:border-slate-800 transition-all duration-500 hover:-translate-y-1 hover:border-[#ec9322] dark:hover:border-rose-500 min-h-[400px]">
              <div className="w-20 h-20 bg-[#fdf8f3] dark:bg-slate-800 rounded-full flex items-center justify-center mb-3 shadow-inner">
                <Building className="w-10 h-10 text-[#ec9322] dark:text-rose-400" />
              </div>
              <h2 className="text-3xl font-black text-slate-900 dark:text-white">
                More Projects Coming Soon to {city}
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium mb-8 max-w-sm">
                Green-Vijaya is continuously acquiring prime locations. Register your interest to get exclusive early access to our next luxury township in this area!
              </p>
              <button
                onClick={() => navigate("/contact")}
                className="bg-white dark:bg-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 hover:border-[#ec9322] dark:hover:border-[#ec9322] px-8 py-4 rounded-xl font-black text-sm uppercase tracking-wider transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Register Interest
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
