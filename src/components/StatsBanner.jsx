import React from 'react';
import { TrendingUp, Award, Users, Sparkles } from 'lucide-react';

const StatsBanner = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-4">
      <div className="bg-[#3b1c23] rounded-2xl p-8 md:p-10 shadow-xl text-white flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 border border-[#5a2e38]">
        
        {/* Left Content */}
        <div className="lg:w-1/2 flex flex-col items-start text-left">
          <div className="inline-flex items-center gap-2 border border-[#6b3341] rounded-full px-4 py-1.5 mb-6 bg-[#251015]/40 shadow-sm">
            <Sparkles size={14} className="text-[#ff8596]" />
            <span className="text-[11px] font-bold tracking-[0.15em] text-[#ff8596] uppercase">Green-Vijaya Excellence</span>
          </div>
          <h2 className="text-3xl md:text-[38px] font-extrabold leading-[1.2] text-white">
            Pioneering <span className="text-[#ff8596]">luxury real estate</span> & building legacies of trust.
          </h2>
        </div>

        {/* Right Stats */}
        <div className="lg:w-1/2 flex flex-col sm:flex-row justify-between gap-8 sm:gap-4 w-full">
          
          {/* Stat 1 */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex items-center gap-2 text-[#ff8596] mb-3">
              <TrendingUp size={22} strokeWidth={3} />
              <span className="text-4xl md:text-[42px] font-black tracking-tight">98%</span>
            </div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase mb-1.5 text-white/90">Customer Trust</h4>
            <p className="text-[11.5px] text-white/60 leading-relaxed pr-4">Verified satisfaction across all premium projects</p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] bg-gradient-to-b from-transparent via-[#6b3341] to-transparent self-stretch mx-2 opacity-60"></div>

          {/* Stat 2 */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex items-center gap-2 text-[#ff8596] mb-3">
              <Award size={22} strokeWidth={3} />
              <span className="text-4xl md:text-[42px] font-black tracking-tight">350+</span>
            </div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase mb-1.5 text-white/90">Dream Homes</h4>
            <p className="text-[11.5px] text-white/60 leading-relaxed pr-4">Luxury villas, plots & commercial spaces delivered</p>
          </div>

          {/* Divider */}
          <div className="hidden sm:block w-[1px] bg-gradient-to-b from-transparent via-[#6b3341] to-transparent self-stretch mx-2 opacity-60"></div>

          {/* Stat 3 */}
          <div className="flex-1 flex flex-col justify-start">
            <div className="flex items-center gap-2 text-[#ff8596] mb-3">
              <Users size={22} strokeWidth={3} />
              <span className="text-4xl md:text-[42px] font-black tracking-tight">475+</span>
            </div>
            <h4 className="text-[12px] font-bold tracking-widest uppercase mb-1.5 text-white/90">Industry Experts</h4>
            <p className="text-[11.5px] text-white/60 leading-relaxed pr-4">Top architects, planners & legal professionals</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StatsBanner;
