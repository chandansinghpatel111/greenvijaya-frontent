import React from 'react';
import { useParams } from 'react-router-dom';
import { services } from '../data/services'; // Assuming you have a services data file

const ServicePage = () => {
  const { serviceUrl } = useParams(); // Capture the service URL from the route params
  const service = services.find((s) => s.url === serviceUrl); // Find the service based on the URL

  if (!service) {
    return <div>Service not found</div>; // Return a message if the service doesn't exist
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">{service.title}</h2>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img src={service1.image} alt={service.title} className="w-full h-96 object-cover rounded-lg" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 text-lg">{service.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
