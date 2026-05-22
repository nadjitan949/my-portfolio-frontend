import { motion, useInView, AnimatePresence } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import api from "../../../api/axios"
import Img from "../../../ui/Img"

// ✅ Interfaces ajustées au Payload
interface Skill {
    id: number
    name: string
    image: string
    level: string
    description: string
}

interface Category {
    id: number
    name: string
    icone: string // Peut être un emoji ou du HTML
    Skills: Skill[]
}

// ✅ Composant Enfant : SkillBox
function SkillBox({ skill, onClick }: { skill: Skill; onClick: () => void }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-20px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            onClick={onClick}
            className="group bg-white border border-gray-100 rounded-3xl p-6 hover:border-indigo-500 hover:shadow-xl transition-all duration-500 cursor-pointer"
        >
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                        <Img
                            src={skill.image}
                            alt={skill.name}
                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600">
                        {skill.level}
                    </span>
                </div>

                <div className="space-y-2">
                    <h4 className="text-lg font-black text-gray-900 group-hover:text-indigo-600 transition-colors">
                        {skill.name}
                    </h4>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                        {skill.description || "Aucune description fournie."}
                    </p>
                </div>

                <div className="w-full h-1 bg-gray-50 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={isInView ? { width: "100%" } : {}}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="h-full bg-indigo-500 opacity-20 group-hover:opacity-100 transition-opacity"
                    />
                </div>
            </div>
        </motion.div>
    )
}

// ✅ Composant Principal : Tools
function Tools() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    
    // État pour stocker le skill actuellement sélectionné à afficher dans le modal
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get("/categories/all")
                if (res.data.success) {
                    setCategories(res.data.categories)
                }
            } catch (err) {
                console.error("Erreur chargement skills:", err)
            } finally {
                setLoading(false)
            }
        }
        fetchSkills()
    }, [])

    // Empêcher le scroll de l'arrière-plan quand le modal est ouvert
    useEffect(() => {
        if (selectedSkill) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => { document.body.style.overflow = "" }
    }, [selectedSkill])

    // Fermeture avec la touche Échap
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setSelectedSkill(null)
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    if (loading) return <div className="py-24 text-center font-bold text-gray-400">Chargement de la stack...</div>

    return (
        <section className="w-full py-24 bg-[#FCFCFC] pb-80 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-24">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col lg:flex-row gap-12">
                            {/* Titre de catégorie collé sur le côté */}
                            <div className="lg:w-1/4">
                                <div className="lg:sticky lg:top-24 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-2xl shadow-indigo-100/50">
                                        {cat.icone.includes('<i') ? (
                                            <div dangerouslySetInnerHTML={{ __html: cat.icone }} className="text-indigo-500 text-xl" />
                                        ) : (
                                            cat.icone
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-black text-gray-900 leading-tight uppercase tracking-tighter">
                                        {cat.name.split(' & ').map((part, i) => (
                                            <span key={i} className="block">{part}</span>
                                        ))}
                                    </h3>
                                    <div className="w-10 h-1.5 bg-indigo-500 rounded-full" />
                                </div>
                            </div>

                            {/* Grille des Skills */}
                            <div className="lg:w-3/4 grid grid-cols-1 md:grid-cols-2 gap-6">
                                {cat.Skills && cat.Skills.map((skill) => (
                                    <SkillBox 
                                        key={skill.id} 
                                        skill={skill} 
                                        onClick={() => setSelectedSkill(skill)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ MODAL - Géré de manière fluide avec AnimatePresence */}
            <AnimatePresence>
                {selectedSkill && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                        {/* Backdrop sombre et flouté */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedSkill(null)}
                            className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
                        />

                        {/* Boîte du Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 15 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 15 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="relative w-full max-w-lg bg-white border border-gray-100 shadow-2xl rounded-3xl p-6 sm:p-8 overflow-hidden z-10"
                        >
                            {/* Bouton Fermer en haut à droite */}
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                aria-label="Fermer le modal"
                            >
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Contenu du Modal */}
                            <div className="flex flex-col gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center flex-shrink-0 border border-gray-100">
                                        <Img
                                            src={selectedSkill.image}
                                            alt={selectedSkill.name}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <span className="inline-block text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-600">
                                            {selectedSkill.level}
                                        </span>
                                        <h4 className="text-xl font-black text-gray-900">
                                            {selectedSkill.name}
                                        </h4>
                                    </div>
                                </div>

                                <div className="w-full h-px bg-gray-100" />

                                {/* Zone de description avec un scroll stylisé si le texte est super long */}
                                <div className="space-y-2">
                                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block">
                                        Description complète
                                    </span>
                                    <div className="max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
                                        <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                            {selectedSkill.description || "Aucune description détaillée disponible pour le moment."}
                                        </p>
                                    </div>
                                </div>

                                {/* Ligne de décoration finale reprenant l'esprit de ta jauge */}
                                <div className="w-full h-1 bg-indigo-500 rounded-full" />
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Tools