import { useState, useEffect } from "react";
import apiClient from '../api/apiClient';
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/PropertyDetails";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import { Home, FileText, CheckCircle, Image as ImageIcon, Sparkles } from "lucide-react";

export default function PropertyPost() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    city: "",
    projectBuildingName: "",
    locality: "",
    plotArea: "",
    price: "",
    furnishing: "",
    floorNumber: "",
    totalFloors: "",
    amenities: [],
    images: [],
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  const handleImageUpload = async (files) => {
    if (!files.length) return;

    const data = new FormData();
    for (let file of files) {
      data.append('images', file);
    }

    try {
      setUploadProgress(50); // basic progress
      const res = await apiClient.post('/upload', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUploadProgress(100);
      
      setFormData((prevData) => ({
        ...prevData,
        images: [...prevData.images, ...res.data.images],
      }));
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Image upload failed. Please try again.");
    } finally {
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a property!");
      navigate("/login");
      return;
    }

    try {
      // make sure title and description are set since backend requires it
      const payload = {
        ...formData,
        title: formData.projectBuildingName || "Property Listing",
        description: formData.locality || "No description provided",
      };

      await apiClient.post("/properties", payload);

      alert("Property submitted successfully!");
      setStep(1);
      setFormData({
        title: "",
        description: "",
        city: "",
        projectBuildingName: "",
        locality: "",
        plotArea: "",
        price: "",
        furnishing: "",
        floorNumber: "",
        totalFloors: "",
        amenities: [],
        images: [],
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting property. Please try again.");
    }
  };

  return (
    <div className="py-2 px-4 sm:px-6 lg:px-8 bg-slate-100 min-h-screen font-sans text-slate-900">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-6 rounded-2xl border border-slate-200">
          <div>
            <h1 className="text-xl sm:text-3xl font-black tracking-tight text-slate-950 flex items-center gap-2">
              Post Your Real Estate Property
            </h1>
            <p className="text-xs sm:text-sm font-semibold text-slate-500 mt-1">
              List residential, commercial, or agricultural assets across prominent urban locations with instant indexing.
            </p>
          </div>
          <div className="text-xs font-black px-3.5 py-1.5 rounded-lg bg-slate-100 text-slate-800 border border-slate-200 w-fit shrink-0 uppercase tracking-wider">
            Listing Module
          </div>
        </div>

        {/* Main Managed Container */}
        <div className="bg-white p-5 sm:p-8 rounded-2xl border border-slate-200 flex flex-col justify-between min-h-[520px]">
          <div>
            {/* Interactive & Responsive Step Navigation Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 border-b border-slate-100 pb-5">
              {[
                { label: "Property Details", icon: <Home className="w-4 h-4 shrink-0" /> },
                { label: "Additional Info", icon: <FileText className="w-4 h-4 shrink-0" /> },
                { label: "Amenities", icon: <CheckCircle className="w-4 h-4 shrink-0" /> },
                { label: "Upload Images", icon: <ImageIcon className="w-4 h-4 shrink-0" /> }
              ].map((item, index) => {
                const isCurrent = step === index + 1;
                return (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setStep(index + 1)}
                    className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold border transition-none ${isCurrent
                      ? "bg-slate-950 text-white border-slate-950"
                      : "bg-slate-100 text-slate-700 border-slate-200"
                      }`}
                  >
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Form Step Content */}
            <div className="py-2">
              {step === 1 && <PropertyDetails formData={formData} setFormData={setFormData} />}
              {step === 2 && <AdditionalDetails formData={formData} setFormData={setFormData} />}
              {step === 3 && <Amenities formData={formData} setFormData={setFormData} />}
              {step === 4 && (
                <div className="space-y-6 py-2">
                  <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 sm:p-12 text-center bg-slate-50/60">
                    <ImageIcon className="mx-auto h-12 w-12 text-slate-400 mb-3" />
                    <h3 className="text-base sm:text-lg font-black text-slate-950 mb-1">Select or deposit property photography</h3>
                    <p className="text-xs sm:text-sm text-slate-500 mb-6">Supports high resolution PNG, JPG, or WEBP photographic assets</p>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files)}
                      className="text-xs font-bold text-slate-600 file:mr-4 file:py-2.5 file:px-5 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-950 file:text-white cursor-pointer w-full max-w-sm mx-auto block"
                    />
                  </div>

                  {uploadProgress > 0 && (
                    <div className="space-y-2 p-4 rounded-xl bg-slate-100 border border-slate-200">
                      <div className="flex justify-between text-xs sm:text-sm font-extrabold text-slate-950">
                        <span>Uploading property media assets...</span>
                        <span>{uploadProgress.toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-slate-950 h-2 rounded-full"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {formData.images.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-700">Uploaded Assets Preview ({formData.images.length})</h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {formData.images.map((url, index) => (
                          <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                            <img src={url} alt={`Property ${index}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Navigation Controls Footer Bar */}
          <div className="flex items-center justify-between mt-10 pt-5 border-t border-slate-200 shrink-0">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(Math.max(1, step - 1))}
              className="px-6 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-slate-100 text-slate-900 border border-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous Step
            </button>

            <div className="text-xs sm:text-sm font-extrabold text-slate-500 hidden sm:block">
              Step <span className="text-slate-950 font-black">{step}</span> of 4
            </div>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => setStep(Math.min(4, step + 1))}
                className="px-7 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold bg-slate-950 text-white"
              >
                Next Step
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                className="px-8 py-2.5 rounded-xl text-xs sm:text-sm font-black bg-slate-950 text-white border border-slate-800"
              >
                Submit Property
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
