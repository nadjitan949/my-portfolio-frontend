import { motion, useInView } from "framer-motion"
import { useRef, useEffect, useState } from "react"
import api from "../../../api/axios"
import Img from "../../../ui/Img"
// ✅ Interfaces ajustées au Payload
interface Icone {
    url: string
    public_id: string
}

interface Skill {
    id: number
    name: string
    image: Icone
    level: string
    description: string
}

interface Category {
    id: number
    name: string
    icone: string // Peut être un emoji ou du HTML
    Skills: Skill[]
}

function SkillBox({ skill }: { skill: Skill }) {
    const ref = useRef<HTMLDivElement>(null)
    const isInView = useInView(ref, { once: true, margin: "-20px" })

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="group bg-white border border-gray-100 rounded-3xl p-6 hover:border-indigo-500 hover:shadow-xl transition-all duration-500"
        >
            <div className="flex flex-col gap-5">
                <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-50 flex items-center justify-center">
                        <Img
                            src={skill.image.url}
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

// ✅ Composant Principal Tools
function Tools() {
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

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

    if (loading) return <div className="py-24 text-center font-bold text-gray-400">Chargement de la stack...</div>

    return (
        <section className="w-full py-24 bg-[#FCFCFC] pb-80">
            <div className="max-w-7xl mx-auto px-6">
                <div className="space-y-24">
                    {categories.map((cat) => (
                        <div key={cat.id} className="flex flex-col lg:flex-row gap-12">
                            {/* Titre de catégorie collé sur le côté */}
                            <div className="lg:w-1/4">
                                <div className="lg:sticky lg:top-24 space-y-4">
                                    <div className="w-14 h-14 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center text-2xl shadow-indigo-100/50">
                                        {/* Gère l'affichage si c'est du HTML (FontAwesome) ou un Emoji */}
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
                                    <SkillBox key={skill.id} skill={skill} />
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