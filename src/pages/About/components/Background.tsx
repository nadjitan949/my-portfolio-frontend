import { motion } from "framer-motion";
import { FiBookOpen, FiBriefcase, FiMapPin, FiFileText, FiDownload } from "react-icons/fi";

function Background() {
    const experiences = [
        {
            type: "work",
            title: "Lead Backend Developer & Architecte",
            organization: "RilyBeauty Marketplace",
            location: "Remote / France",
            period: "Janvier 2026 — Présent",
            description: "Responsable de l'architecture technique, je supervise le développement d'un écosystème ERP et Marketplace complexe dédié à l'industrie de la beauté. Ma mission consiste à concevoir des API robustes et scalables en utilisant NestJS et Prisma, tout en assurant l'intégrité des données et l'optimisation des performances de la plateforme. Je dirige une équipe de développeurs talentueux, coordonnant les sprints et instaurant des standards de code rigoureux.",
            logo: "https://cdn-icons-png.flaticon.com/512/3061/3061341.png",
            skills: ["Architecture Microservices", "NestJS Expert", "Leadership Technique"],
            certifLink: "/certs/attestation-rily.pdf"
        },
        {
            type: "school",
            title: "Expertise en Ingénierie logicielle (La Piscine)",
            organization: "École 42 Paris",
            location: "Paris, France",
            period: "Août 2026",
            description: "Immersion totale dans l'une des formations les plus exigeantes au monde pour parfaire ma maîtrise du bas niveau et de la résolution de problèmes complexes. Cette expérience intensive me permet de repousser mes limites en programmation C, en gestion de mémoire et en algorithmique avancée, tout en consolidant ma capacité d'apprentissage en autonomie et ma collaboration au sein d'un environnement d'excellence.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/42_Logo.svg",
            skills: ["Langage C", "Systèmes Unix", "Algorithmique Avancée"],
            certifLink: "/certs/42-piscine.pdf"
        },
        {
            type: "school",
            title: "Licence en IA & Big Data",
            organization: "Université de Lomé",
            location: "Lomé, Togo",
            period: "2023 — 2026",
            description: "Cursus académique spécialisé dans l'exploitation des données massives et l'implémentation de modèles d'intelligence artificielle. Durant ce parcours, j'ai approfondi mes connaissances en Machine Learning, en analyse prédictive et en gestion de bases de données distribuées. Mes projets académiques ont porté sur la création de modèles capables d'analyser des comportements complexes.",
            logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
            skills: ["Machine Learning", "Data Engineering", "TensorFlow"],
            certifLink: "/certs/licence-ia.pdf"
        }
    ];

    return (
        <section className="w-full py-16 lg:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-4 sm:px-8 lg:px-12">
                
                {/* TITRE PRINCIPAL RESPONSIVE */}
                <header className="mb-20 lg:mb-32">
                    <motion.div 
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        className="h-1 w-16 lg:w-24 bg-[#00A3FF] origin-left mb-4"
                    />
                    <h2 className="text-3xl lg:text-5xl font-black tracking-tighter text-black leading-none">
                        PARCOURS<span className="text-[#00A3FF]">.</span>
                    </h2>
                </header>

                <div className="flex flex-col gap-24 lg:gap-15">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            {/* LOGO ADAPTATIF : À gauche sur PC, au-dessus sur Mobile */}
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                className="
                                    absolute z-20 bg-white rounded-2xl lg:rounded-[35px] shadow-xl border border-gray-50 flex items-center justify-center p-4 lg:p-7
                                    /* Mobile position */
                                    w-20 h-20 -top-10 left-6
                                    /* Desktop position (LG) */
                                    lg:w-32 lg:h-32 lg:top-10 lg:-left-16 lg:flex
                                "
                            >
                                <img src={exp.logo} alt="" className="w-full h-full object-contain" />
                            </motion.div>

                            {/* CARTE DE CONTENU RESPONSIVE */}
                            <div className="
                                bg-white border-l-4 lg:border-l-8 border-[#00A3FF] 
                                pt-16 pb-8 px-6 /* Mobile padding pour laisser place au logo du haut */
                                lg:py-12 lg:pl-24 lg:pr-12 /* Desktop padding */
                                rounded-r-2xl lg:rounded-r-[40px] 
                                shadow-[10px_10px_30px_#f0f0f0] lg:shadow-2xl
                            ">
                                <div className="flex flex-col gap-6">
                                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-[#00A3FF] font-black text-[10px] lg:text-xs uppercase tracking-[0.2em]">
                                                {exp.type === 'work' ? <FiBriefcase /> : <FiBookOpen />}
                                                {exp.type === 'work' ? 'Expérience' : 'Formation'}
                                            </div>
                                            <h3 className="text-2xl lg:text-4xl font-bold text-black tracking-tight leading-tight">
                                                {exp.title}
                                            </h3>
                                            <div className="flex flex-wrap items-center gap-3 text-gray-400 font-bold">
                                                <span className="text-black uppercase text-xs lg:text-sm tracking-widest">{exp.organization}</span>
                                                <span className="hidden sm:inline w-1 h-1 bg-gray-200 rounded-full"></span>
                                                <span className="flex items-center gap-1 text-[11px] lg:text-xs"><FiMapPin /> {exp.location}</span>
                                                <span className="bg-[#E0F2FF] text-[#00A3FF] px-3 py-1 rounded-lg text-[9px] lg:text-[10px]">{exp.period}</span>
                                            </div>
                                        </div>

                                        {/* BOUTON CERTIFICAT */}
                                        <motion.a
                                            href={exp.certifLink}
                                            target="_blank"
                                            whileTap={{ scale: 0.9 }}
                                            className="flex items-center lg:flex-col gap-3 lg:gap-2 text-[#00A3FF] font-black text-[10px] group self-start"
                                        >
                                            <div className="w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl bg-[#00A3FF] text-white flex items-center justify-center shadow-lg transition-transform group-hover:scale-110">
                                                <FiFileText size={18} className="lg:hidden" />
                                                <FiFileText size={22} className="hidden lg:block" />
                                            </div>
                                            <span className="lg:block hidden">CERTIFICAT</span>
                                            <span className="lg:hidden block bg-[#E0F2FF] px-4 py-2 rounded-full">VOIR LE CERTIFICAT</span>
                                        </motion.a>
                                    </div>

                                    <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium max-w-4xl border-l-2 border-gray-100 pl-4 lg:pl-6 py-2">
                                        {exp.description}
                                    </p>

                                    {/* SKILLS TAGS */}
                                    <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                                        {exp.skills.map((skill, sIdx) => (
                                            <span key={sIdx} className="text-[9px] lg:text-[11px] font-black uppercase tracking-widest text-blue-500">
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* FOOTER ACTION RESPONSIVE */}
                <div className="mt-24 text-center">
                    <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto px-8 lg:px-10 py-5 lg:py-4 bg-black text-white font-black rounded-xl lg:rounded-xl flex items-center justify-center gap-4 mx-auto shadow-2xl transition-colors tracking-widest uppercase text-xs lg:text-sm"
                    >
                        Dossier complet <FiDownload />
                    </motion.button>
                </div>
            </div>
        </section>
    );
}

export default Background;