import { motion } from "framer-motion";
import { Building2, Key, LandPlot, Home, Users, ArrowRight, CheckCircle2, Briefcase } from "lucide-react";

import image from "../assets/Buy 1.jpg";
import image1 from "../assets/sevice6.jpg";
import image2 from "../assets/land.jpg";
import image3 from "../assets/service2.jpg";
import image4 from "../assets/service4.jpg";
import image5 from "../assets/service1.jpg";

const services = [
  {
    title: "Commercial Property Purchase",
    description: "Premium shops, modern offices, strategic industrial land, and expansive warehouses tailored for your business growth.",
    image: image,
    url: "/contact",
    icon: <Building2 className="w-6 h-6" />,
    color: "from-[#3d1e24] to-[#753441]"
  },
  {
    title: "Leasing Solutions",
    description: "End-to-end commercial leasing services for offices and retail spaces in prime business districts with flexible terms.",
    image: image1,
    url: "/contact",
    icon: <Key className="w-6 h-6" />,
    color: "from-[#52252d] to-[#8a3e4e]"
  },
  {
    title: "Strategic Land & Plots",
    description: "Premium residential plots and fertile agricultural farm lands with high growth potential and clear documentation.",
    image: image2,
    url: "/contact",
    icon: <LandPlot className="w-6 h-6" />,
    color: "from-[#3d1e24] to-[#602b36]"
  },
  {
    title: "Luxury Residential Renting",
    description: "Premium apartments, modern builder floors, and expansive villas in the most sought-after neighborhoods.",
    image: image3,
    url: "/contact",
    icon: <Home className="w-6 h-6" />,
    color: "from-[#462128] to-[#753441]"
  },
  {
    title: "Modern PG & Co-living",
    description: "Well-managed, secure, and fully-equipped PG accommodations designed for students and working professionals.",
    image: image4,
    url: "/contact",
    icon: <Users className="w-6 h-6" />,
    color: "from-[#3d1e24] to-[#853949]"
  },
  {
    title: "Property Management & Advisory",
    description: "Expert property valuation, legal title verification assistance, and complete real estate asset management for superior returns.",
    image: image5,
    url: "/contact",
    icon: <Briefcase className="w-6 h-6" />,
    color: "from-[#3d1e24] to-[#753441]"
  },
];

export default function ExploreServices() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-6 pb-14 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="text-[#3d1e24] font-extrabold tracking-[0.35em] uppercase text-xs mb-3 block">OUR EXPERTISE</span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-950 mb-4 tracking-tight">
              Real Estate <span className="text-[#3d1e24]">Service Excellence</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              Green Vijaya Infra provides a comprehensive suite of real estate solutions designed to turn your property aspirations into landmark reality with transparency and trust.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-white rounded-lg border border-slate-200/80 transition-all duration-500 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative h-64 overflow-hidden rounded-t-lg">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-black/20 to-transparent"></div>
                  <div className="absolute bottom-4 left-6 flex items-center space-x-2 text-white">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${service.color} shadow-md`}>
                      {service.icon}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 text-left">
                  <h3 className="text-2xl font-bold text-slate-950  group-hover:text-[#3d1e24] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base font-normal">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="px-8 pb-8 pt-2 text-left border-t border-slate-200/60 mx-8">
                <a
                  href={service.url}
                  className="inline-flex items-center text-sm font-extrabold text-[#3d1e24] group-hover:text-[#291217] transition-all"
                >
                  Explore Details
                  <ArrowRight className="ml-2 w-4 h-4 transform group-hover:translate-x-1.5 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section - Brand-Aligned Dark Burgundy Corporate Panel */}
      <section className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="rounded-3xl border border-rose-900/15 bg-gradient-to-r from-[#2a1117] via-[#3d1e24] to-[#4e242d] p-10 sm:p-14 relative overflow-hidden shadow-xl text-white">
          <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-rose-400/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 text-center max-w-3xl mx-auto">
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-500/15 border border-rose-400/30 px-4 py-1 text-xs uppercase tracking-widest font-extrabold text-rose-300 mb-4">
              GREEN-VIJAYA CONSULTATION
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight mb-8">
              Ready to accelerate your landmark real estate & property goals?
            </h2>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-12">
              <div className="flex items-center bg-white/10 border border-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-rose-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 mr-2.5 text-rose-300 shrink-0" /> Transparent Pricing
              </div>
              <div className="flex items-center bg-white/10 border border-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-rose-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 mr-2.5 text-rose-300 shrink-0" /> Verified Titles
              </div>
              <div className="flex items-center bg-white/10 border border-white/15 backdrop-blur-md px-5 py-2.5 rounded-full text-sm font-semibold text-rose-100 shadow-sm">
                <CheckCircle2 className="w-5 h-5 mr-2.5 text-rose-300 shrink-0" /> Executive Advisory
              </div>
            </div>

            <a
              href="/contact"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-4 text-base font-extrabold text-[#3d1e24] transition-all duration-300 hover:bg-rose-50 hover:scale-[1.02] active:scale-95 shadow-lg"
            >
              <span>Get Expert Consultation</span>
              <ArrowRight size={18} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

