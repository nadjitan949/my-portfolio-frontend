import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FiBookOpen, FiBriefcase, FiMapPin, FiFileText } from "react-icons/fi";
import api from "../../../api/axios";
import Img from "../../../ui/Img";

interface Background {
    id: number
    type: 'work' | 'school'
    title: string
    organization: string
    location: string
    period: string
    description: string
    logo: string
    skills: string[]
    certifLink: string
    website: string
}

type RawBackground = Omit<Background, 'skills'> & {
    skills: string | string[];
};

function Background() {
    const [experiences, setExperiences] = useState<Background[] | null>(null)
    
    useEffect(() => {
        const fetchBackgrounds = async () => {
            try {
                const res = await api.get<{ backgrounds: RawBackground[] }>('/background/all');

                const rawData = res.data.backgrounds;

                // Transformation avec typage explicite
                const sanitized: Background[] = rawData.map((exp: RawBackground) => {
                    let parsedSkills: string[] = [];

                    if (Array.isArray(exp.skills)) {
                        parsedSkills = exp.skills;
                    } else if (typeof exp.skills === 'string') {
                        try {
                            parsedSkills = JSON.parse(exp.skills);
                        } catch (e) {
                            console.error("Erreur parsing skills:", e);
                            parsedSkills = [];
                        }
                    }

                    return {
                        ...exp,
                        skills: parsedSkills
                    } as Background;
                });

                setExperiences(sanitized);

            } catch (error) {
                console.error("Erreur:", error);
                alert("Une erreur imprévue est survenue.");
            }
        };
        fetchBackgrounds();
    }, []);

    const handleCertifClick = (e: React.MouseEvent, link: string | null) => {
        if (!link || link === "" || link === "null") {
            e.preventDefault(); // Empêche l'ouverture du lien
            alert("La certification pour ce parcours n'est pas encore disponible.");
        }
    };

    return (
        <>
            {experiences && experiences?.length > 0 ? (
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

                        <div className="flex flex-col gap-20 lg:gap-15">
                            {experiences?.map((exp) => (
                                <motion.div
                                    key={exp.id}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    {/* LOGO ADAPTATIF : À gauche sur PC, au-dessus sur Mobile */}
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        className="
                                    absolute z-20 bg-white rounded-2xl lg:rounded-[20px] shadow-xl border border-gray-50 flex items-center justify-center p-4 lg:p-2
                                    /* Mobile position */
                                    w-20 h-20 -top-10 left-6
                                    /* Desktop position (LG) */
                                    lg:w-25 lg:h-25 lg:top-10 lg:-left-16 lg:flex
                                    overflow-hidden
                                "
                                    >
                                        <a
                                            href={exp.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="cursor-pointer"
                                        >
                                            <Img src={exp.logo} alt={`Image ${exp.title}`} className="w-full h-full object-cover" />
                                        </a>
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
                                                    // On garde le href pour le SEO et le curseur, mais on contrôle le clic
                                                    href={exp.certifLink ? `${api.defaults.baseURL}${exp.certifLink}` : "#"}
                                                    target={exp.certifLink ? "_blank" : "_self"}
                                                    rel="noopener noreferrer"
                                                    onClick={(e) => handleCertifClick(e, exp.certifLink)}
                                                    whileTap={{ scale: 0.9 }}
                                                    className={`flex items-center lg:flex-col gap-3 lg:gap-2 font-black text-[10px] group self-start transition-opacity ${!exp.certifLink ? "opacity-50 cursor-not-allowed" : "text-[#00A3FF] cursor-pointer"
                                                        }`}
                                                >
                                                    <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-xl lg:rounded-2xl text-white flex items-center justify-center shadow-lg transition-transform ${!exp.certifLink ? "bg-gray-400" : "bg-[#00A3FF] group-hover:scale-110"
                                                        }`}>
                                                        <FiFileText size={18} className="lg:hidden" />
                                                        <FiFileText size={22} className="hidden lg:block" />
                                                    </div>

                                                    <span className="lg:block hidden uppercase">
                                                        {exp.certifLink ? "Certificat" : "Indisponible"}
                                                    </span>

                                                    <span className="lg:hidden block bg-[#E0F2FF] px-4 py-2 rounded-full">
                                                        {exp.certifLink ? "VOIR LE CERTIFICAT" : "AUCUN CERTIFICAT"}
                                                    </span>
                                                </motion.a>
                                            </div>

                                            <p className="text-gray-500 text-base lg:text-lg leading-relaxed font-medium max-w-4xl border-l-2 border-gray-100 pl-4 lg:pl-6 py-2">
                                                {exp.description}
                                            </p>

                                            {/* SKILLS TAGS */}
                                            <div className="flex flex-wrap gap-x-4 gap-y-2 mt-2">
                                                {exp.skills.map((skill, sIdx) => (
                                                    <span key={sIdx} className="text-[9px] lg:text-[11px] border px-3 py-1.5 rounded-md font-black uppercase tracking-widest text-blue-500">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
            ) : (
                <div className="hidden"></div>
            )}
        </>
    );
}

export default Background;