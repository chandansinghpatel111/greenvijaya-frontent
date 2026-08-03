import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import apiClient from '../api/apiClient';
import {
    MapPin, Building, Home, Compass, Phone,
    ArrowLeft, CheckCircle, X, User, Mail
} from 'lucide-react';

export default function ProjectsDetailPage() {
    const navigate = useNavigate();
    const location = useLocation();
    const { projectId } = useParams();
    const [project, setProject] = useState(location.state?.project || null);
    const [loading, setLoading] = useState(!location.state?.project);
    const [showModal, setShowModal] = useState(false);
    const [enquiryForm, setEnquiryForm] = useState({ name: '', email: '', phone: '', message: '' });
    const [enquiryStatus, setEnquiryStatus] = useState('');

    const handleEnquirySubmit = async (e) => {
        e.preventDefault();
        setEnquiryStatus('Submitting...');
        try {
            await apiClient.post('/enquiries', {
                name: enquiryForm.name,
                email: enquiryForm.email,
                phone: enquiryForm.phone,
                message: enquiryForm.message,
                property: project._id,
                broker: project.broker?._id
            });
            setEnquiryStatus('Success! We will contact you soon.');
            setTimeout(() => {
                setShowModal(false);
                setEnquiryStatus('');
                setEnquiryForm({ name: '', email: '', phone: '', message: '' });
            }, 3000);
        } catch (error) {
            console.error("Error submitting enquiry:", error);
            setEnquiryStatus('Failed to submit enquiry. Please try again.');
        }
    };

    useEffect(() => {
        if (!project && projectId) {
            const fetchProject = async () => {
                try {
                    const res = await apiClient.get(`/properties/${projectId}`);
                    setProject(res.data);
                } catch (error) {
                    console.error("Error fetching project:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchProject();
        } else {
            setLoading(false);
        }
    }, [projectId, project]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <div className="w-16 h-16 border-4 border-slate-200 dark:border-slate-800 border-t-[#ec9322] dark:border-t-[#ec9322] rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Property Not Found</h2>
                <button onClick={() => navigate("/")} className="px-6 py-2 bg-[#ec9322] text-white font-bold rounded-xl shadow-md hover:bg-[#d8841e] transition-colors">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-slate-50 dark:bg-slate-950 min-h-screen px-4 sm:px-6 lg:px-5 transition-colors duration-300">
            <div className="max-w-7xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/")}
                    className="group flex items-center gap-2 text-slate-500 hover:text-[#753441] dark:text-slate-400 dark:hover:text-rose-400 font-bold mb-4 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    Back to Listings
                </button>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Main Content Area */}
                    <div className="flex-1 w-full bg-white dark:bg-slate-900 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 sm:p-5 transition-colors duration-300">

                        {/* Property Hero Image */}
                        <div className="w-[50%] h-64 sm:h-60 rounded-2xl overflow-hidden mb-10 relative group bg-slate-100 dark:bg-slate-800">
                            {Array.isArray(project.images) && project.images.length > 0 ? (
                                <img
                                    src={project.images[0]}
                                    alt={project.title || "Property Image"}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 dark:text-slate-500">
                                    <Building className="w-16 h-16 mb-2 opacity-50" />
                                    <span className="font-semibold">No Image Available</span>
                                </div>
                            )}

                            {/* Overlay Gradient & Badge */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 pointer-events-none"></div>
                            <div className="absolute bottom-6 left-6 flex items-center gap-3">
                                <span className="bg-[#ec9322] px-4 py-1.5 rounded-full text-xs font-extrabold text-white uppercase tracking-wider shadow-lg">
                                    {project?.listingType || "Property"}
                                </span>
                                <span className="bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-lg border border-white/20">
                                    {project?.propertyType || "Standard"}
                                </span>
                            </div>
                        </div>

                        {/* Title and Price Header */}
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
                            <div>
                                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
                                    {project?.title || "Untitled Property"}
                                </h1>
                                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-medium">
                                    <MapPin className="w-5 h-5 text-[#ec9322]" />
                                    <span>{project?.locality || "Locality Unknown"}, {project?.city || "City Unknown"}</span>
                                </div>
                            </div>
                            <div className="bg-[#fdf8f3] dark:bg-orange-500/10 px-6 py-4 rounded-2xl border border-orange-100 dark:border-orange-500/20 whitespace-nowrap">
                                <p className="text-sm font-bold text-[#ec9322] uppercase tracking-widest mb-1">Asking Price</p>
                                <p className="text-3xl font-black text-slate-900 dark:text-white">
                                    ₹{project?.price?.toLocaleString() || "N/A"}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        {project?.description && (
                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">About this property</h3>
                                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
                                    {project.description}
                                </p>
                            </div>
                        )}

                        {/* Key Features Grid */}
                        <div className="mb-10">
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Key Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                                    <Building className="w-6 h-6 text-[#753441] dark:text-rose-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Category</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">Property</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                                    <Home className="w-6 h-6 text-[#753441] dark:text-rose-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Type</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{project?.propertyType || "N/A"}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                                    <Compass className="w-6 h-6 text-[#753441] dark:text-rose-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Facing</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{project?.facingType || "N/A"}</span>
                                </div>
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 flex flex-col items-center justify-center text-center gap-2 transition-colors">
                                    <Phone className="w-6 h-6 text-[#753441] dark:text-rose-400" />
                                    <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">Contact</span>
                                    <span className="font-bold text-slate-800 dark:text-slate-200">{project?.contactNumber || "N/A"}</span>
                                </div>
                            </div>
                        </div>

                        {/* Amenities */}
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Amenities</h3>
                            {Array.isArray(project?.amenities) && project.amenities.length > 0 ? (
                                <div className="flex flex-wrap gap-3">
                                    {project.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-2 px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 transition-colors">
                                            <CheckCircle className="w-4 h-4 text-green-500" />
                                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-slate-500 italic">No amenities specified for this property.</p>
                            )}
                        </div>
                    </div>

                    {/* Sidebar / Owner Details */}
                    <aside className="w-full lg:w-[350px] shrink-0 lg:sticky lg:top-24">
                        <div className="bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-[2rem] p-8 transition-colors duration-300">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                                <User className="w-6 h-6 text-[#ec9322]" />
                                Listing Owner
                            </h2>

                            {project.broker ? (
                                <div className="space-y-6">
                                    <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700/50 transition-colors">
                                        <div className="w-12 h-12 bg-[#ec9322]/20 rounded-full flex items-center justify-center text-[#ec9322] font-black text-xl">
                                            {project.broker.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                        <div className="overflow-hidden">
                                            <p className="font-bold text-slate-900 dark:text-white truncate">{project.broker.name || "Unknown Owner"}</p>
                                            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-0.5">Broker</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4 px-2">
                                        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                                            <Mail className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="font-medium text-sm truncate">{project.broker.email || "Email hidden"}</span>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-600 dark:text-slate-300">
                                            <Phone className="w-5 h-5 text-slate-400 shrink-0" />
                                            <span className="font-medium text-sm">{project.broker.mobileNumber || "Phone hidden"}</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-700/50 text-center">
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Owner details are currently unavailable for this property.</p>
                                </div>
                            )}

                            <button
                                onClick={() => setShowModal(true)}
                                className="mt-8 w-full bg-gradient-to-r from-[#753441] to-[#ec9322] text-white font-extrabold py-4 px-4 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
                            >
                                Inquire Now
                            </button>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Enquiry Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex justify-center items-center p-4">
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowModal(false)}></div>
                    <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl w-full max-w-md p-8 relative z-10 border border-slate-100 dark:border-slate-800 transition-colors duration-300">
                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 p-2 rounded-full transition-colors focus:outline-none"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">Inquire About Property</h2>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-6">Leave your details and we'll get back to you shortly.</p>

                        {enquiryStatus && (
                            <div className={`p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 ${enquiryStatus.includes('Success') ? 'bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-400' : (enquiryStatus.includes('Submitting') ? 'bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400' : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400')}`}>
                                {enquiryStatus.includes('Success') && <CheckCircle className="w-4 h-4" />}
                                {enquiryStatus}
                            </div>
                        )}

                        <form onSubmit={handleEnquirySubmit} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Your Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={enquiryForm.name}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, name: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl focus:ring-2 focus:ring-[#ec9322] focus:border-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Your Email *</label>
                                <input
                                    type="email"
                                    required
                                    value={enquiryForm.email}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, email: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl focus:ring-2 focus:ring-[#ec9322] focus:border-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Your Phone *</label>
                                <input
                                    type="tel"
                                    required
                                    value={enquiryForm.phone}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, phone: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl focus:ring-2 focus:ring-[#ec9322] focus:border-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all"
                                    placeholder="9876543210"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">Message (Optional)</label>
                                <textarea
                                    rows="3"
                                    value={enquiryForm.message}
                                    onChange={(e) => setEnquiryForm({ ...enquiryForm, message: e.target.value })}
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3.5 rounded-xl focus:ring-2 focus:ring-[#ec9322] focus:border-transparent outline-none text-slate-900 dark:text-white placeholder-slate-400 transition-all resize-none"
                                    placeholder={`I'm interested in ${project?.title}...`}
                                ></textarea>
                            </div>
                            <button
                                type="submit"
                                disabled={enquiryStatus.includes('Submitting')}
                                className="w-full bg-[#ec9322] hover:bg-[#d8841e] text-white font-extrabold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 active:scale-[0.98] mt-2"
                            >
                                {enquiryStatus.includes('Submitting') ? 'Sending...' : 'Send Inquiry'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
