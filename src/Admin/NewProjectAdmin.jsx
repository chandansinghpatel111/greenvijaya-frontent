import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/apiClient";
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/ExplorecityPropertyD";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import Button from "../components/Button";
import { Home, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";
import { services } from "../data/services"; // Import your services data

export default function PropertyPost() {
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
  });

  const selectedCity = services.find((s) => s.title.toLowerCase() === formData.city.toLowerCase());

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
        title: formData.projectBuildingName || 'Untitled Project',
        description: 'New project description', // Add a description to satisfy required field
      };
      await apiClient.post('/projects', submitData);

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
      });

      navigate("/project-explore");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting property. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        {/* Step Indicator */}
        <div className="flex justify-between mb-4">
          {[
            { label: "ExplorecityPropertyD", icon: <Home className="w-5 h-5 inline mr-2" /> },
            { label: "Additional Details", icon: <FileText className="w-5 h-5 inline mr-2" /> },
            { label: "Amenities", icon: <CheckCircle className="w-5 h-5 inline mr-2" /> },
            { label: "Upload Images", icon: <ImageIcon className="w-5 h-5 inline mr-2" /> }
          ].map((item, index) => (
            <span
              key={index}
              className={`text-lg flex items-center ${step === index + 1 ? "font-bold text-[#ec9322]" : "text-gray-400"}`}
            >
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {/* Form Steps */}
        {step === 1 && (
          <>
            <PropertyDetails
              formData={formData}
              setFormData={setFormData}
              cities={services.map((s) => s.title)}
            />
            {/* Dynamic Info based on City Selection */}
            {selectedCity && (
              <div className="mt-4 p-4 bg-gray-50 rounded shadow">
                <h3 className="text-lg font-bold mb-2">About {selectedCity.title}</h3>
                <p><strong>About:</strong> {selectedCity.about}</p>
                <p><strong>Location:</strong> {selectedCity.location}</p>
                <p><strong>Project Type:</strong> {selectedCity.projectType}</p>
                <p><strong>Amenities:</strong> {selectedCity.amenities.join(", ")}</p>
                <p><strong>Price Range:</strong> {selectedCity.priceRange}</p>
              </div>
            )}
          </>
        )}
        {step === 2 && <AdditionalDetails formData={formData} setFormData={setFormData} />}
        {step === 3 && <Amenities formData={formData} setFormData={setFormData} />}
        {step === 4 && (
          <div>
            <h2 className="text-xl font-bold mb-2">Upload Property Images</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="border p-2 rounded w-full"
            />
            {uploadProgress > 0 && (
              <div className="mt-2">
                <p>Uploading: {uploadProgress.toFixed(0)}%</p>
                <div className="w-full bg-gray-300 h-2 rounded">
                  <div
                    className="bg-[#ec9322] h-2 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {formData.images && formData.images.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.images.map((url, index) => (
                  <img key={index} src={url} alt={`Property ${index}`} className="w-full h-32 object-cover rounded-lg" />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          {step > 1 ? <Button onClick={() => setStep(step - 1)} text="Previous" /> : <div className="w-24"></div>}
          {step < 4 ? <Button onClick={() => setStep(step + 1)} text="Next" /> : <Button onClick={handleSubmit} text="Submit" />}
        </div>
      </div>
    </div>
  );
}
