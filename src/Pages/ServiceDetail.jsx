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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-16 sm:pb-24">
      {/* Header Section */}
      <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16">
        <h1 className="text-3xl sm:text-4xl md:text-3xl lg:text-5xl font-black bg-gradient-to-r from-[#291217] via-[#461e27] to-[#753441] bg-clip-text text-transparent tracking-tight mb-6 leading-tight py-1">
          {service.title}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-relaxed font-medium px-2">
          {service.description}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Image Section (Takes up 7 columns on desktop) */}
        <div className="lg:col-span-7 relative group rounded-[2rem] overflow-hidden shadow-2xl border border-slate-100">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-[350px] sm:h-[450px] lg:h-[450px] object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8">
            <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-xl border border-white/40 transform transition-transform duration-500 hover:-translate-y-2">
              <p className="text-[#3d1e24] font-extrabold text-xs sm:text-sm uppercase tracking-widest mb-1">Starting From</p>
              <p className="text-2xl sm:text-3xl font-black text-slate-900">{service.priceRange.split(' - ')[0]}</p>
            </div>
          </div>
        </div>

        {/* Details Section (Takes up 5 columns on desktop) */}
        <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 border-b-2 border-rose-100 pb-4 inline-block w-fit">
            Key Highlights
          </h3>

          <div className="grid gap-6 sm:gap-8 mt-2">
            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#753441] shadow-sm">
                <MapPin size={26} strokeWidth={2.5} />
              </div>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Location Focus</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{service.location}</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 shadow-sm">
                <Building size={26} strokeWidth={2.5} />
              </div>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Property Type</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{service.projectType}</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600 shadow-sm">
                <ShieldCheck size={26} strokeWidth={2.5} />
              </div>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Premium Amenities</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{service.amenities}</p>
              </div>
            </div>

            <div className="flex gap-5 items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm">
                <Banknote size={26} strokeWidth={2.5} />
              </div>
              <div className="pt-1">
                <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest mb-1">Investment Range</p>
                <p className="text-base sm:text-lg font-bold text-slate-900 leading-tight">{service.priceRange}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <Link
              to="/contact"
              className="flex w-full items-center justify-center bg-[#3d1e24] text-white px-8 py-5 rounded-2xl font-black text-lg shadow-xl shadow-rose-950/20 hover:bg-[#291217] transition-all hover:-translate-y-1 hover:shadow-rose-950/30"
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
