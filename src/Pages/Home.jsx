
import Slider from "../components/Slider";
import FeaturesCards from "../components/FeaturesCards";
import GreenVijayaSectors from "../components/GreenVijayaSectors";
import Listingproperties from "./Listingproperties";
import Coming from "./Coming";
import Service from "./Service";
import { useAuth } from "../context/AuthContext";
import WhatsAppButton from "./whatsapp";
import Cityhome from "./Cityhome";
import ContactUs from "./ContactUs";
import NewsProject from "./NewsProject";
import { Building2, Compass, ShieldCheck } from "lucide-react";

const Home = () => {
  const { user } = useAuth();

  const highlights = [
    {
      icon: <Building2 size={22} />,
      title: "Curated Luxury Properties",
      text: "Exclusive Green-Vijaya real estate masterplans selected for superior modern design, prime urban locations, and exponential capital growth.",
      imgSrc: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <Compass size={22} />,
      title: "Prime Corridor Connectivity",
      text: "Homes, villas, and commercial plots strategically positioned near international airports, expressways, schools, and central business hubs.",
      imgSrc: "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=800&q=80"
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "100% Legal Transparency",
      text: "A seamless, government-approved title handover with verified legal documentation from your initial site visit to complete registration.",
      imgSrc: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80"
    }
  ];

  return (
    <>
      <Slider />

      {/* New Zillow-style Features Section */}
      <FeaturesCards />

      {/* Green-Vijaya Interactive Real Estate Showcase */}
      <GreenVijayaSectors />

      <div className="section-shell pt-8 pb-14 sm:pt-10 sm:pb-16 bg-[#f6f9fa]">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-burgundy sm:text-4xl leading-tight">
            A real estate experience built around absolute confidence, prestige, and excellence
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
          {highlights.map((item) => (
            <div key={item.title} className="group bg-white rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:-translate-y-2 text-left border border-brand-burgundy/40 hover:border-brand-burgundy flex flex-col">
              <div className="relative h-56 w-full overflow-hidden">
                <img src={item.imgSrc} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 h-12 w-12 flex items-center justify-center rounded-xl bg-white text-brand-gold shadow-lg">
                  {item.icon}
                </div>
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-xl font-extrabold text-brand-burgundy mb-3">{item.title}</h3>
                <p className="text-[15px] leading-relaxed text-slate-600 font-normal">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewsProject />
      <Coming />
      <Listingproperties />
      <Service />
      <Cityhome />
      <ContactUs />
    </>
  );
};

export default Home;

