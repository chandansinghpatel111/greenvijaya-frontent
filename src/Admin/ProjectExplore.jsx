import { useState, useEffect } from "react";
import apiClient from '../api/apiClient';
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/ExplorecityPropertyD";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import { Home, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function PropertyPost() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cityInfoList, setCityInfoList] = useState([]);
  const [selectedCityInfo, setSelectedCityInfo] = useState(null);

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

  useEffect(() => {
    const fetchCityData = async () => {
      try {
        // Wait, cityData is not backed by our Node server yet, mock or fetch from a properties route
        // We'll mock it for now since we haven't built a city endpoints
        setCityInfoList([
          { title: "Lucknow", location: "Uttar Pradesh", projectType: "Residential", priceRange: "50L - 2Cr", amenities: ["Park", "Gym"], about: "Capital city of UP" }
        ]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCityData();
  }, []);

  useEffect(() => {
    const matchedCity = cityInfoList.find(
      (c) => c.title.toLowerCase() === formData.city.toLowerCase()
    );
    setSelectedCityInfo(matchedCity || null);
  }, [formData.city, cityInfoList]);

  const handleImageUpload = async (files) => {
    if (!files.length) return;

    const data = new FormData();
    for (let file of files) {
      data.append('images', file);
    }

    try {
      setUploadProgress(50);
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
      const payload = {
        ...formData,
        title: formData.projectBuildingName || formData.title || "Project Explore Listing",
        description: formData.locality || formData.description || "No description provided",
        price: Number(formData.price) || 0,
        images: formData.images,
      };

      await apiClient.post('/properties', payload);

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
      alert("Error submitting property: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-1 text-slate-500 font-sans">
      {/* Page Title & Status Header - Compact */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 dark:border-slate-800 pb-2.5 transition-colors duration-300">
        <div>
          <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-slate-950 dark:text-white transition-colors duration-300">
            Project Exploration & Setup
          </h1>
          <p className="text-[11px] sm:text-xs font-semibold text-slate-500 dark:text-slate-400 transition-colors duration-300">
            Create and configure municipal real estate listings across prominent urban zones.
          </p>
        </div>
      </div>

      {/* Main Ultra-Compact Container */}
      <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 flex flex-col justify-between min-h-[450px] transition-colors duration-300">
        <div>
          {/* Responsive & Compact Step Indicator Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 transition-colors duration-300">
            {[
              { label: "City Property", icon: <Home className="w-3.5 h-3.5 shrink-0" /> },
              { label: "Additional Info", icon: <FileText className="w-3.5 h-3.5 shrink-0" /> },
              { label: "Amenities", icon: <CheckCircle className="w-3.5 h-3.5 shrink-0" /> },
              { label: "Upload Assets", icon: <ImageIcon className="w-3.5 h-3.5 shrink-0" /> }
            ].map((item, index) => {
              const isCurrent = step === index + 1;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setStep(index + 1)}
                  className={`flex items-center justify-center gap-1.5 py-1.5 px-2.5 rounded-lg text-xs font-extrabold transition-all duration-300 border ${isCurrent
                    ? "bg-slate-950 dark:bg-rose-500 text-white border-slate-950 dark:border-rose-500"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Step Contents */}
          <div className="py-1">
            {step === 1 && (
              <div className="space-y-3">
                <PropertyDetails
                  formData={formData}
                  setFormData={setFormData}
                  cities={cityInfoList.map((c) => c.title)}
                />
                {selectedCityInfo && (
                  <div className="mt-3 p-3 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-300 space-y-1.5 transition-colors duration-300">
                    <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white border-b border-slate-200 dark:border-slate-700 pb-1 transition-colors duration-300">
                      {selectedCityInfo.title} Urban Zone Overview
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-slate-700 dark:text-slate-300">
                      <p><span className="font-extrabold text-slate-950 dark:text-white">Location:</span> {selectedCityInfo.location}</p>
                      <p><span className="font-extrabold text-slate-950 dark:text-white">Project Type:</span> {selectedCityInfo.projectType}</p>
                      <p><span className="font-extrabold text-slate-950 dark:text-white">Price Range:</span> {selectedCityInfo.priceRange}</p>
                      <p className="truncate"><span className="font-extrabold text-slate-950 dark:text-white">Amenities:</span> {selectedCityInfo.amenities?.join(", ")}</p>
                    </div>
                    <p className="pt-1 text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-700/60 leading-relaxed text-[11px] transition-colors duration-300"><span className="font-extrabold text-slate-950 dark:text-white">Overview:</span> {selectedCityInfo.about}</p>
                  </div>
                )}
              </div>
            )}

            {step === 2 && (
              <div>
                <AdditionalDetails formData={formData} setFormData={setFormData} />
              </div>
            )}

            {step === 3 && (
              <div>
                <Amenities formData={formData} setFormData={setFormData} />
              </div>
            )}

            {step === 4 && (
              <div className="space-y-4 py-1">
                <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-5 sm:p-6 text-center hover:border-[#753441] dark:hover:border-rose-400 transition-colors bg-slate-50/50 dark:bg-slate-800/50">
                  <ImageIcon className="mx-auto h-8 w-8 text-slate-400 dark:text-slate-500 mb-2" />
                  <h3 className="text-xs sm:text-sm font-black text-slate-950 dark:text-white mb-1">Select or deposit property photographs</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">Supports high resolution PNG, JPG, or WEBP photography assets</p>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e.target.files)}
                    className="text-xs text-slate-600 dark:text-slate-400 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-extrabold file:bg-slate-950 dark:file:bg-rose-600 file:text-white hover:file:bg-slate-800 dark:hover:file:bg-rose-500 cursor-pointer w-full max-w-xs mx-auto block transition-all"
                  />
                </div>

                {uploadProgress > 0 && (
                  <div className="space-y-1 p-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors duration-300">
                    <div className="flex justify-between text-xs font-extrabold text-slate-950 dark:text-white">
                      <span>Uploading real estate media assets...</span>
                      <span>{uploadProgress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-[#ec9322] dark:bg-rose-500 h-1.5 transition-all duration-200 rounded-full"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                {formData.images.length > 0 && (
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 pt-1">
                    {formData.images.map((url, index) => (
                      <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800">
                        <img src={url} alt={`Property ${index}`} className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Compact Navigation Footer Bar */}
        <div className="flex items-center justify-between mt-5 pt-3.5 border-t border-slate-200 dark:border-slate-800 shrink-0 transition-colors duration-300">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep(Math.max(1, step - 1))}
            className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous Step
          </button>

          <div className="text-xs font-extrabold text-slate-500 dark:text-slate-400 hidden sm:block">
            Step <span className="text-slate-950 dark:text-white font-black">{step}</span> of 4
          </div>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep(Math.min(4, step + 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-950 dark:bg-rose-600 text-white hover:bg-slate-800 dark:hover:bg-rose-500 transition-colors"
            >
              Next Step
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="px-3 py-1.5 rounded-lg text-xs font-extrabold bg-[#ec9322] dark:bg-rose-600 text-white hover:bg-[#d6851f] dark:hover:bg-rose-500 border border-transparent transition-colors"
            >
              Submit Property
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
