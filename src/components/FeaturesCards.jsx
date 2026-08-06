import React from 'react';
import { ChevronRight, Calculator, Map, Compass } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FeaturesCards = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Top Banners Section */}
      <div className="flex flex-col gap-4 mb-8">
        
        {/* Banner 1: Sell or Rent */}
        <div className="w-full bg-gradient-to-r from-[#4a1525] to-[#240a12] rounded-xl flex flex-col md:flex-row items-center justify-between p-5 md:py-4 md:px-8 overflow-hidden relative shadow-sm border border-brand-gold/50">
          {/* Decorative City Left */}
          <div className="hidden lg:flex items-end h-16 w-48 relative mr-4 shrink-0 z-10">
            <div className="w-4 h-12 bg-[#b8860b] rounded-t-sm absolute bottom-0 left-0">
               <div className="w-full h-2 bg-white/30 mt-2"></div>
            </div>
            <div className="w-6 h-16 bg-[#d4af37] rounded-t-full absolute bottom-0 left-5">
               <div className="w-3 h-10 bg-white/20 mx-auto mt-2 rounded-t-full"></div>
            </div>
            <div className="w-5 h-10 bg-[#f0e6d2] absolute bottom-0 left-12 rounded-t-sm"></div>
            <div className="w-7 h-14 bg-[#c5a059] absolute bottom-0 left-18 rounded-t-sm">
               <div className="grid grid-cols-2 gap-1 p-1"><div className="w-full h-1 bg-white/40"></div><div className="w-full h-1 bg-white/40"></div><div className="w-full h-1 bg-white/40"></div><div className="w-full h-1 bg-white/40"></div></div>
            </div>
            {/* Sale Tag */}
            <div className="absolute top-0 right-4 bg-[#f0e6d2] text-[#240a12] text-[9px] font-bold px-1.5 py-0.5 rounded rotate-12 border border-[#d4af37]/50 shadow-sm flex items-center">
              <div className="w-1 h-1 bg-[#d4af37] rounded-full mr-1"></div> Sale
            </div>
            {/* Tag String */}
            <svg className="absolute top-2 right-12 w-12 h-6" viewBox="0 0 50 20">
               <path d="M50,5 Q25,-5 0,15" fill="none" stroke="white" strokeWidth="1" strokeDasharray="2,2" />
            </svg>
          </div>

          {/* Text Content */}
          <div className="flex-1 text-center md:text-left z-10 text-white md:pl-2">
            <h2 className="text-xl md:text-[22px] font-bold mb-1">Sell or Rent Your Property with Confidence</h2>
            <p className="text-[13px] md:text-[15px] text-white/80">Connect with a trusted agent to secure the best deal, faster.</p>
          </div>

          {/* Button */}
          <button 
            onClick={() => navigate('/contact')}
            className="mt-5 md:mt-0 bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-[#240a12] font-bold px-5 py-2 rounded-lg flex items-center text-[14px] shadow-sm hover:from-[#f0e6d2] hover:to-[#d4af37] z-10 shrink-0 transition-transform hover:scale-105 active:scale-95"
          >
            Get Started <ChevronRight size={16} className="ml-1" />
          </button>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: TruEstimate */}
        <div 
          onClick={() => navigate('/contact')}
          className="relative rounded-[1.5rem] overflow-hidden border border-brand-burgundy/40 hover:border-brand-burgundy h-[280px] sm:h-[320px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <img src="/image55.jpg" alt="Property Value Estimate" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0e] via-[#3d1e24]/80 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/20 text-white shadow-sm">
              <Calculator size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
              Property Value<sup className="text-[10px] ml-1 text-rose-300">ESTIMATE</sup>
            </h3>
            <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5 line-clamp-2">
              Get an accurate, data-driven valuation of your luxury property today.
            </p>
            <div className="flex items-center text-rose-300 font-bold text-sm group-hover:text-white transition-colors">
              Find out now <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Card 2: Smart Search */}
        <div 
          onClick={() => navigate('/Search')}
          className="relative rounded-[1.5rem] overflow-hidden border border-brand-burgundy/40 hover:border-brand-burgundy h-[280px] sm:h-[320px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <img src="/image66.jpg" alt="Smart Search" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0e] via-[#3d1e24]/80 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/20 text-white shadow-sm">
              <Compass size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
              Smart Search
            </h3>
            <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5 line-clamp-2">
              Discover prime real estate based on drive time, amenities, and lifestyle.
            </p>
            <div className="flex items-center text-rose-300 font-bold text-sm group-hover:text-white transition-colors">
              Start searching <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

        {/* Card 3: Interactive Map */}
        <div 
          onClick={() => navigate('/Search')}
          className="relative rounded-[1.5rem] overflow-hidden border border-brand-burgundy/40 hover:border-brand-burgundy h-[280px] sm:h-[320px] group cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
        >
          <img src="/image77.jpg" alt="Map Exploration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a0b0e] via-[#3d1e24]/80 to-transparent"></div>
          <div className="absolute inset-0 p-8 flex flex-col justify-end">
            <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-xl flex items-center justify-center mb-4 border border-white/20 text-white shadow-sm">
              <Map size={24} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center">
              Interactive Map
            </h3>
            <p className="text-[14px] text-white/80 leading-relaxed font-normal mb-5 line-clamp-2">
              Explore available properties and townships directly on our interactive map.
            </p>
            <div className="flex items-center text-rose-300 font-bold text-sm group-hover:text-white transition-colors">
              Explore map <ChevronRight size={16} className="ml-1 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesCards;
