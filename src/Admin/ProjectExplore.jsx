import { useState, useEffect } from "react";
import { db, auth, storage } from "../firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import PropertyDetails from "../Pages/ExplorecityPropertyD";
import AdditionalDetails from "../Pages/AdditionalDetails";
import Amenities from "../Pages/Amenities";
import Button from "../components/Button";
import { Home, FileText, CheckCircle, Image as ImageIcon } from "lucide-react";

export default function PropertyPost() {
  const [step, setStep] = useState(1);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [cityInfoList, setCityInfoList] = useState([]);
  const [selectedCityInfo, setSelectedCityInfo] = useState(null);

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
    imageUrls: [],
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchCityData = async () => {
      const snapshot = await getDocs(collection(db, "cityData"));
      const data = snapshot.docs.map((doc) => doc.data());
      setCityInfoList(data);
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

    const uploadedUrls = [];
    for (let file of files) {
      const storageRef = ref(storage, `property_images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      await new Promise((resolve, reject) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
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

      await addDoc(collection(db, "NewlyProjectunique"), {

      
        ...formData,
        userId: user.uid,
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
              cities={cityInfoList.map((c) => c.title)}
            />
            {selectedCityInfo && (
              <div className="mt-4 p-4 bg-gray-50 rounded shadow">
                <h3 className="text-lg font-bold mb-2">About {selectedCityInfo.title}</h3>
                <p><strong>About:</strong> {selectedCityInfo.about}</p>
                <p><strong>Location:</strong> {selectedCityInfo.location}</p>
                <p><strong>Project Type:</strong> {selectedCityInfo.projectType}</p>
                <p><strong>Amenities:</strong> {selectedCityInfo.amenities.join(", ")}</p>
                <p><strong>Price Range:</strong> {selectedCityInfo.priceRange}</p>
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
            {formData.imageUrls.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mt-4">
                {formData.imageUrls.map((url, index) => (
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
