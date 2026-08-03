import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Building2, Landmark, Home, Briefcase, Sparkles, TrendingUp, Award, Users } from 'lucide-react';

const sectorsData = [
  {
    id: 'luxury',
    title: 'Luxury Villas & Residences',
    heading: 'High-Tech Residential Townships',
    description: 'Smart home automation, eco-friendly energy architecture, and expansive layouts designed for absolute comfort.',
    tag: 'Residential Excellence',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    icon: <Home size={18} />
  },
  {
    id: 'commercial',
    title: 'Commercial & Retail Hubs',
    heading: 'Corporate Towers & Retail Spaces',
    description: 'Prime corporate towers and high-traffic retail centers strategically located for maximum commercial valuation.',
    tag: 'Commercial Real Estate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    icon: <Building2 size={18} />
  },
  {
    id: 'plots',
    title: 'Smart Urban Land & Plots',
    heading: 'Approved Land Corridors',
    description: 'Government-approved residential and commercial plots equipped with robust infrastructure and guaranteed title equity.',
    tag: 'Land & Masterplanning',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    icon: <Landmark size={18} />
  },
  {
    id: 'industrial',
    title: 'Industrial & Warehousing',
    heading: 'Modern Logistics Parks',
    description: 'Heavy-duty warehousing facilities and engineered logistics parks featuring direct highway connectivity.',
    tag: 'Logistics & Infrastructure',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    icon: <Briefcase size={18} />
  }
];

const GreenVijayaSectors = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-50/70">
      {/* 1. Ultra-Compact Brand Authority & Stats Ribbon */}
      <section className="py-6 sm:py-10 border-b border-slate-200/80 bg-white">
        <div className="section-shell">
          <div className="rounded-2xl border border-rose-900/10 bg-gradient-to-r from-[#2a1117] via-[#3d1e24] to-[#4e242d] p-6 sm:p-8 text-white shadow-lg">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
              
              {/* Left Column: Concise Headline */}
              <div className="lg:col-span-5 text-left">
                <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 border border-rose-400/30 px-3 py-1 text-xs uppercase tracking-widest font-extrabold text-rose-300 mb-3">
                  <Sparkles size={14} className="text-rose-400" />
                  Green-Vijaya Advantage
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight leading-snug">
                  A definitive leader in <span className="text-rose-400">prestige properties</span> & urban legacy.
                </h2>
              </div>

              {/* Right Column: Compact Horizontal Stats Strip */}
              <div className="lg:col-span-7 grid grid-cols-3 gap-2 sm:gap-6 divide-x divide-rose-800/60 text-center sm:text-left pt-4 lg:pt-0 border-t lg:border-t-0 border-rose-800/60">
                <div className="px-2 sm:px-4 first:pl-0">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-400 text-2xl sm:text-4xl font-black">
                    <TrendingUp size={24} className="hidden sm:inline opacity-80 shrink-0" />
                    <span>98%</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-200">Client CSAT</p>
                  <p className="mt-0.5 text-[11px] text-rose-100/70 hidden sm:block leading-tight">Verified satisfaction across all townships</p>
                </div>

                <div className="px-2 sm:px-4">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-400 text-2xl sm:text-4xl font-black">
                    <Award size={24} className="hidden sm:inline opacity-80 shrink-0" />
                    <span>350+</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-200">Delivered Units</p>
                  <p className="mt-0.5 text-[11px] text-rose-100/70 hidden sm:block leading-tight">Luxury villas, plots & retail hubs</p>
                </div>

                <div className="px-2 sm:px-4">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-rose-400 text-2xl sm:text-4xl font-black">
                    <Users size={24} className="hidden sm:inline opacity-80 shrink-0" />
                    <span>475+</span>
                  </div>
                  <p className="mt-1 text-[11px] sm:text-xs font-bold uppercase tracking-wider text-rose-200">Industry Experts</p>
                  <p className="mt-0.5 text-[11px] text-rose-100/70 hidden sm:block leading-tight">Architects, legal advisors & planners</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. Authentic Real Estate Photographic Portfolio Grid */}
      <section className="py-10 sm:py-14 bg-white relative">
        <div className="section-shell">
          
          {/* Compact Header & CTA */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 pb-4 border-b border-slate-100 text-left gap-4">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#3d1e24] mb-1.5">PORTFOLIO OFFERINGS</p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-950">
                Explore Our Real Estate Developments
              </h2>
            </div>
            <button
              onClick={() => navigate('/NewsProject')}
              className="inline-flex items-center gap-2 text-sm font-bold text-[#3d1e24] hover:text-[#291217] transition-colors group self-start sm:self-auto"
            >
              <span>View All Active Projects</span>
              <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* High-Density Property Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sectorsData.map((sector) => (
              <div
                key={sector.id}
                onClick={() => navigate('/NewsProject')}
                className="group relative h-[360px] sm:h-[400px] rounded-lg overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-200/80 flex flex-col justify-end hover:-translate-y-1.5"
              >
                {/* Background Photo & Zoom Effect */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Rich Luxury Wine Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#261116] via-[#261116]/70 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-rose-300 text-[11px] font-bold tracking-wide border border-white/15">
                    {sector.icon}
                    {sector.tag}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 text-left text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-extrabold tracking-tight text-white leading-snug group-hover:text-rose-300 transition-colors">
                    {sector.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-200/90 leading-relaxed font-normal line-clamp-3">
                    {sector.description}
                  </p>
                  
                  {/* Action Link */}
                  <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-xs font-extrabold text-rose-300 group-hover:text-white transition-colors">
                    <span>Explore Properties</span>
                    <div className="w-7 h-7 rounded-full bg-rose-500/20 flex items-center justify-center group-hover:bg-[#3d1e24] transition-colors">
                      <ArrowRight size={14} className="transform transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
};

export default GreenVijayaSectors;


