import { motion } from "framer-motion";
import { Target, Eye, ShieldCheck, Heart, Users, Award, Briefcase, TrendingUp } from "lucide-react";

const coreValues = [
  {
    icon: <ShieldCheck className="w-8 h-8 text-green-600" />,
    title: "Unwavering Trust",
    description: "Built on a foundation of transparency and legal clarity in every transaction."
  },
  {
    icon: <Award className="w-8 h-8 text-blue-600" />,
    title: "Quality Infrastructure",
    description: "We don't just sell plots; we deliver future-ready infrastructure with smart planning."
  },
  {
    icon: <Users className="w-8 h-8 text-orange-600" />,
    title: "Customer First",
    description: "Your vision is our blueprint. We tailor our solutions to your unique lifestyle needs."
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
    title: "Future Growth",
    description: "Strategic planning to ensure your investments yield high returns and long-term value."
  }
];

export default function AboutPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-6 pb-16 sm:pt-8 sm:pb-20 bg-gradient-to-br from-rose-50 via-white to-slate-50">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-rose-300 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-slate-300 rounded-full blur-[100px]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 tracking-tight">
              Our <span className="text-[#3d1e24]">Visionary Story</span>
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
              At <span className="text-green-700 font-bold">Green Vijaya</span>, we are redefining the real estate landscape by blending modern innovation with traditional values of trust and transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Grid */}
      <section className="py-5 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-green-200 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Target className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Our Mission</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To deliver premium-quality plotted developments and innovative real estate solutions that enhance the quality of life through high-standard infrastructure and sustainable planning.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="group p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-blue-200 transition-all duration-500"
          >
            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
              <Eye className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4 tracking-tight">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To become the most trusted and influential real estate developer in the region, recognized for our commitment to excellence, integrity, and building thriving communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* CEO Section */}
      <section className="py-20 bg-gray-900 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-600/10 blur-[120px]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-8"
          >
            <div className="w-32 h-32 bg-gradient-to-tr from-green-400 to-blue-500 rounded-full mx-auto p-1 shadow-2xl">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center text-5xl">👤</div>
            </div>
          </motion.div>
          <h2 className="text-[#3d1e24] font-bold text-sm uppercase tracking-widest mb-2">The Visionary Behind</h2>
          <h3 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tighter">Chandan Singh</h3>
          <p className="text-gray-400 font-bold text-lg mb-8 uppercase tracking-widest">CEO & Founder</p>
          <div className="max-w-2xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-gray-700 to-transparent"></div>
          <p className="mt-8 text-gray-400 italic text-lg leading-relaxed max-w-3xl mx-auto">
            "We aren't just selling land; we are laying the foundation for your family's future and your legacy to flourish."
          </p>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tighter">Our Core Values</h2>
          <p className="text-gray-500 font-medium">The principles that drive every project we undertake.</p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {coreValues.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 bg-gray-50 rounded-3xl border border-transparent hover:border-gray-200 hover:bg-white hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">{value.icon}</div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h4>
              <p className="text-gray-600 leading-relaxed text-sm">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Stats Counter (Simple visual version)
      <section className="py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center uppercase tracking-tighter font-black">
            <div>
              <div className="text-4xl text-green-600 mb-2">100+</div>
              <div className="text-xs text-gray-400 tracking-[0.2em]">Acres Developed</div>
            </div>
            <div>
              <div className="text-4xl text-blue-600 mb-2">500+</div>
              <div className="text-xs text-gray-400 tracking-[0.2em]">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl text-orange-600 mb-2">10+</div>
              <div className="text-xs text-gray-400 tracking-[0.2em]">Years Exp</div>
            </div>
            <div>
              <div className="text-4xl text-purple-600 mb-2">15+</div>
              <div className="text-xs text-gray-400 tracking-[0.2em]">Prime Projects</div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
