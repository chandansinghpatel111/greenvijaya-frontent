import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Home, TrendingUp, Sparkles, ShieldCheck, Building2 } from 'lucide-react';

const Coming = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full pt-0 pb-14 sm:pt-2 sm:pb-16 bg-white">
      <div className="section-shell">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] items-start">

          {/* Left Content Area: Brand Logo Green Styling, Zero Ad-Box Effects */}
          <div className="text-left">

            <h2 className="text-3xl font-bold sm:text-5xl text-brand-burgundy tracking-tight leading-tight">
              Elevate your property portfolio with <span className="text-brand-burgundy">architectural benchmarks</span>.
            </h2>
            <p className="mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 font-normal">
              From luxury green townships to future-ready commercial corridors, Green Vijaya delivers developments engineered for verified title security, uncompromising prestige, and guaranteed capital appreciation.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/listing-post')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-burgundy hover:bg-[#291217] px-8 py-4 text-sm sm:text-base font-semibold text-white transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                <span>Explore Masterplans</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="inline-flex items-center justify-center rounded-full bg-slate-100 hover:bg-rose-50 px-8 py-4 text-sm sm:text-base font-semibold text-brand-burgundy transition-all duration-300 hover:-translate-y-1 active:translate-y-0"
              >
                Schedule Executive Call
              </button>
            </div>

            {/* Clean Stats Row without Heavy Borders */}
            <div className="mt-12 grid grid-cols-3 gap-4 pt-8 border-t border-slate-100">
              {[
                { label: 'Landmark Projects', value: '50+', color: 'text-brand-burgundy' },
                { label: 'Portfolio Value', value: '₹50Cr+', color: 'text-brand-gold' },
                { label: 'Verified CSAT', value: '98%', color: 'text-[#a85567]' }
              ].map((stat) => (
                <div key={stat.label} className="py-1">
                  <p className={`text-2xl sm:text-4xl font-extrabold ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs sm:text-sm font-bold text-slate-700 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Clean Architectural Showcase with Upward Hover Elevation (No Border or Shadow Ads) */}
          <div className="space-y-8">
            {/* Main Interactive Photo Box that lifts upward on hover without box borders */}
            <div
              onClick={() => navigate('/listing-post')}
              className="group relative h-72 sm:h-80 w-full rounded-lg overflow-hidden bg-slate-900 border border-slate-200/80 shadow-lg hover:shadow-2xl cursor-pointer transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src="/image88.png"
                alt="Green Vijaya Masterplan"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#261116]/90 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6 text-left text-white">
                <span className="inline-block px-3 py-1 rounded-full bg-rose-500/30 backdrop-blur-md text-rose-200 text-xs font-bold mb-2">
                  Featured Township
                </span>
                <h3 className="text-2xl font-bold tracking-tight text-white group-hover:text-rose-300 transition-colors">
                  Green Vijaya Urban Corridor
                </h3>
              </div>
            </div>

            {/* Clean Feature Lists without borders or shadows, only smooth upward lift on hover */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-left mt-6">
              {[
                {
                  icon: <Building2 size={24} className="text-rose-200" />,
                  title: 'Prime Corridors',
                  text: 'Strategically located in high-demand zones near expressways.'
                },
                {
                  icon: <TrendingUp size={24} className="text-rose-200" />,
                  title: 'Capital Returns',
                  text: 'Backed by legal purity and timely delivery records.'
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="group relative bg-gradient-to-br from-[#291217] via-[#3d1e24] to-brand-gold rounded-2xl border border-brand-gold/40 p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 shadow-sm transition-transform duration-500 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <h3 className="font-extrabold text-xl text-white mb-2 tracking-tight group-hover:text-rose-200 transition-colors">{item.title}</h3>
                    <p className="text-[13px] sm:text-sm leading-relaxed text-rose-100/80 font-medium">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Coming;
