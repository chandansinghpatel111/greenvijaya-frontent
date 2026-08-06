import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import apiClient from "../api/apiClient";
import { Search as SearchIcon, MapPin, Building, ArrowRight, ShieldCheck } from "lucide-react";
import { getImageUrl } from "../utils/imageUtils";

export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const initialQuery = searchParams.get("query") || "";
  const initialType = searchParams.get("type") || "";

  const [projects, setProjects] = useState([]);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(initialQuery);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [projectsRes, propertiesRes] = await Promise.all([
          apiClient.get('/projects'),
          apiClient.get('/properties')
        ]);
        setProjects(projectsRes.data || []);
        setProperties(propertiesRes.data || []);
      } catch (error) {
        console.error("Error fetching search data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const filteredProjects = projects.filter(project => {
    const matchesSearch = 
      (project.projectBuildingName && project.projectBuildingName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (project.city && project.city.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = !initialType || 
      (project.propertyCategory && project.propertyCategory.toLowerCase() === initialType.toLowerCase()) ||
      (project.propertyType && project.propertyType.toLowerCase() === initialType.toLowerCase());

    return matchesSearch && matchesType;
  });

  const filteredProperties = properties.filter(prop => {
    const title = (prop.title || prop.projectBuildingName || "").toLowerCase();
    const city = (prop.city || prop.locality || "").toLowerCase();
    const ownerName = (prop.postedBy?.name || "").toLowerCase();
    
    const matchesSearch = 
      title.includes(searchTerm.toLowerCase()) || 
      city.includes(searchTerm.toLowerCase()) ||
      ownerName.includes(searchTerm.toLowerCase());
    
    const matchesType = !initialType || 
      (prop.propertyCategory && prop.propertyCategory.toLowerCase() === initialType.toLowerCase()) ||
      (prop.propertyType && prop.propertyType.toLowerCase() === initialType.toLowerCase());

    return matchesSearch && matchesType;
  });

  const combinedResults = [
    ...filteredProjects.map(p => ({ ...p, resultType: 'project' })),
    ...filteredProperties.map(p => ({ ...p, resultType: 'property' }))
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-6 sm:pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Search Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-[#d4af37]/30 p-6 mb-10 flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full relative flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-[#d4af37]" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by city or project name..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-[#d4af37]/40 focus:outline-none focus:ring-2 focus:ring-[#d4af37]/30 focus:border-[#d4af37] transition-all bg-slate-50 text-brand-burgundy/90 placeholder:text-slate-400"
              />
            </div>
            <button 
              className="bg-gradient-to-r from-[#e3b838] to-[#c29624] hover:from-[#d4af37] hover:to-[#b38f2d] text-brand-burgundy px-8 py-3 rounded-full font-extrabold transition-all duration-300 shadow-md shadow-yellow-900/20 active:scale-95 w-full sm:w-auto flex items-center justify-center gap-2"
            >
              <SearchIcon size={18} strokeWidth={2.5} />
              Search
            </button>
          </div>
        </div>

        {/* Header Text */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-burgundy mb-2">
            {searchTerm ? `Search Results for "${searchTerm}"` : "All Projects"}
          </h1>
          <p className="text-slate-500">
            {combinedResults.length} {combinedResults.length === 1 ? 'result' : 'results'} found
          </p>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-gold"></div>
          </div>
        ) : combinedResults.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {combinedResults.map(item => (
              <div key={item._id || item.id} className="bg-white rounded-[1.5rem] border border-slate-200/80 overflow-hidden hover:shadow-xl transition-all duration-300 group flex flex-col h-full">
                <div className="relative h-60 overflow-hidden">
                  {Array.isArray(item.images) && item.images.length > 0 && getImageUrl(item.images[0]) ? (
                    <img 
                      src={getImageUrl(item.images[0])} 
                      alt={item.title || item.projectBuildingName} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 flex items-center justify-center text-slate-400">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-brand-burgundy flex items-center gap-1.5 shadow-sm">
                    <ShieldCheck size={14} className="text-green-600" /> 
                    {item.resultType === 'project' ? 'Verified Project' : 'Verified Property'}
                  </div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-brand-burgundy mb-2 line-clamp-1">
                    {item.title || item.projectBuildingName || "Untitled"}
                  </h3>
                  <div className="flex items-center text-slate-500 mb-4 text-sm font-medium">
                    <MapPin size={16} className="mr-1 text-brand-gold" />
                    {item.locality ? `${item.locality}, ` : ''}{item.city || "Location Not Specified"}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-slate-100">
                    <button 
                      onClick={() => {
                        if (item.resultType === 'project') {
                          navigate(`/project/${item.city}`);
                        } else {
                          navigate(`/listing-detail?id=${item._id}`);
                        }
                      }}
                      className="w-full flex items-center justify-center gap-2 bg-slate-50 hover:bg-brand-burgundy text-brand-burgundy hover:text-white border border-slate-200 hover:border-brand-burgundy transition-colors py-2.5 rounded-xl font-bold text-sm"
                    >
                      View Details <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 border-dashed">
            <Building className="mx-auto h-12 w-12 text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-brand-burgundy mb-2">No projects found</h3>
            <p className="text-slate-500">We couldn't find any properties matching your search criteria.</p>
            <button 
              onClick={() => setSearchTerm("")}
              className="mt-6 text-brand-gold font-bold hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
