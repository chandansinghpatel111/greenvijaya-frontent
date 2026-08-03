
import Slider from "../components/Slider";
import GreenVijayaSectors from "../components/GreenVijayaSectors";
import Listingproperties from "./Listingproperties";
import Coming from "./Coming";
import Service from "./Service";
import { useEffect } from "react";

import WhatsAppButton from "./whatsapp";
import Cityhome from "./Cityhome";
import ContactUs from "./ContactUs";
import NewsProject from "./NewsProject";
import { Building2, Compass, ShieldCheck } from "lucide-react";

const Home = () => {
  useEffect(() => {
    const user = localStorage.getItem('currentUser');
    if (user) {
      console.log(JSON.parse(user));
    }
  }, []);

  const highlights = [
    {
      icon: <Building2 size={22} />,
      title: "Curated Luxury Properties",
      text: "Exclusive Green-Vijaya real estate masterplans selected for superior modern design, prime urban locations, and exponential capital growth."
    },
    {
      icon: <Compass size={22} />,
      title: "Prime Corridor Connectivity",
      text: "Homes, villas, and commercial plots strategically positioned near international airports, expressways, schools, and central business hubs."
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "100% Legal Transparency",
      text: "A seamless, government-approved title handover with verified legal documentation from your initial site visit to complete registration."
    }
  ];

  return (
    <>
      <Slider />

      {/* Green-Vijaya Interactive Real Estate Showcase */}
      <GreenVijayaSectors />

      <div className="section-shell pt-8 pb-14 sm:pt-10 sm:pb-16">
        <div className="mb-10 text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-[#3d1e24]">WHY BUYERS TRUST GREEN-VIJAYA</p>
          <h2 className="mt-2.5 text-3xl font-bold text-slate-950 sm:text-4xl">
            A real estate experience built around absolute confidence, prestige, and excellence
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="group bg-white rounded-lg transition-all duration-500 p-8 text-left">
              <div className="flex h-13 w-13 p-3 items-center justify-center rounded-xl bg-white text-[#3d1e24] shadow-sm inline-flex mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-extrabold text-slate-950">{item.title}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-slate-600 font-normal">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <NewsProject />
      <WhatsAppButton />
      <Coming />
      <Listingproperties />
      <Service />
      <Cityhome />
      <ContactUs />
    </>
  );
};

export default Home;

