import React from 'react';
import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Award, Users, TrendingUp, Quote } from "lucide-react";
import founderImg from '../assets/chandan.jpeg';

// --- DATA ---
const coreValues = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-[#2e7d32]" />,
    iconBg: "bg-[#e8f5e9]",
    title: "Unwavering Trust",
    description: "Built on a foundation of transparency and legal clarity in every transaction."
  },
  {
    icon: <Award className="w-7 h-7 text-[#1976d2]" />,
    iconBg: "bg-[#e3f2fd]",
    title: "Quality Infrastructure",
    description: "We don't just build plots, we deliver future-ready infrastructure with smart planning."
  },
  {
    icon: <Users className="w-7 h-7 text-[#ed6c02]" />,
    iconBg: "bg-[#fff3e0]",
    title: "Customer First",
    description: "Your vision is our blueprint. We tailor our solutions to your unique lifestyle needs."
  },
  {
    icon: <TrendingUp className="w-7 h-7 text-[#9c27b0]" />,
    iconBg: "bg-[#f3e5f5]",
    title: "Future Growth",
    description: "Strategic planning to ensure your investments yield high returns and long-term value."
  }
];

// --- COMPONENTS ---

const HeroSection = () => (
  <section className="relative pb-24 sm:pb-32 -mt-4 sm:-mt-8">
    {/* Premium Background Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[60%] bg-gradient-to-br from-[#753441]/20 to-transparent rounded-full blur-[120px]"></div>
      <div className="absolute top-[20%] -right-[10%] w-[40%] h-[50%] bg-[#3d1e24]/10 rounded-full blur-[100px]"></div>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-left flex flex-col justify-center"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-12 h-[1px] bg-[#753441]"></span>
            <span className="text-[#753441] text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">Discover Green Vijya</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif text-gray-900 mb-6 leading-[1.1] font-black tracking-tight">
            Our Visionary <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d1e24] to-[#56252f]">
              Story
            </span>
          </h1>

          <p className="max-w-xl text-lg md:text-xl text-gray-600 leading-relaxed font-medium mb-10">
            Crafting premium lifestyles. At <span className="text-[#3d1e24] font-bold">Green Vijya</span>, your trust is the foundation of our legacy.
          </p>

          {/* Subtle Premium Detail */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full border border-[#753441]/30 flex items-center justify-center shadow-sm">
              <span className="w-2 h-2 bg-[#753441] rounded-full animate-pulse"></span>
            </div>
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">Building Legacies</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative h-[300px] sm:h-[350px] lg:h-[400px] w-full mt-10 lg:mt-0"
        >
          {/* Main Hero Image */}
          <div className="w-full h-full rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden shadow-2xl relative z-10 border-[3px] border-white bg-gray-100 group">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200"
              alt="Premium Green Real Estate"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2000ms] ease-out"
            />
            {/* Elegant inner gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
          </div>

          {/* Decorative Gold/Rose Frame */}
          <div className="absolute -bottom-6 -right-6 w-[90%] h-[90%] border-2 border-[#753441]/40 rounded-[2rem] z-0 hidden lg:block pointer-events-none"></div>
        </motion.div>
      </div>
    </div>
  </section>
);

const MissionVisionSection = () => (
  <section className="bg-white relative pb-10 lg:pb-16">
    <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mb-16 lg:-mb-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
        {/* Mission Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="group p-8 lg:p-10 bg-[#3d1e24] rounded-[1.5rem] shadow-[0_15px_40px_rgba(13,59,38,0.3)] relative overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-500"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full blur-[60px] group-hover:bg-white/10 transition-colors duration-500 pointer-events-none"></div>

          <div className="w-14 h-14 rounded-full bg-[#4e222d] flex items-center justify-center mb-6 shadow-inner border border-[#5a2734]">
            <Target className="w-7 h-7 text-[#753441]" />
          </div>

          <h3 className="text-[#753441] text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Mission</h3>
          <p className="text-2xl font-serif text-white mb-4 leading-tight relative z-10">
            To deliver premium-quality plotted developments and innovative real estate solutions
          </p>
          <p className="text-rose-50/70 text-xs lg:text-sm leading-relaxed mt-auto relative z-10 font-light">
            that enhance the quality of life through high-standard infrastructure and sustainable planning.
          </p>
        </motion.div>

        {/* Vision Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="group p-8 lg:p-10 bg-white rounded-[1.5rem] shadow-xl relative overflow-hidden flex flex-col hover:-translate-y-1.5 transition-all duration-500 border border-gray-100"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#753441]/5 rounded-full blur-[60px] group-hover:bg-[#753441]/10 transition-colors duration-500 pointer-events-none"></div>

          <div className="w-14 h-14 rounded-full bg-[#faf9f6] flex items-center justify-center mb-6 shadow-sm border border-gray-100">
            <Eye className="w-7 h-7 text-[#753441]" />
          </div>

          <h3 className="text-[#753441] text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase mb-3">Our Vision</h3>
          <p className="text-2xl font-serif text-gray-900 mb-4 leading-tight relative z-10">
            To become the most trusted and influential real estate developer in the region,
          </p>
          <p className="text-gray-500 text-xs lg:text-sm leading-relaxed mt-auto relative z-10 font-light">
            recognized for our commitment to excellence, integrity, and building thriving communities.
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

const CeoSection = () => (
  <section className="relative pt-16 lg:pt-24 pb-16 lg:pb-20 bg-[#1a0c0f] overflow-hidden">
    {/* Premium Dark Background Accents */}
    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
      backgroundImage: `radial-gradient(circle at 15% 50%, rgba(181, 142, 77, 0.15) 0%, transparent 40%), radial-gradient(circle at 85% 80%, rgba(13, 59, 38, 0.4) 0%, transparent 50%)`
    }}></div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="inline-block mb-6"
      >
        <div className="relative">
          {/* Animated rotating outer ring */}
          <div className="absolute -inset-2.5 rounded-full border border-dashed border-[#753441]/40 animate-[spin_15s_linear_infinite]"></div>
          {/* Inner portrait container */}
          <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full border-[3px] border-[#1a0c0f] ring-2 ring-[#753441]/80 mx-auto overflow-hidden bg-[#1a1a1a] flex items-center justify-center relative z-10 shadow-[0_0_20px_rgba(181,142,77,0.2)]">
            <img src={founderImg} alt="Chandan Singh" className="w-full h-full object-cover" />
          </div>
        </div>
      </motion.div>

      <h4 className="text-[#753441] text-[10px] lg:text-xs font-bold tracking-[0.2em] uppercase mb-2">The Visionary Behind</h4>
      <h2 className="text-3xl lg:text-4xl font-serif text-white mb-5">Chandan Singh</h2>

      <div className="inline-block px-5 py-1.5 rounded-full bg-gradient-to-r from-[#3d1e24] to-[#4e222d] border border-rose-900/50 mb-10 shadow-lg">
        <span className="text-[#fda4af] text-[10px] font-bold tracking-[0.2em] uppercase shadow-sm">CEO & Founder</span>
      </div>

      <div className="relative max-w-3xl mx-auto">
        <Quote className="absolute -top-8 -left-4 lg:-left-8 w-8 h-8 lg:w-12 lg:h-12 text-[#753441]/20 rotate-180" />
        <p className="text-white text-xl lg:text-2xl font-serif leading-relaxed text-center relative z-10 px-6">
          We aren't just selling land; we are laying the foundation for your family's future and your legacy to flourish.
        </p>
        <Quote className="absolute -bottom-8 -right-4 lg:-right-8 w-8 h-8 lg:w-12 lg:h-12 text-[#753441]/20" />
      </div>
    </div>
  </section>
);

const CoreValuesSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <section className="pt-4 lg:pt-8 pb-16 lg:pb-24 bg-white relative overflow-hidden -mt-10 lg:-mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-serif text-gray-900 mb-5">
            The principles that <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3d1e24] to-[#56252f]">drive every project</span> we undertake.
          </h2>
          <div className="w-12 h-[2px] bg-[#753441] mx-auto"></div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group bg-[#faf9f6] p-6 lg:p-8 rounded-[1.5rem] hover:bg-white hover:shadow-[0_15px_30px_rgba(0,0,0,0.06)] border border-transparent hover:border-gray-100 transition-all duration-500 flex flex-col items-center text-center relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className={`w-16 h-16 rounded-full ${value.iconBg} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-translate-y-1 transition-transform duration-500 relative z-10 shadow-sm border border-gray-100`}>
                {value.icon}
              </div>
              <h4 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 relative z-10">{value.title}</h4>
              <div className="w-6 h-[2px] bg-[#753441]/30 mb-4 group-hover:w-12 group-hover:bg-[#753441] transition-all duration-500 relative z-10"></div>
              <p className="text-gray-500 text-xs lg:text-sm leading-relaxed relative z-10 font-medium">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#faf9f6] overflow-hidden font-sans selection:bg-[#3d1e24] selection:text-white">
      <HeroSection />
      <MissionVisionSection />
      <CeoSection />
      <CoreValuesSection />
    </div>
  );
}
