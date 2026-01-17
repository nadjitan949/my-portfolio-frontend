import { FaHtml5, FaCss3Alt, FaJs, FaPython, FaPhp, FaJava } from "react-icons/fa";
import { FaDartLang } from "react-icons/fa6";
import { SiC, SiCplusplus, SiDatabricks, SiTypescript } from "react-icons/si";
import illustration1 from "../../../assets/Rectangle 80.png";
import illustration2 from "../../../assets/Rectangle 81.png";
import illustration3 from "../../../assets/Rectangle 83.png";
import { FiArrowRight } from "react-icons/fi";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { HiChartBar, HiCode } from "react-icons/hi";
import { HiOutlineWrenchScrewdriver } from "react-icons/hi2";

function Languages() {
    const languages = [
        { name: "HTML", icon: <FaHtml5 />, color: "hover:text-[#E34F26]" },
        { name: "CSS", icon: <FaCss3Alt />, color: "hover:text-[#1572B6]" },
        { name: "JavaScript", icon: <FaJs />, color: "hover:text-[#F7DF1E]" },
        { name: "TypeScript", icon: <SiTypescript />, color: "hover:text-blue-500" },
        { name: "PHP", icon: <FaPhp />, color: "hover:text-[#777BB4]" },
        { name: "Python", icon: <FaPython />, color: "hover:text-blue-600" },
        { name: "C++", icon: <SiCplusplus />, color: "hover:text-blue-700" },
        { name: "C", icon: <SiC />, color: "hover:text-gray-400" },
        { name: "Dart", icon: <FaDartLang />, color: "hover:text-blue-400" },
        { name: "Java", icon: <FaJava />, color: "hover:text-red-600" },
        { name: "SQL", icon: <SiDatabricks />, color: "hover:text-blue-500" },
    ];

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const categories = [
        { title: "Web & Mobile", icon: <HiCode size={22} />, active: false },
        { title: "IA & Big Data", icon: <HiChartBar size={22} />, active: true },
        { title: "Tools & Infra", icon: <HiOutlineWrenchScrewdriver size={22} />, active: false }
    ];

    return (
        <section className="w-full py-24 bg-white overflow-hidden">
            
            {/* --- TOP : GRILLE FIXE DES LANGAGES (Badge Style) --- */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="flex flex-wrap justify-center gap-4">
                    {languages.map((lang, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className={`flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400 transition-all duration-300 ${lang.color} hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 cursor-default`}
                        >
                            <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                                {lang.icon}
                            </span>
                            <span className="font-black text-[10px] uppercase tracking-[0.2em] text-gray-900">
                                {lang.name}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* --- MAIN CONTENT : BENTO GRID --- */}
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                
                {/* PARTIE GAUCHE : COMPOSITION VISUELLE (5 colonnes) */}
                <div className="lg:col-span-5 relative grid grid-cols-2 gap-4 h-137.5">
                    <div className="space-y-4 pt-20">
                        <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             className="rounded-[40px] overflow-hidden border-4 border-white shadow-xl"
                        >
                            <img src={illustration3} className="w-full h-44 object-cover" alt="" />
                        </motion.div>
                        <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.1 }}
                             className="rounded-[40px] overflow-hidden border-4 border-white shadow-xl"
                        >
                            <img src={illustration1} className="w-full h-64 object-cover font-bold" alt="" />
                        </motion.div>
                    </div>
                    <div className="space-y-4">
                        <motion.div 
                             initial={{ opacity: 0, scale: 0.9 }}
                             whileInView={{ opacity: 1, scale: 1 }}
                             transition={{ delay: 0.2 }}
                             className="rounded-[40px] overflow-hidden border-4 border-white shadow-xl"
                        >
                            <img src={illustration2} className="w-full h-80 object-cover" alt="" />
                        </motion.div>
                        
                        {/* Carte Stats Bleu-500 */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="w-full h-32 bg-blue-500 rounded-[40px] p-8 text-white flex items-center justify-between relative overflow-hidden shadow-2xl shadow-blue-500/30"
                        >
                            <div className="relative z-10">
                                <p className="text-4xl font-black">+10</p>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">Skills</p>
                            </div>
                            <FiArrowRight size={28} className="opacity-50" />
                            <div className="absolute -right-2 -top-2 w-24 h-24 bg-white/20 rounded-full blur-2xl" />
                        </motion.div>
                    </div>
                </div>

                {/* PARTIE DROITE : TEXTE & CATEGORIES (7 colonnes) --- */}
                <div ref={ref} className="lg:col-span-7 space-y-12">
                    <div className="space-y-6 px-5 lg:px-0">
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            className="flex items-center gap-4"
                        >
                            <span className="text-xs font-black uppercase tracking-[0.5em] text-blue-500">Compétences</span>
                            <div className="flex-1 h-px bg-gray-100"></div>
                        </motion.div>
                        
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="text-5xl md:text-7xl font-black text-gray-900 leading-[0.9] tracking-tighter"
                        >
                            BOÎTE <br /> <span className="text-blue-500 italic">OUTILS.</span>
                        </motion.h2>

                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            className="text-gray-400 text-lg md:text-xl font-medium max-w-xl leading-relaxed"
                        >
                            Maîtrise complète du cycle de développement, de l'analyse IA à l'architecture système.
                        </motion.p>
                    </div>

                    <div className="space-y-4 px-5 lg:px-0">
                        {categories.map((cat, index) => (
                            <motion.div
                                key={index}
                                className={`flex items-center justify-between p-6 rounded-[30px] transition-all duration-300 group cursor-pointer border-2 ${
                                    cat.active 
                                    ? "bg-black border-black text-white shadow-2xl" 
                                    : "bg-white border-gray-50 text-gray-900 hover:border-blue-500"
                                }`}
                            >
                                <div className="flex items-center gap-6">
                                    <div className={`p-4 rounded-2xl transition-colors ${
                                        cat.active ? "bg-blue-500 text-white" : "bg-gray-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white"
                                    }`}>
                                        {cat.icon}
                                    </div>
                                    <span className="text-xl font-black uppercase tracking-tighter">{cat.title}</span>
                                </div>
                                <FiArrowRight className={`transition-transform duration-300 group-hover:translate-x-2 ${cat.active ? "text-blue-500" : "text-gray-200"}`} />
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}

export default Languages;