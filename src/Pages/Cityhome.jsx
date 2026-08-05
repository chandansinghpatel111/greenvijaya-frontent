import React from "react";
import { ArrowRight, MapPin } from "lucide-react";

const City = () => {
  const cities = [
    {
      id: 1,
      name: "Lucknow",
      image: "https://travelnthrill.com/wp-content/uploads/2015/09/Visit-Lucknow.jpg",
      contactUrl: "/projects/lucknow-faizabad-road",
      desc: "Capital administrative hub featuring world-class expressways and rapidly appreciating townships."
    },
    {
      id: 3,
      name: "Kanpur",
      image: "https://img.veenaworld.com/wp-content/uploads/2021/05/Kanpur-Sightseeing-8-Famous-Places-to-Visit.jpg",
      contactUrl: "/projects/kanpur",
      desc: "Industrial capital transforming with modern residential high-rises and integrated logistics hubs."
    },
    {
      id: 4,
      name: "Varanasi",
      image: "https://tse2.mm.bing.net/th?id=OIP.WX33mi09UzX-3Nd5QeH_FQHaEK&pid=Api&P=0&h=180",
      contactUrl: "/projects/varanasi",
      desc: "Heritage city combining spiritual richness with monumental infrastructure and real estate expansion."
    },
  ];

  return (
    <div className="section-shell pb-16 pt-0 sm:pb-20 sm:pt-0 -mt-12 sm:-mt-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
          Strategic Presence in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d1e24] to-[#753441]">Major Cities</span>
        </h2>
        <p className="text-slate-600 font-medium max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Explore our premium residential townships and commercial hubs, strategically located in India's fastest-growing and most dynamic urban centers.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cities.map((city) => (
          <div
            key={city.id}
            className="group bg-white rounded-[1.5rem] border border-slate-100 shadow-[0_5px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col justify-between"
          >
            <div>
              <div className="relative overflow-hidden h-56">
                <img
                  src={city.image}
                  alt={city.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent" />
                <div className="absolute bottom-4 left-5 flex items-center gap-2 text-white">
                  <div className="p-1.5 rounded-full bg-[#753441]/40 border border-white/30 backdrop-blur-md">
                    <MapPin size={16} className="text-rose-200" />
                  </div>
                  <span className="text-xl font-extrabold tracking-wide">{city.name}</span>
                </div>
              </div>
              <div className="p-7 text-left">
                <p className="text-slate-600 text-sm leading-relaxed font-medium">{city.desc}</p>
              </div>
            </div>

            <div className="px-7 pb-7 pt-2 flex items-center justify-between">
              <a
                href={city.contactUrl}
                className="inline-flex items-center gap-2 text-sm text-[#753441] hover:text-[#3d1e24] font-bold transition group/link"
              >
                <span>Explore City Projects</span>
                <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1 text-[#3d1e24]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default City;
