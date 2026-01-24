import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const SkillsPose = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769281555/Rectangle_69_bt49yd.png"

function Content() {
    const sectionRef = useRef(null)
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" })

    /* Variants d'animation */
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.2 }
        }
    };

    const textItem = {
        hidden: { x: -50, opacity: 0 },
        visible: { 
            x: 0, 
            opacity: 1, 
            transition: { duration: 0.8 } 
        }
    };

    const imageVariants = {
        hidden: { y: 100, opacity: 0, rotate: 2 },
        visible: { 
            y: 0, 
            opacity: 1, 
            rotate: 0,
            transition: { duration: 1 } 
        }
    };

    return (
        <section 
            ref={sectionRef} 
            className="w-full bg-white px-6 md:px-12 lg:px-24 overflow-hidden"
        >
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
            >
                
                {/* --- BLOC TEXTE (7 colonnes) --- */}
                <motion.div className="lg:col-span-7 space-y-12 order-2 lg:order-1 p-5 lg:p-0">
                    
                    {/* En-tête de section */}
                    <motion.div variants={textItem} className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">Expérience & Vision</span>
                            <div className="w-12 h-0.5 bg-blue-500"></div>
                        </div>
                        <h2 className="text-4xl md:text-6xl font-black text-gray-900 leading-[1.1] tracking-tighter">
                            QUELQUES ANNÉES <br /> D'<span className="text-blue-500">EXPÉRIENCE</span>, 
                            <span className="text-gray-300"> BEAUCOUP DE CODE.</span>
                        </h2>
                    </motion.div>

                    {/* Corps de texte stylisé */}
                    <motion.div variants={textItem} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-6">
                            <p className="text-gray-500 leading-relaxed">
                                Une grande partie de mon expérience provient de <span className="text-black font-bold border-b-2 border-blue-500/30">projets personnels</span> où j’ai conçu des applications complètes, de l’architecture à la mise en production.
                            </p>
                            <p className="text-gray-400 text-sm italic border-l-4 border-gray-100 pl-4">
                                "Chaque nouveau projet est pour moi une occasion d’apprendre et d’élever la qualité de mes solutions."
                            </p>
                        </div>

                        <div className="space-y-6">
                            <p className="text-gray-500 leading-relaxed">
                                Collaborer avec d'autres développeurs et porteurs de projets m'a permis de mieux <span className="text-black font-bold">structurer mon code</span> et de respecter des objectifs techniques ambitieux.
                            </p>
                            <p className="text-gray-500 leading-relaxed">
                                Mon parcours repose sur un apprentissage continu, combinant pratique régulière et <span className="text-black font-bold">veille technologique</span> constante.
                            </p>
                        </div>
                    </motion.div>

                    {/* Badge d'expertise contextuel */}
                    <motion.div 
                        variants={textItem}
                        className="p-6 bg-[#fcfcfc] border border-gray-100 rounded-3xl flex items-center gap-6"
                    >
                        <div className="text-3xl"></div>
                        <div>
                            <p className="text-sm font-black text-gray-900 uppercase tracking-tighter">Focus Actuel</p>
                            <p className="text-xs text-gray-400">Optimisation d'algorithmes IA & Intégration de solutions Big Data.</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- BLOC IMAGE (5 colonnes) --- */}
                <motion.div 
                    variants={imageVariants}
                    className="lg:col-span-5 relative order-1 lg:order-2"
                >
                    {/* Décoration d'arrière-plan (Cercle discret) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gray-50 rounded-full scale-110 -z-10" />
                    
                    {/* Conteneur Image avec bordure moderne */}
                    <div className="relative group">
                        <div className="absolute -inset-4 border border-dashed border-gray-200 rounded-[40px] group-hover:rotate-3 transition-transform duration-700" />
                        <div className="rounded-[35px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] border-10 border-white">
                            <img 
                                src={SkillsPose} 
                                alt="Skills & Experience" 
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" 
                            />
                        </div>
                    </div>

                    {/* Badge flottant sur l'image */}
                    <div className="absolute -bottom-6 -right-6 bg-white shadow-xl p-5 rounded-2xl border border-gray-50 flex flex-col items-center">
                        <span className="text-2xl font-black text-blue-500">100%</span>
                        <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Engagement</span>
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}

export default Content;