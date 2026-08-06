import { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import { Building2, MapPin, Edit, Trash2, X } from "lucide-react";

export default function ProjectExplore() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', price: '' });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await apiClient.get('/projects');
      setProjects(res.data);
    } catch (error) {
      console.error("Error fetching projects: ", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id) => {
    if (!window.confirm("Are you sure you want to delete this project?")) return;
    try {
      await apiClient.delete(`/projects/${id}`);
      setProjects((prev) => prev.filter((proj) => proj._id !== id));
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Error deleting project.");
    }
  };

  const handleEditClick = (project) => {
    setEditingProject(project);
    setEditForm({
      title: project.title || '',
      price: project.price || ''
    });
  };

  const saveEdit = async () => {
    try {
      await apiClient.put(`/projects/${editingProject._id}`, {
        title: editForm.title,
        price: editForm.price
      });
      setProjects((prev) =>
        prev.map((proj) => 
          proj._id === editingProject._id 
            ? { ...proj, title: editForm.title, price: editForm.price } 
            : proj
        )
      );
      setEditingProject(null);
    } catch (error) {
      console.error("Error updating project:", error);
      alert("Error updating project.");
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading projects...</div>;

  return (
    <div className="p-2 sm:p-4 max-w-full mx-auto bg-gray-50 min-h-screen">
      <div className="mb-4 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black text-brand-burgundy tracking-tight">Project Explore</h2>
          <p className="text-gray-500 mt-1">View all projects posted by administrators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {projects.map((project) => (
          <div key={project._id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col transition-all">
            {/* Image */}
            <div className="h-40 w-full bg-gray-200 relative">
              {project.images && project.images.length > 0 ? (
                <img src={project.images[0]} alt={project.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <Building2 size={48} />
                </div>
              )}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-1 py-1 rounded-full text-xs font-bold text-brand-gold shadow-sm">
                ₹ {project.price?.toLocaleString()}
              </div>
            </div>

            {/* Content */}
            <div className="p-4 flex-grow flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase rounded border border-blue-100">
                  {project.status}
                </span>
              </div>

              <h3 className="text-base font-bold text-brand-burgundy mb-1 line-clamp-1">{project.title}</h3>
              <p className="text-sm text-gray-500 flex items-center gap-1 mb-3">
                <MapPin size={14} /> {project.locality}, {project.city}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4 flex-grow">
                {project.description || "No description provided."}
              </p>

              <div className="pt-3 border-t border-gray-100 text-xs text-gray-400 flex justify-between items-center mt-auto">
                <span>Area: <strong className="text-gray-700">{project.plotArea}</strong></span>
                <span>
                  Posted by: <strong className="text-gray-700">{project.createdBy?.name || 'Admin'}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-gray-100 flex gap-2 mt-3">
                <button 
                  onClick={() => handleEditClick(project)}
                  className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 border border-blue-200 px-2 py-1.5 rounded-md hover:bg-blue-100 transition text-xs font-bold"
                >
                  <Edit size={12} /> Edit
                </button>
                <button 
                  onClick={() => deleteProject(project._id)}
                  className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 border border-red-200 px-2 py-1.5 rounded-md hover:bg-red-100 transition text-xs font-bold"
                >
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}

        {projects.length === 0 && (
          <div className="col-span-full text-center p-12 bg-white rounded-xl border border-gray-200 text-gray-500">
            No projects found.
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-brand-burgundy">Quick Edit Project</h3>
              <button onClick={() => setEditingProject(null)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Project Title</label>
                <input 
                  type="text" 
                  value={editForm.title} 
                  onChange={(e) => setEditForm({...editForm, title: e.target.value})}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Starting Price (₹)</label>
                <input 
                  type="number" 
                  value={editForm.price} 
                  onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                  className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-[#d4af37] focus:border-[#d4af37] outline-none transition-all"
                />
              </div>
            </div>
            
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button 
                onClick={() => setEditingProject(null)}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={saveEdit}
                className="px-4 py-2 bg-[#d4af37] text-white rounded-lg text-sm font-bold hover:bg-[#b5952f]"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
