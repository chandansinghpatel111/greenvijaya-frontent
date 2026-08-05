import { useParams, Link } from "react-router-dom";
import homeImage from "../assets/service1.jpg"; 
import commercialImage from "../assets/service2.jpg"; 
import rentImage from "../assets/service4.jpg"; 
import { MapPin, Building, ShieldCheck, Banknote, Sparkles } from "lucide-react";

// Sample services data
const services = [
  { 
    url: "home", 
    title: "Discover Your Dream Home", 
    description: "Experience the epitome of luxury living with our meticulously curated selection of premium residential properties, exclusive villas, and smart homes. We bring you properties in prime locations equipped with world-class amenities, ensuring unparalleled comfort and a lifestyle that truly matches your aspirations.", 
    location: "Premium Locations (Lucknow, Gurugram, Noida)", 
    projectType: "Luxury Residential & Villas", 
    amenities: "24x7 Multi-tier Security, Lush Green Parks, Exclusive Club House", 
    priceRange: "₹20 Lakh - ₹5 Cr",
    image: homeImage
  },
  { 
    url: "commercial", 
    title: "Premium Commercial Spaces", 
    description: "Elevate your business by exploring our top-tier commercial spaces, high-street retail shops, and state-of-the-art office buildings. Strategically located in the most sought-after business hubs, our properties are designed to maximize your ROI and drive unprecedented business growth.", 
    location: "Metro Cities & Central Business Hubs", 
    projectType: "Premium Commercial & Retail", 
    amenities: "High-Speed Internet, Ample Reserved Parking, 100% Power Backup", 
    priceRange: "₹50 Lakh - ₹10 Cr",
    image: commercialImage
  },
  { 
    url: "rent", 
    title: "Find the Perfect Rental Home", 
    description: "Step into comfort with our handpicked luxury and affordable rental properties situated in premium neighborhoods. Whether you seek move-in ready apartments or spacious houses, we offer excellent connectivity and top-notch community facilities tailored to your needs.", 
    location: "Prime Neighborhoods Across Major Cities", 
    projectType: "Premium Residential Rentals", 
    amenities: "Furnished/Semi-furnished Options, Dedicated Maintenance Staff", 
    priceRange: "₹10K - ₹2 Lakh per month",
    image: rentImage
  }
];

const ServiceDetail = () => {
  const { serviceUrl } = useParams();
  const service = services.find((s) => s.url === serviceUrl);

  if (!service) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="bg-rose-50 p-6 rounded-full mb-6">
          <ShieldCheck size={48} className="text-[#753441]" />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-3">Service Not Found</h2>
        <p className="text-slate-600 mb-8 max-w-md">We couldn't find the service you're looking for. It might have been updated or moved.</p>
        <Link to="/" className="bg-[#3d1e24] text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-[#291217] transition-all">
          Return to Homepage
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 pt-0 pb-12 sm:pb-16 -mt-2 sm:-mt-4">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <h1 className="text-3xl md:text-5xl font-black bg-gradient-to-r from-[#291217] via-[#461e27] to-[#753441] bg-clip-text text-transparent tracking-tight mb-4 leading-tight py-1">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
          {service.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Image Section */}
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-100">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-[300px] sm:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105" 
            loading="lazy" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-white/95 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-white/20 inline-block">
              <p className="text-[#3d1e24] font-extrabold text-sm uppercase tracking-wider mb-1">Starting From</p>
              <p className="text-2xl font-black text-slate-900">{service.priceRange.split(' - ')[0]}</p>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="flex flex-col gap-6">
          <h3 className="text-2xl font-extrabold text-slate-900 mb-2 border-b border-slate-100 pb-4">Key Highlights</h3>
          
          <div className="grid gap-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center text-[#753441]">
                <MapPin size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Location Focus</p>
                <p className="text-lg font-semibold text-slate-900 mt-0.5">{service.location}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                <Building size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Property Type</p>
                <p className="text-lg font-semibold text-slate-900 mt-0.5">{service.projectType}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Premium Amenities</p>
                <p className="text-lg font-semibold text-slate-900 mt-0.5">{service.amenities}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                <Banknote size={24} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Investment Range</p>
                <p className="text-lg font-semibold text-slate-900 mt-0.5">{service.priceRange}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4">
            <Link 
              to="/contact" 
              className="flex-1 bg-[#3d1e24] text-white text-center px-6 py-4 rounded-2xl font-bold shadow-lg shadow-rose-950/20 hover:bg-[#291217] transition-all hover:-translate-y-1"
            >
              Contact Sales Expert
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
