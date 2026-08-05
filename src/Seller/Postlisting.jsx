import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PostPropertyListing = () => {
  const navigate = useNavigate();
  // State to hold form input values
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    propertyType: 'House',
    images: [],
  });

  // State to handle form submission status
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input for images
  const handleImageChange = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: files });
  };

  // Form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here, you can send formData to an API or backend.
    console.log('Property Posted:', formData);
    setIsSubmitted(true);  // Set submission status to true
    alert('Your property has been posted successfully!');
  };

  return (
    <div className="post-property-container">
      <h1>Post Your Property for Free</h1>

      {/* Display success message after submission */}
      {isSubmitted && <div className="success-message">Your property has been successfully listed!</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title of the Property:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Beautiful 2 Bedroom House"
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe your property..."
            required
          />
        </div>

        <div className="form-group">
          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="e.g., 250000"
            required
          />
        </div>

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., New York, NY"
            required
          />
        </div>

        <div className="form-group">
          <label>Property Type:</label>
          <select
            name="propertyType"
            value={formData.propertyType}
            onChange={handleInputChange}
            required
          >
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Condo">Condo</option>
            <option value="Land">Land</option>
          </select>
        </div>

        <div className="form-group">
          <label>Upload Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>
        <button type="submit" className="submit-btn" onClick={() => navigate("/postproperty")}>Post Property</button>
      </form>
    </div>
  );
};

export default PostPropertyListing;
