import { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/PropertyDetails";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import Button from "../components/Button";
import { Home, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function PropertyPost() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
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
    contactNumber: "",
    amenities: [],
    imageUrls: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleImageUpload = async (files) => {
    if (!files.length) return;

    const uploadedUrls = [];
    for (let file of files) {
      const storageRef = ref(storage, `property_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setUploadProgress(progress);
          },
          (error) => {
            console.error("Error uploading image: ", error);
            alert("Image upload failed. Please try again.");
            reject(error);
          },
          async () => {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            uploadedUrls.push(downloadURL);
            resolve();
          }
        );
      });
    }

    setFormData((prevData) => ({
      ...prevData,
      imageUrls: [...prevData.imageUrls, ...uploadedUrls],
    }));

    alert("Images uploaded successfully!");
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a property!");
      navigate("/login");
      return;
    }

    try {
      await addDoc(collection(db, "propertiesunique"), {
        ...formData,
        userId: user.uid,
        isApproved: false,
        createdAt: new Date(),
      });

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
        contactNumber: "",
        amenities: [],
        imageUrls: [],
      });

      navigate("/");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Error submitting property. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6 w-full flex justify-center">
      <div className="w-full max-w-4xl bg-white p-4 sm:p-6 rounded-lg shadow-lg">
        <div className="flex flex-wrap justify-between items-center mb-6 gap-y-4">
          {[
            { label: "Property Details", icon: <Home className="w-5 h-5 inline mr-2" /> },
            { label: "Additional Details", icon: <FileText className="w-5 h-5 inline mr-2" /> },
            { label: "Amenities", icon: <CheckCircle className="w-5 h-5 inline mr-2" /> },
            { label: "Upload Images", icon: <ImageIcon className="w-5 h-5 inline mr-2" /> }
          ].map((item, index) => (
            <span
              key={index}
              className={`text-sm sm:text-base md:text-lg flex items-center ${
                step === index + 1 ? "font-bold text-[#ec9322]" : "text-gray-900"
              }`}
            >
              {item.icon} {item.label}
            </span>
          ))}
        </div>

        {step === 1 && <PropertyDetails formData={formData} setFormData={setFormData} />}
        {step === 2 && <AdditionalDetails formData={formData} setFormData={setFormData} />}
        {step === 3 && <Amenities formData={formData} setFormData={setFormData} />}
        {step === 4 && (
          <div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">Upload Property Images</h2>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleImageUpload(e.target.files)}
              className="border p-2 rounded w-full"
            />
            {uploadProgress > 0 && (
              <div className="mt-2">
                <p className="text-sm">Uploading: {uploadProgress.toFixed(0)}%</p>
                <div className="w-full bg-gray-300 h-2 rounded">
                  <div
                    className="bg-[#ec9322] h-2 rounded"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}
            {formData.imageUrls.length > 0 && (
              <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                {formData.imageUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`Property ${index}`}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <Button onClick={() => setStep(step - 1)} text="Previous" />
          ) : (
            <div className="w-24"></div>
          )}
          {step < 4 ? (
            <Button onClick={() => setStep(step + 1)} text="Next" />
          ) : (
            <Button onClick={handleSubmit} text="Submit" />
          )}
        </div>
      </div>
    </div>
  );
}
