// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

import { Search, BedDouble, Bath, Square, ChevronLeft, ChevronRight, Heart } from 'lucide-react';
/// Lucknow/////
import p2 from '../assets/buy2.jpg';
import buy2 from '../assets/buy2.jpg';
import buy4 from '../assets/buy4.jpg';
import buy6 from '../assets/buy6.jpg';


///Gurugram//
import buy7 from '../assets/buy7.jpg';
import buy8 from '../assets/buy2.jpg';
import buy9 from '../assets/buy4.jpg';
import buy10 from '../assets/buy6.jpg';


///Lucknow lullu//
import buy11 from '../assets/IMG-20240830-WA0025.jpg';
import buy12 from '../assets/IMG-20240830-WA0043.jpg';
import buy13 from '../assets/IMG-20240830-WA0034.jpg';
import buy14 from '../assets/IMG-20240830-WA0044.jpg';

const Buy = () => {
  const [activeProperty, setActiveProperty] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const properties = [
    {
      id: 1,
      title: 'Vanshika Ontario Villa',
      price: 10000000 ,
      location: 'Faizabad Road,Lucknow',
      beds: 5,
      baths: 4,
      sqft: 4200,
      description: '3BHK',
      images: [p2, buy2, buy4, buy6]

      
    },
    {
      id: 2,
      title: 'Sohna Rd 36.Gurugram',
      price: 15000000,
      location: 'Gurugram',
      beds: 3,
      baths: 3,
      sqft: 2800,
      description: 'Luxurious penthouse with city skyline views',
      images: [buy7, buy8, buy9, buy10]
    },
    {
      id: 3,
      title: 'Nagram Rd',
      price: 7000000,
      location: 'Lucknow Nagram Rd',
      description: 'Residential, Commercial property Plots, Agricultural Farm lands',
      images: [buy11,buy12,buy13,buy14]
        
    }
  ];

  const toggleFavorite = (propertyId) => {
    setFavorites(prev => 
      prev.includes(propertyId) 
        ? prev.filter(id => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === activeProperty.images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? activeProperty.images.length - 1 : prev - 1
    );
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR', // Use INR for Indian Rupees
      maximumFractionDigits: 0, // No decimal places
    }).format(price);
  };
  
  // Example Usage:
  console.log(formatPrice(1000000)); // ₹1,000,000
  

  const filteredProperties = properties.filter(property =>
    property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    property.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Luxury Real Estate</h1>

      {/* Search Bar */}
      <div className="relative max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search properties..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pl-10 border rounded-lg shadow-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>

      {/* Property Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div key={property.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
            {/* Image Gallery */}
            <div className="relative h-64">
              <img
                src={property.images[0]}
                alt={property.title}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => {
                  setActiveProperty(property);
                  setActiveImageIndex(0);
                }}
              />
              <button
                onClick={() => toggleFavorite(property.id)}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <Heart
                  size={20}
                  className={favorites.includes(property.id) ? "fill-red-500 text-red-500" : "text-gray-500"}
                />
              </button>
              <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full font-semibold text-orange-600">
                {formatPrice(property.price)}
              </div>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{property.title}</h2>
              <p className="text-gray-600 mb-4">{property.location}</p>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <BedDouble size={18} className="text-gray-400" />
                  <span>{property.beds} beds</span>
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={18} className="text-gray-400" />
                  <span>{property.baths} baths</span>
                </div>
                <div className="flex items-center gap-1">
                  <Square size={18} className="text-gray-400" />
                  <span>{property.sqft} sqft</span>
                </div>
              </div>

              <p className="text-gray-700 mb-4">{property.description}</p>

              <div className="flex gap-2">
                <button 
                  className="flex-1 bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-500 transition-colors"
                  onClick={() => setActiveProperty(property)}
                >
                  View Gallery
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full Screen Image Gallery Modal */}
      {activeProperty && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-6xl mx-4">
            <button
              onClick={() => setActiveProperty(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              ✕
            </button>

            <div className="relative">
              <img
                src={activeProperty.images[activeImageIndex]}
                alt={`${activeProperty.title} - Image ${activeImageIndex + 1}`}
                className="w-full h-auto max-h-[80vh] object-contain"
              />
              
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <ChevronLeft size={24} />
              </button>
              
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex justify-center gap-2 mt-4">
              {activeProperty.images.map((image, index) => (
                <div
                  key={index}
                  className={`w-20 h-20 cursor-pointer ${
                    index === activeImageIndex ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Buy;