import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image1 from "../../../assets/Rectangle 113 (1).png";
import Image2 from "../../../assets/Rectangle 113.png";

function ServicesHead() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Effet de parallaxe différencié pour un aspect premium
  const yImage1 = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const yImage2 = useTransform(scrollYProgress, [0, 1], [0, 40]);
  const scaleText = useTransform(scrollYProgress, [0, 0.5], [0.95, 1]);

  return (
    <section 
      ref={containerRef} 
      className="w-full pt-10 px-10 md:px-10 lg:px-20"
    >
      <div className="max-w-360 mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-0 items-center">
        
        {/* ================= SECTION IMAGES (L’ART VISUEL) ================= */}
        <div className="lg:col-span-6 relative h-112.5 md:h-150 lg:h-187.5 order-2 lg:order-1">
          
          {/* Label Vertical (Style Agence) */}
          <div className="absolute -left-4 top-1/2 -rotate-90 origin-left hidden xl:block">
            <span className="text-[10px] tracking-[0.5em] text-gray-400 uppercase font-bold">
              CRAFTING DIGITAL EXPERIENCES
            </span>
          </div>

          {/* Image Principale (Arrière-plan flottant) */}
          <motion.div
            style={{ y: yImage1 }}
            className="absolute top-0 right-10 w-[70%] h-[75%] rounded-[60px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)]"
          >
            <img src={Image1} alt="" className="w-full h-full object-cover scale-110" />
            <div className="absolute inset-0 bg-blue-900/10 mix-blend-overlay" />
          </motion.div>

          {/* Image Secondaire (Avant-plan / Détail) */}
          <motion.div
            style={{ y: yImage2 }}
            className="absolute bottom-10 left-0 w-[60%] h-[55%] z-20 rounded-[50px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] border-15 border-white"
          >
            <img src={Image2} alt="" className="w-full h-full object-cover grayscale brightness-110" />
          </motion.div>

          {/* Élément Abstrait (Le cercle de focus) */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-5 -right-5 w-32 h-32 border border-dashed border-gray-300 rounded-full hidden md:block"
          />
        </div>

        {/* ================= SECTION TEXTE (L'ÉDITORIAL) ================= */}
        <motion.div 
          style={{ scale: scaleText }}
          className="lg:col-span-6 lg:pl-20 order-1 lg:order-2"
        >
          <div className="relative">
            {/* Numérotation stylisée */}
            <span className="text-[120px] font-black text-gray-100 absolute -top-20 -left-10 z-0 select-none">
              02
            </span>
            
            <div className="relative z-10 space-y-10">
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-0.5 bg-blue-500" />
                  <span className="text-xs font-bold tracking-widest text-blue-500 uppercase">Mes Services</span>
                </div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-black leading-[1.05] tracking-tighter">
                  Donner une <span className="text-gray-400 italic font-light">âme</span> à vos pixels.
                </h2>
              </div>

              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed max-w-lg">
                  Plus qu'un simple développement, je crée des écosystèmes où la performance rencontre l'émotion utilisateur. 
                </p>
                
                {/* Liste de services minimaliste */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 pt-4">
                  {['UI/UX Design', 'Fullstack Dev', 'Mobile Apps', 'Cloud Architecture'].map((s) => (
                    <div key={s} className="flex items-center gap-3 group cursor-default">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 transition-transform group-hover:scale-150" />
                      <span className="text-sm font-bold text-gray-800 tracking-tight">{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button className="relative inline-flex items-center justify-center px-10 py-5 overflow-hidden font-bold text-white transition-all duration-300 bg-black rounded-full group">
                  <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-500 group-hover:translate-x-0 ease">
                    <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </span>
                  <span className="absolute flex items-center justify-center w-full h-full text-white transition-all duration-300 transform group-hover:translate-x-full ease">DÉBUTER UN PROJET</span>
                  <span className="relative invisible">DÉBUTER UN PROJET</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default ServicesHead;