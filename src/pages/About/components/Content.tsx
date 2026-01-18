import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa6";
import AboutPose from "../../../assets/Rectangle 68.png";
import Button from "../../../ui/Button";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

function Content() {
    const sectionRef = useRef(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    /* Variants d'animation */
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1, 
            transition: { duration: 0.8 } 
        }
    };

    return (
        <section 
            ref={sectionRef} 
            className="w-full px-6 md:px-12 lg:px-24 bg-white overflow-hidden font-sans"
        >
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="max-w-7xl mx-auto"
            >
                {/* --- SECTION PRINCIPALE (IMAGE + TEXTE) --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    
                    {/* Colonne Image (5/12) */}
                    <motion.div variants={itemVariants} className="lg:col-span-5 relative">
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-yellow-400/10 rounded-full blur-3xl -z-10" />
                        <div className="relative group">
                            <div className="absolute inset-0 border-2 border-gray-100 rounded-[60px] translate-x-4 translate-y-4 -z-10 transition-transform group-hover:translate-x-6 group-hover:translate-y-6" />
                            <div className="rounded-[50px] overflow-hidden shadow-2xl border-8 border-white bg-gray-50">
                                <img 
                                    src={AboutPose} 
                                    alt="Nadjitan Betan" 
                                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-700" 
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Colonne Texte (7/12) */}
                    <motion.div variants={itemVariants} className="lg:col-span-7 space-y-8 px-5 lg:px-0">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="text-xs font-black uppercase tracking-[0.4em] text-gray-400">À propos</span>
                                <div className="w-12 h-0.5 bg-blue-500"></div>
                            </div>
                            <h2 className="text-5xl md:text-5xl font-black text-gray-900 leading-[0.9] tracking-tighter">
                                SALUT ! <br />
                                JE SUIS <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-blue-600">NADJITAN.</span>
                            </h2>
                        </div>

                        <div className="space-y-6 text-gray-500 text-lg md:text-xl leading-relaxed">
                            <p>
                                Développeur <span className="text-black font-bold">Web & Mobile</span> orienté <span className="text-blue-500 font-bold">IA & Big Data</span>. 
                                Je conçois des systèmes informatiques avec une approche centrée sur la résolution de problèmes complexes.
                            </p>
                            <p className="text-base text-gray-400 leading-relaxed font-light">
                                Avec une expertise en architecture logicielle, je me distingue par une <span className="text-black font-medium italic underline decoration-blue-500 decoration-2 text-sm">analyse précise des besoins</span> et la livraison de solutions évolutives.
                            </p>
                        </div>

                        {/* Social & Contact Buttons */}
                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <Button 
                                children="Me contacter" 
                                className="px-10 py-5 rounded-2xl bg-black text-white font-bold uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-black transition-all duration-300 shadow-lg"
                            />
                            <div className="flex gap-3">
                                {[
                                    { Icon: FaLinkedin, link: "#" },
                                    { Icon: FaGithub, link: "#" },
                                    { Icon: FaTwitter, link: "#" }
                                ].map(({ Icon, link }, i) => (
                                    <a key={i} href={link} className="w-12 h-12 flex items-center justify-center rounded-xl bg-gray-50 text-gray-400 hover:text-black hover:bg-white hover:shadow-md transition-all border border-gray-100">
                                        <Icon size={20} />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* --- SECTION STATS (CHIFFRES) --- */}
                <motion.div 
                    variants={itemVariants}
                    className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-20"
                >
                    {[
                        { label: "Années d'expérience", value: "03+" },
                        { label: "Projets Terminés", value: "24+" },
                        { label: "Clients Heureux", value: "12+" },
                        { label: "Technologies", value: "15+" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <h4 translate="no" className="text-4xl md:text-5xl font-black text-gray-900">{stat.value}</h4>
                            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mt-2">{stat.label}</p>
                        </div>
                    ))}
                </motion.div>

                {/* --- CTA FINAL --- */}
                <motion.div 
                    variants={itemVariants} 
                    className="mt-32 text-center space-y-8"
                >
                    <div className="inline-block p-1 px-3 bg-yellow-400/10 rounded-full text-[#CC9A06] text-[10px] font-bold uppercase tracking-widest">
                        Collaboration
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                        PRÊT À RÉALISER VOTRE PROJET ?
                    </h3>
                    <p className="text-gray-500 max-w-lg mx-auto font-medium">
                        Je suis actuellement disponible pour de nouvelles missions freelances ou des opportunités innovantes.
                    </p>
                    <div className="pt-4">
                        <Button 
                            children="Démarrer un projet" 
                            className="px-12 py-5 rounded-2xl bg-blue-500 text-black font-black uppercase tracking-widest text-sm hover:-translate-y-1 transition-all duration-300"
                        />
                    </div>
                </motion.div>

            </motion.div>
        </section>
    );
}

export default Content;