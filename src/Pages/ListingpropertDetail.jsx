import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import { MapPin, Maximize, Compass, Grid, CheckCircle2, Phone, Mail, User, MessageCircle, ArrowLeft } from "lucide-react";
import { getImageUrl } from "../utils/imageUtils";

export default function ProjectsDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const queryId = searchParams.get('id');
    const { projectId } = useParams();

    const actualId = projectId || queryId;

    const [project, setProject] = useState(location.state?.project || null);
    const [loading, setLoading] = useState(!project && actualId);

    useEffect(() => {
        if (!project && actualId) {
            const fetchProject = async () => {
                try {
                    const res = await apiClient.get(`/properties/${actualId}`);
                    setProject(res.data);
                } catch (error) {
                    console.error("Error fetching project:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        }
    }, [actualId, project]);

    if (loading) {
        return <div className="text-center py-12">Loading project details...</div>;
    }

    if (!project) {
        return <div className="text-center py-12">Project not found</div>;
    }

    const listingOwner = project.postedBy; // backend populates postedBy
    const mobileNumber = listingOwner?.mobileNumber || "Not provided";
    const userRole = listingOwner?.role || "Owner";

    const handleWhatsAppEnquiry = () => {
        const phoneNumber = mobileNumber !== "Not provided" ? mobileNumber : "919450058323";
        const message = `Hello, I am interested in your property:\n\n*Property:* ${project.ProjectBuildingName || project.title || "Untitled"}\n*Location:* ${project.City || project.location?.city || "Not specified"}\n*Price:* ₹ ${project.Price || project.price || "N/A"}\n\nPlease share more details.`;
        window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
    };

    return (
        <div className="bg-[#f8f9fa] min-h-screen pb-20 pt-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-slate-500 hover:text-[#753441] font-semibold transition-colors"
                >
                    <ArrowLeft size={18} /> Back to Listings
                </button>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                        
                        {/* Title & Header Info */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                                <div>
                                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#d4af37]/10 text-[#d4af37] font-bold text-xs uppercase tracking-wider mb-4">
                                        <CheckCircle2 size={14} /> Verified {project.propertyType || "Property"}
                                    </div>
                                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 mb-3 tracking-tight">
                                        {project.ProjectBuildingName || project.title || "Untitled Property"}
                                    </h1>
                                    <div className="flex items-center gap-2 text-slate-500 font-medium">
                                        <MapPin size={18} className="text-[#753441]" />
                                        {project.Locality || project.locality || "Locality not available"}, {project.City || project.location?.city || "City not available"}
                                    </div>
                                </div>
                                <div className="text-left md:text-right">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Asking Price</p>
                                    <p className="text-3xl sm:text-4xl text-[#753441] font-black">
                                        {`₹ ${Number(project.Price || project.price || 0).toLocaleString('en-IN')}`}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Image Gallery */}
                        <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-slate-100">
                            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-3xl overflow-hidden">
                                {Array.isArray(project.images) && project.images.length > 0 && getImageUrl(project.images[0]) ? (
                                    <img
                                        src={getImageUrl(project.images[0])}
                                        alt={project.ProjectBuildingName || project.title || "Property Image"}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-slate-100 flex flex-col items-center justify-center text-slate-400">
                                        <Grid size={48} className="mb-4 opacity-20" />
                                        <span className="font-medium">No images available for this property</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Property Overview */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Property Overview</h2>
                            
                            {project.description && (
                                <div className="mb-8 pb-8 border-b border-slate-100">
                                    <p className="text-slate-600 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="text-slate-400 mb-2"><Maximize size={24} /></div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Plot Area</p>
                                    <p className="font-bold text-slate-900">{project.PlotArea || project.plotArea || "Not specified"}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="text-slate-400 mb-2"><Grid size={24} /></div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Category</p>
                                    <p className="font-bold text-slate-900">{project.propertyCategory || "Not specified"}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="text-slate-400 mb-2"><Compass size={24} /></div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Facing</p>
                                    <p className="font-bold text-slate-900">{project.facingType || "Not specified"}</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                                    <div className="text-slate-400 mb-2"><CheckCircle2 size={24} /></div>
                                    <p className="text-sm font-semibold text-slate-500 mb-1">Listing Type</p>
                                    <p className="font-bold text-slate-900">{project.listingType || "Not specified"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
                            <h2 className="text-2xl font-bold text-slate-900 mb-6">Amenities & Features</h2>
                            {Array.isArray(project.amenities) && project.amenities.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {project.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 text-slate-700 font-medium p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                            <div className="h-2 w-2 rounded-full bg-[#d4af37]"></div>
                                            {amenity}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-slate-500 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-center font-medium">
                                    No specific amenities listed for this property.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Owner Information */}
                    <aside className="w-full lg:w-1/3 xl:w-[400px]">
                        <div className="bg-white rounded-[2rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06)] border border-slate-100 sticky top-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="h-16 w-16 bg-gradient-to-tr from-[#3d1e24] to-[#753441] rounded-full flex items-center justify-center text-white shadow-inner">
                                    <User size={32} />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900">Owner Info</h2>
                                    <p className="text-[#d4af37] font-bold text-sm uppercase tracking-wider">{userRole}</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {listingOwner ? (
                                    <>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-slate-50 p-3 rounded-xl text-slate-400">
                                                <User size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500 mb-0.5">Name</p>
                                                <p className="font-bold text-slate-900">{listingOwner.name || "Not provided"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-slate-50 p-3 rounded-xl text-slate-400">
                                                <Mail size={20} />
                                            </div>
                                            <div className="overflow-hidden">
                                                <p className="text-sm font-semibold text-slate-500 mb-0.5">Email</p>
                                                <p className="font-bold text-slate-900 truncate">{listingOwner.email || "Not provided"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-start gap-4">
                                            <div className="bg-slate-50 p-3 rounded-xl text-slate-400">
                                                <Phone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-slate-500 mb-0.5">Phone</p>
                                                <p className="font-bold text-slate-900">{mobileNumber}</p>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-6">
                                        <p className="text-slate-500 font-medium">Owner details are currently unavailable.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <button 
                                    onClick={handleWhatsAppEnquiry}
                                    className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#128C7E] text-white py-4 rounded-xl font-bold transition-all shadow-[0_8px_20px_rgba(37,211,102,0.3)] hover:-translate-y-1 active:translate-y-0"
                                >
                                    <MessageCircle size={20} /> Enquire on WhatsApp
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}
