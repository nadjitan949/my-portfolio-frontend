import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi"; // Un petit plus pour le look pro
import Img from "../../../ui/Img";

const Background = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284520/Back_ae8fpc.png"
const HeadImage1 = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284524/Rectangle_95_1_vc13jk.png"
const HeadImage2 = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284582/Rectangle_95_xpbpgm.png"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemReveal = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
};

function ProjectHead() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  // Effet de Parallaxe au scroll
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const projectStats = [
    { value: 23, label: "Projets pros" },
    { value: 18, label: "Projets persos" },
    { value: 5, label: "En cours" },
    { value: 36, label: "Achevés" },
  ];

  return (
    <section ref={containerRef} className="w-full px-5 md:px-10 lg:px-20 overflow-hidden">
      <div className="max-w-350 mx-auto">
        
        {/* HEADER SECTION - Très minimaliste et pro */}
        <motion.div 
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
          className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8"
        >
          <div className="max-w-3xl space-y-6">
            <motion.span variants={itemReveal} className="text-blue-600 font-bold tracking-[0.2em] uppercase text-xs md:text-sm">
              Portfolio Index — 2024
            </motion.span>
            <motion.h1 variants={itemReveal} className="text-4xl md:text-6xl xl:text-7xl font-bold text-black leading-[1.1] tracking-tight">
              L'art de bâtir des <span className="text-gray-400">solutions</span> digitales.
            </motion.h1>
          </div>
          <motion.div variants={itemReveal} className="hidden lg:block pb-4">
             <div className="flex items-center gap-3 text-sm font-medium text-gray-500 hover:text-black transition-colors cursor-pointer group">
               SCROLL POUR EXPLORER <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
             </div>
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT: CARTE PRINCIPALE (La "Bento" box) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 relative group rounded-[40px] overflow-hidden aspect-4/5 md:aspect-video lg:aspect-auto lg:h-162.5 shadow-2xl"
          >
            <Img src={Background} alt="Arrière plan illustration" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
            
            <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
              <div className="space-y-6">
                <p className="text-white/80 text-lg md:text-xl max-w-lg leading-relaxed font-light">
                  Chaque ligne de code est une brique vers l'excellence. Découvrez une sélection de solutions pensées pour l'impact.
                </p>
                
                {/* Stats en Glassmorphism */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-white/10">
                  {projectStats.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="text-2xl md:text-3xl font-bold text-white">+{stat.value}</div>
                      <div className="text-[10px] uppercase tracking-wider text-white/50 font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: IMAGES DECALÉES (Style Galerie) */}
          <div className="lg:col-span-5 flex flex-col gap-8 h-full">
            <motion.div 
              style={{ y: y1 }}
              className="w-full h-75 lg:h-87.5 rounded-[40px] overflow-hidden shadow-xl"
            >
              <Img src={HeadImage1} alt="Entête illustration 1" className="w-full h-full object-cover" />
            </motion.div>
            
            <motion.div 
              style={{ y: y2 }}
              className="w-full h-75 lg:h-112.5 rounded-[40px] overflow-hidden shadow-xl relative"
            >
              <Img src={HeadImage2} alt="Entête illustration 2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              {/* Overlay Badge */}
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-[10px] font-bold tracking-widest uppercase">
                Focus UX/UI
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ProjectHead;