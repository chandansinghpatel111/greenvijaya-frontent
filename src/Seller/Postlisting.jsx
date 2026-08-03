import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/apiClient'; // Assuming apiClient is configured here

const PostPropertyListing = () => {
  const navigate = useNavigate();
  // State to hold form input values mapping to Property Schema
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    city: '',
    state: '',
    locality: '',
    propertyType: 'House',
    listingType: 'Sale', // Default to Sale
  });

  const [images, setImages] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input for images
  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('currentUser') || "{}");
    if (!user._id) {
      setErrorMsg('You must be logged in to post a property.');
      return;
    }

    try {
      setIsUploading(true);

      let uploadedImageUrls = [];
      if (images && images.length > 0) {
        const formDataUpload = new FormData();
        for (let i = 0; i < images.length; i++) {
          formDataUpload.append('images', images[i]);
        }

        const uploadRes = await apiClient.post('/upload', formDataUpload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        uploadedImageUrls = uploadRes.data.images || [];
      }

      const payload = {
        ...formData,
        images: uploadedImageUrls,
      };

      const response = await apiClient.post('/properties', payload);

      if (response.data) {
        setIsSubmitted(true);
        alert('Your property has been posted successfully and is pending admin approval!');
        navigate("/profile");
      }
    } catch (error) {
      console.error('Error posting property:', error);
      setErrorMsg(error.response?.data?.message || 'Failed to post property.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-5 sm:p-6 bg-white dark:bg-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-slate-100 dark:border-slate-800 rounded-2xl transition-colors duration-300">
      <h1 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white mb-3 border-b pb-3 border-slate-100 dark:border-slate-800 flex items-center transition-colors duration-300">
        <span className="text-[#ec9322] mr-2">Create</span> Property Listing
      </h1>

      {isSubmitted && <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">Your property has been successfully listed and is pending approval!</div>}
      {errorMsg && <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">{errorMsg}</div>}

      <form onSubmit={handleSubmit}>

        {/* Basic Info Section */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 space-y-4 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Title of the Property *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full"
                placeholder="e.g., Beautiful 2 Bedroom House"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Price (₹) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full"
                placeholder="e.g., 2500000"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full h-24"
              placeholder="Describe your property in detail..."
              required
            />
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 mt-4 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">City *</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full"
                placeholder="e.g., Lucknow"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full"
                placeholder="e.g., UP"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Locality</label>
              <input
                type="text"
                name="locality"
                value={formData.locality}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 placeholder-slate-400 dark:placeholder-slate-500 text-slate-900 dark:text-white w-full"
                placeholder="e.g., Gomti Nagar"
              />
            </div>
          </div>
        </div>

        {/* Classification Section */}
        <div className="bg-slate-50 dark:bg-slate-800 p-4 mt-4 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Property Type *</label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full"
                required
              >
                <option value="House">House</option>
                <option value="Apartment">Apartment</option>
                <option value="Condo">Condo</option>
                <option value="Land">Land</option>
                <option value="Villa">Villa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-1 transition-colors duration-300">Listing Type *</label>
              <select
                name="listingType"
                value={formData.listingType}
                onChange={handleInputChange}
                className="p-3.5 text-sm font-medium border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#ec9322] dark:focus:ring-rose-400 focus:border-[#ec9322] dark:focus:border-rose-400 outline-none transition-all bg-white dark:bg-slate-900 text-slate-900 dark:text-white w-full"
                required
              >
                <option value="Sale">Sale</option>
                <option value="Rent">Rent</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800 p-4 mt-4 rounded-xl border border-slate-100 dark:border-slate-700 transition-colors duration-300">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2 transition-colors duration-300">Upload Images (Optional)</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            className="w-full text-sm font-medium border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white p-3.5 rounded-xl focus:outline-none transition-colors duration-300 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-extrabold file:bg-[#ec9322] file:text-white hover:file:bg-[#d8841e] cursor-pointer"
          />
        </div>

        <div className="mt-6 text-right">
          <button
            type="submit"
            disabled={isUploading}
            className={`w-full sm:w-auto px-8 font-bold py-3 text-sm rounded-xl shadow-sm transition-colors ${isUploading
              ? 'bg-gray-400 dark:bg-slate-700 text-white cursor-not-allowed'
              : 'bg-[#ec9322] dark:bg-rose-600 text-white hover:bg-[#d8841e] dark:hover:bg-rose-500'
              }`}
          >
            {isUploading ? 'Uploading & Posting...' : 'Post Property'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPropertyListing;
