import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/PropertyDetails";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import Button from "../components/Button";
import { Home, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function AdminPropertyPost() {
  const [step, setStep] = useState(1);
  const { user } = useAuth();
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState({
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
    description: "",
  });

  const handleImageUpload = async (files) => {
    if (!files.length) return;
    const uploadData = new FormData();
    for (let i = 0; i < files.length; i++) {
      uploadData.append('images', files[i]);
    }

    try {
      const res = await apiClient.post('/upload', uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
           const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
           setUploadProgress(percentCompleted);
        }
      });
      setFormData((prevData) => ({
        ...prevData,
        images: [...(prevData.images || []), ...res.data.images],
      }));
      setUploadProgress(0);
      alert("Images uploaded successfully!");
    } catch (error) {
      console.error("Error uploading image: ", error);
      alert("Image upload failed. Please try again.");
      setUploadProgress(0);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a property!");
      navigate("/login");
      return;
    }

    try {
      const submitData = {
        ...formData,
        title: formData.projectBuildingName || 'Untitled Property',
      };
      await apiClient.post("/properties", submitData);

      alert("Property submitted successfully!");
      setStep(1);
      setFormData({
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
        description: "",
      });

      navigate("/admin/PropertyApproval");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting property. Please try again.");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Post Property</h2>
        <p className="text-gray-500 mt-1">Add a new property to the platform as an Administrator.</p>
      </div>
      
      <div className="w-full bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-200">
        {/* Step Indicator */}
        <div className="flex flex-wrap justify-between items-center mb-6 gap-y-4 border-b border-gray-100 pb-4">
          {[
            { label: "Property Details", icon: <Home className="w-5 h-5 inline mr-2" /> },
            { label: "Additional Details", icon: <FileText className="w-5 h-5 inline mr-2" /> },
            { label: "Amenities", icon: <CheckCircle className="w-5 h-5 inline mr-2" /> },
            { label: "Upload Images", icon: <ImageIcon className="w-5 h-5 inline mr-2" /> }
          ].map((item, index) => (
            <span 
              key={index}
              className={`text-sm sm:text-base flex items-center ${
                step === index + 1 ? "font-bold text-[#ec9322]" : "text-gray-400"
              }`}
            >
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* Step Content */}
        <div className="py-2">
          {step === 1 && <PropertyDetails formData={formData} setFormData={setFormData} />}
          {step === 2 && <AdditionalDetails formData={formData} setFormData={setFormData} />}
          {step === 3 && <Amenities formData={formData} setFormData={setFormData} />}
          {step === 4 && (
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg sm:text-xl font-bold mb-4">Upload Property Images</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center bg-gray-50 hover:bg-gray-100 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e.target.files)}
                  className="w-full"
                />
              </div>
              {uploadProgress > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium mb-1">Uploading: {uploadProgress.toFixed(0)}%</p>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#ec9322] h-full rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}
              {formData.images && formData.images.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-6">
                  {formData.images.map((url, index) => (
                    <div key={index} className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm aspect-video">
                      <img
                        src={url}
                        alt={`Property ${index}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
          {step > 1 ? (
            <Button onClick={() => setStep(step - 1)} text="Previous" />
          ) : (
            <div className="w-24"></div>
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} text="Next" />
          ) : (
            <Button onClick={handleSubmit} text="Submit Property" />
          )}
        </div>
      </div>
    </div>
  );
}
