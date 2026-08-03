import { useParams } from 'react-router-dom';
import { services } from '../data/service1'; // Importing global services data
import image from '../assets/Gurugram.jpg'; // Importing fallback image

const LucknowProject = () => {
  const { url } = useParams(); // Extract the URL slug from the route params
  // Find the service matching the URL parameter
  const service = services.find((s) => s.url === url);

  // If the service is not found, show the "not found" message
  if (!service) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Service not found! </h2>
      </div>
    );
  } else {
    // If service is found, render the details
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-orange-500">{service.title}</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <img
              src={service.image || image} // Use service image or fallback image
              alt={service.title}
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">About {service.title}</h3>
            <p className="text-gray-700 text-lg mb-4">{service.description}</p>
            <p className="text-gray-700 text-lg mb-4">{service.location}</p>
            <p className="text-gray-700 text-lg mb-4">{service.projectType}</p>
            <p className="text-gray-700 text-lg mb-4">{service.amenities}</p>
            <p className="text-gray-700 text-lg mb-4">{service.priceRange}</p>

            {/* You can also add more dynamic information related to each project */}
            <p className="text-gray-700 text-lg">More details will go here...</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="#"
            className="bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-500 transition-colors"
          >
            Contact Sales
          </a>
        </div>
      </div>
    );
  }
};

export default LucknowProject;
