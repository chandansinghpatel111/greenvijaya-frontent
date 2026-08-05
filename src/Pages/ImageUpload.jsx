import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreatenewCourse = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [bio, setBio] = useState("");
  const [thumbnails, setThumbnails] = useState([]); // Multiple images
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [message, setMessage] = useState("");

  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    setThumbnails(files);
  };

  const validateForm = () => {
    if (!title || title.length < 5) {
      setMessage("Title must be at least 5 characters.");
      return false;
    }
    if (!shortDescription || shortDescription.length < 40) {
      setMessage("Short description must be at least 40 characters.");
      return false;
    }
    if (!description) {
      setMessage("Please provide a detailed description.");
      return false;
    }
    if (!bio) {
      setMessage("Please provide a bio.");
      return false;
    }
    if (!thumbnails.length) {
      setMessage("Please upload at least one image.");
      return false;
    }
    setMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    try {
      const uploadPromises = thumbnails.map((file) => {
        const storageRef = ref(storage, `gallery/${Date.now()}_${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        return new Promise((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              setUploadProgress(Math.round(progress));
            },
            (error) => reject(error),
            async () => {
              const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
              resolve(downloadURL);
            }
          );
        });
      });

      const downloadURLs = await Promise.all(uploadPromises);

      const courseData = {
        title,
        shortDescription,
        description,
        bio,
        thumbnails: downloadURLs,
        createdAt: new Date(),
      };

      const docRef = await addDoc(collection(db, "newcourse"), courseData);
      console.log("Document written with ID: ", docRef.id);

      setLoading(false);
      setMessage("Course created successfully!");
      setTimeout(() => navigate("/admin/allcourse"), 2000);
    } catch (error) {
      console.error("Error saving course:", error);
      setMessage("An error occurred while saving the course.");
      setLoading(false);
    }
  };

  return (
    <div className="relative">
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="flex flex-col items-center">
            <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            <p className="text-white mt-4">Submitting...</p>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-800">Create New Course</h1>

          {message && (
            <p className="text-sm text-red-600 bg-red-100 p-2 rounded">{message}</p>
          )}

          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter course title"
            />
          </div>

          {/* Short Description */}
          <div>
            <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700">
              Short Description
            </label>
            <textarea
              id="shortDescription"
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              className="mt-2 p-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a short description (40-100 characters)"
              rows={1}
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <ReactQuill
              id="description"
              value={description}
              onChange={setDescription}
              className="mt-2"
              placeholder="Enter course description"
            />
          </div>

          {/* Bio */}
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <ReactQuill
              id="bio"
              value={bio}
              onChange={setBio}
              className="mt-2"
              placeholder="Enter course bio"
            />
          </div>

          {/* Gallery Upload */}
          <div>
            <label htmlFor="thumbnails" className="block text-sm font-medium text-gray-700">
              Upload Gallery Images
            </label>
            <input
              type="file"
              id="thumbnails"
              onChange={handleThumbnailChange}
              className="mt-2 w-full text-sm text-gray-500"
              accept="image/*"
              multiple
            />
            {thumbnails.length > 0 && (
              <ul className="mt-2 space-y-1 text-sm text-gray-500">
                {thumbnails.map((file, idx) => (
                  <li key={idx}>
                    {file.name} - {Math.round(file.size / 1024)} KB
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Progress Bar */}
          {uploadProgress > 0 && (
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg font-medium hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            disabled={loading}
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatenewCourse;
