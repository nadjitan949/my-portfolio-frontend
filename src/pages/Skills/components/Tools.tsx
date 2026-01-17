import { FaBrain, FaCode } from "react-icons/fa6";
import NodeJS from "../../../assets/node.png";
import ReactJs from "../../../assets/reactjs.png";
import ReactNatif from "../../../assets/reactnative.png";
import VueJs from "../../../assets/Vue.png";
import { motion, useInView } from "framer-motion";
import { useRef } from "react"

type Skill = {
    img: string;
    title: string;
    level: string;
    desc: string;
};

interface SkillBoxProps {
    skill: Skill;
}

const skillsData = [
    {
        category: "Développement Web & Mobile",
        icon: <FaCode size={18} />,
        items: [
            { img: NodeJS, title: "Node JS · Express", level: "Expert", desc: "Architecture d'API RESTful haute performance et microservices." },
            { img: ReactJs, title: "React JS · TS", level: "Avancé", desc: "Création d'interfaces complexes avec une gestion d'état optimisée." },
            { img: ReactNatif, title: "React Native", level: "Avancé", desc: "Développement mobile cross-platform natif iOS et Android." },
            { img: VueJs, title: "Vue JS", level: "Maîtrisé", desc: "Interfaces réactives et modulables avec Vuex/Pinia." },
        ],
    },
    {
        category: "IA & Big Data",
        icon: <FaBrain size={18} />,
        items: [
            { img: NodeJS, title: "Python Data", level: "Avancé", desc: "Traitement de données massives et automatisation de scripts." },
            { img: ReactJs, title: "TensorFlow", level: "Intermédiaire", desc: "Entraînement et déploiement de modèles de Machine Learning." },
            { img: ReactNatif, title: "Analyse Prédictive", level: "Avancé", desc: "Exploitation de patterns pour la prise de décision." },
            { img: VueJs, title: "Scikit-Learn", level: "Avancé", desc: "Algorithmes de classification et régression statistique." },
        ],
    },
];

function SkillBox({ skill }: SkillBoxProps) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="group relative bg-white border border-gray-100 rounded-4xl p-6 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-500"
        >
            <div className="flex flex-col gap-5">
                {/* Header: Image + Level */}
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center border border-gray-50">
                        <img src={skill.img} alt={skill.title} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-blue-50 text-blue-600">
                        {skill.level}
                    </span>
                </div>

                {/* Body */}
                <div className="space-y-2">
                    <h4 className="text-lg font-black text-gray-900 tracking-tight group-hover:text-blue-500 transition-colors">
                        {skill.title}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {skill.desc}
                    </p>
                </div>

                {/* Interactive bar footer */}
                <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : {}}
                        transition={{ duration: 1, delay: 0.5 }}
                        className="h-full bg-blue-500 opacity-20 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
        </motion.div>
    );
}

function Tools() {
    return (
        <section className="w-full py-24 px-5 lg:px-0 bg-[#FCFCFC] pb-60">
            <div className="max-w-7xl mx-auto px-6 lg:px-24">
                
                <div className="flex flex-col gap-24">
                    {skillsData.map((category, idx) => (
                        <div key={idx} className="flex flex-col lg:flex-row gap-12">
                            
                            {/* Titre de catégorie (Sidebar style) */}
                            <div className="lg:w-1/4">
                                <div className="sticky top-10 space-y-4">
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-blue-500">
                                        {category.icon}
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                                        {category.category.split(' & ').map((part, i) => (
                                            <span key={i} className="block">{part}</span>
                                        ))}
                                    </h3>
                                    <div className="w-8 h-1 bg-blue-500 rounded-full" />
                                </div>
                            </div>

                            {/* Grille des Skills (3/4) */}
                            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
                                {category.items.map((skill, index) => (
                                    <SkillBox key={index} skill={skill} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Tools
