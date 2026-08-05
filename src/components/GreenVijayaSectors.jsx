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
    image: 'https://media.istockphoto.com/id/147205632/photo/modern-home-with-swimming-pool.jpg?s=612x612&w=0&k=20&c=sxRQ398SxAjC4FrRombjl46oDGJVdy23T7i3RXO-mww=',
    icon: <Home size={18} />
  },
  {
    id: 'commercial',
    title: 'Commercial & Retail Hubs',
    heading: 'Corporate Towers & Retail Spaces',
    description: 'Prime corporate towers and high-traffic retail centers strategically located for maximum commercial valuation.',
    tag: 'Commercial Real Estate',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cmVhbCUyMGVzdGF0ZXxlbnwwfHwwfHx8MA%3D%',
    icon: <Building2 size={18} />
  },
  {
    id: 'plots',
    title: 'Smart Urban Land & Plots',
    heading: 'Approved Land Corridors',
    description: 'Government-approved residential and commercial plots equipped with robust infrastructure and guaranteed title equity.',
    tag: 'Land & Masterplanning',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXXu53DJjeKnsjzAqEjzzoF1IFVA0mlGML7mBdNtJjqA0-kdSbLQw43fQ&s=10',
    icon: <Landmark size={18} />
  },
  {
    id: 'industrial',
    title: 'Industrial & Warehousing',
    heading: 'Modern Logistics Parks',
    description: 'Heavy-duty warehousing facilities and engineered logistics parks featuring direct highway connectivity.',
    tag: 'Logistics & Infrastructure',
    image: 'https://www.indiawarehousing.in/wp-content/uploads/2026/01/Warehouse-Areas-in-Ahmedabad-for-Your-Business.png',
    icon: <Briefcase size={18} />
  }
];

const GreenVijayaSectors = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-50/70">
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
                className="group relative h-[360px] sm:h-[400px] rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-[#d1a877]/60 hover:border-[#d1a877] flex flex-col justify-end hover:-translate-y-1.5"
              >
                {/* Background Photo & Zoom Effect */}
                <img
                  src={sector.image}
                  alt={sector.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Clean Dark Gradient Overlay for Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[11px] font-bold tracking-wide border border-white/30 shadow-sm">
                    {sector.icon}
                    {sector.tag}
                  </span>
                </div>

                {/* Bottom Content Area */}
                <div className="relative z-10 p-6 text-left text-white transform transition-transform duration-300 group-hover:-translate-y-1">
                  <h3 className="text-xl font-extrabold tracking-tight text-white leading-snug transition-colors">
                    {sector.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-200/90 leading-relaxed font-normal line-clamp-3">
                    {sector.description}
                  </p>

                  {/* Action Link */}
                  <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-extrabold text-white/80 group-hover:text-white transition-colors">
                    <span>Explore Properties</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-slate-900 text-white transition-colors">
                      <ArrowRight size={16} className="transform transition-transform group-hover:translate-x-0.5" />
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


