import { useNavigate } from 'react-router-dom';
import { ArrowRight, Calendar, Sparkles, ShieldCheck, Building2, MapPin } from 'lucide-react';
import sliderImg from '../assets/sliderimg.png';
import { motion } from 'framer-motion';

function Slider() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full overflow-hidden bg-white">
      <div className="section-shell relative z-10 w-full pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">

          {/* Left Column: Title, Subtitle, and CTAs */}
          <motion.div
            className="lg:col-span-6 z-10 flex flex-col items-start text-left"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Green-Vijaya Pill Badge */}
            <div className="inline-flex max-w-full items-center gap-2 rounded-full border border-rose-200 bg-rose-50 px-3.5 py-2 sm:px-4 text-[11px] sm:text-sm font-semibold text-[#3d1e24] shadow-sm mb-4 sm:mb-6">
              <Sparkles size={16} className="text-[#753441] shrink-0 animate-pulse" />
              <span className="leading-normal">Green-Vijaya Infra • Premier Real Estate Development</span>
            </div>

            {/* Responsive Bold Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.2rem] font-bold tracking-tight text-slate-950 leading-[1.22] sm:leading-[1.14]">
              Building spaces where <br />
              <span className="text-[#3d1e24]">
                Memories thrive
              </span>
            </h1>

            {/* Subtitle */}
            <p className="mt-3.5 sm:mt-6 text-sm sm:text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              Green-Vijaya brings architectural innovation and trusted excellence to modern real estate. We specialize in luxury residential villas, prime commercial spaces, and government-approved urban townships designed for prestigious living and guaranteed value appreciation.
            </p>

            {/* CTA Buttons in Simple, Premium Property Style */}
            <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
              <button
                onClick={() => navigate('/NewsProject')}
                className="group flex w-full sm:w-auto items-center justify-center gap-3 rounded-full bg-[#3d1e24] hover:bg-[#291217] px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-white shadow-lg shadow-rose-950/15 transition-all duration-300 hover:scale-[1.02] active:scale-95"
              >
                <span>Explore Properties</span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1.5 shrink-0" />
              </button>

              <button
                onClick={() => navigate('/contact')}
                className="flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full border-2 border-rose-300 bg-white px-8 py-3.5 sm:py-4 text-sm sm:text-base font-semibold text-slate-900 transition-all duration-300 hover:border-[#753441] hover:bg-rose-50/50 hover:text-[#3d1e24] hover:scale-[1.02] active:scale-95"
              >
                <Calendar size={18} className="text-[#753441] shrink-0" />
                <span>Schedule Visit</span>
              </button>
            </div>

            {/* Trust Badges / Quick Stats */}
            <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-3 sm:gap-6 pt-6 sm:pt-8 border-t border-slate-200/80 w-full text-left">
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-[#3d1e24]">150+</p>
                <p className="text-[11px] sm:text-sm text-slate-600 font-semibold mt-1">Luxury Projects</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-[#753441]">98%</p>
                <p className="text-[11px] sm:text-sm text-slate-600 font-semibold mt-1">Client Satisfaction</p>
              </div>
              <div>
                <p className="text-xl sm:text-3xl font-extrabold text-[#a85567]">5+ Yrs</p>
                <p className="text-[11px] sm:text-sm text-slate-600 font-semibold mt-1">Industry Excellence</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Asset Illustration on Pure White Background */}
          <motion.div
            className="lg:col-span-6 flex items-center justify-center relative mt-6 lg:mt-0"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="relative w-full flex justify-center py-4 lg:py-0">
              <img
                src={sliderImg}
                alt="Modern Luxury Real Estate Architecture"
                className="w-full max-w-[460px] sm:max-w-[560px] lg:max-w-[620px] lg:scale-[1.1] xl:scale-[1.15] h-auto object-contain mx-auto transition-transform duration-700"
              />
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

export default Slider;

