import illustration1 from "../../../assets/Rectangle 80.png"
import illustration2 from "../../../assets/Rectangle 81.png"
import illustration3 from "../../../assets/Rectangle 83.png"
import { FiArrowRight } from "react-icons/fi"
import { motion, useInView } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import api from "../../../api/axios"

interface Icone {
    url: string
    public_id: string
}

interface Skills {
    id: number
    name: string
    image: Icone
    level: string
    description: string
}

interface Languages {
    id: number,
    name: string,
    icone: Icone
}

interface Category {
    id: number
    name: string
    icone: string
    active: boolean
    Skills: Skills
}

function Languages() {

    const [languages, setLanguages] = useState<Languages[] | null>(null)
    const [categories, setCategories] = useState<Category[] | null>(null)

    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        const fetchLanguages = async () => {
            try {

                const res = await api.get("/langages/all")
                if(!res.data.success) return alert(res.data.message)
                const data: Languages[] = res.data.languages
                setLanguages(data)
                
            } catch (error) {
                console.log("Erreur: ", error)
            }
        }

        fetchLanguages()
    }, [])

    useEffect(() => {
        const fetchCategories = async () => {
            try {

                const res = await api.get("/categories/all")
                if(!res.data.success) return alert(res.data.success)
                
                const data: Category[] = res.data.categories
                setCategories(data)
                
            } catch (error) {
                console.log("Erreur: ", error)
            }
        }

        fetchCategories()
    }, [])

    return (
        <section className="w-full py-24 bg-white overflow-hidden">
            
            {/* --- TOP : GRILLE FIXE DES LANGAGES (Badge Style) --- */}
            <div className="max-w-7xl mx-auto px-6 mb-24">
                <div className="flex flex-wrap justify-center gap-4">
                    {languages?.map((lang, index) => (
                        <motion.div 
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ y: -5 }}
                            className={`flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-gray-100 shadow-sm text-gray-400 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/5 cursor-default`}
                        >
                            <motion.div className=" w-6 h-6">
                                <img src={lang.icone.url} alt="" />
                            </motion.div>
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
                        {categories?.map((cat, index) => (
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
                                    }`} dangerouslySetInnerHTML={{ __html: cat.icone }} />
                                    <span className="text-xl font-black uppercase tracking-tighter">{cat.name}</span>
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