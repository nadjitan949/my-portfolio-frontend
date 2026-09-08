import { motion, type Variants } from "framer-motion"
import { useEffect, useState } from "react"
import { FiExternalLink, FiUserCheck } from "react-icons/fi"
import api from "../../../api/axios"
import Img from "../../../ui/Img"

interface Collab {
    id: number
    fullname: string
    jobTitle: string
    link: string
    image: string
}

function Collabs() {
    const [collaborators, setCollaborators] = useState<Collab[] | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchCollabs = async () => {
            try {
                const res = await api.get("/collabs/all")
                if (res.data.success) {
                    setCollaborators(res.data.collabs || [])
                } else {
                    setCollaborators([])
                }
            } catch (error) {
                console.error("Erreur API:", error)
                setCollaborators([])
            } finally {
                setLoading(false)
            }
        }

        fetchCollabs()
    }, [])

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    }

    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }
        }
    }

    if (loading) {
        return (
            <div className="w-full py-16 flex justify-center items-center">
                <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-gray-50 border border-gray-100 text-gray-400 font-medium text-xs tracking-wide animate-pulse">
                    <FiUserCheck className="animate-spin text-blue-500" size={16} />
                    Chargement des collaborateurs...
                </div>
            </div>
        )
    }

    if (!collaborators || collaborators.length === 0) {
        return null
    }

    return (
        <section className="w-full bg-white py-12 px-6 md:px-12 lg:px-24">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className="max-w-7xl mx-auto flex flex-wrap justify-center items-stretch gap-8"
            >
                {collaborators.map((collab) => {
                    const CardContent = () => (
                        <div className="w-full flex flex-col items-center text-center my-auto">
                            {/* Avatar circulaire centré */}
                            <div className="relative mb-5 group/img">
                                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-md ring-4 ring-gray-100 group-hover:ring-blue-500/20 transition-all duration-500">
                                    <Img
                                        src={collab.image}
                                        alt={`Portrait de ${collab.fullname}`}
                                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                                    />
                                </div>

                                {/* Badge d'ouverture de lien */}
                                {collab.link && (
                                    <div className="absolute top-0 right-0 w-8 h-8 rounded-full bg-blue-500 text-white shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300">
                                        <FiExternalLink size={13} />
                                    </div>
                                )}
                            </div>

                            {/* Informations centrées */}
                            <div className="space-y-1.5 px-2 w-full">
                                <h3 className="text-base md:text-lg font-black text-gray-900 uppercase tracking-tight truncate group-hover:text-blue-600 transition-colors">
                                    {collab.fullname}
                                </h3>
                                <p className="text-xs md:text-sm font-medium text-gray-400 line-clamp-2 max-w-55 mx-auto leading-relaxed">
                                    {collab.jobTitle}
                                </p>
                            </div>

                            {/* Badge bouton "Voir le profil" */}
                            {collab.link && (
                                <div className="mt-5 inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-500 bg-blue-50/70 px-4 py-1.5 rounded-full group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                    <span>Voir le profil</span>
                                    <FiExternalLink size={12} />
                                </div>
                            )}
                        </div>
                    )

                    const cardClassName = "group w-full sm:w-[260px] md:w-[280px] flex flex-col justify-between items-center bg-white border border-gray-100 rounded-[32px] p-6 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30 transition-all duration-500"

                    if (collab.link) {
                        return (
                            <motion.a
                                key={collab.id}
                                variants={cardVariants}
                                href={collab.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                whileHover={{ y: -8 }}
                                className={`${cardClassName} cursor-pointer`}
                            >
                                <CardContent />
                            </motion.a>
                        )
                    }

                    return (
                        <motion.div
                            key={collab.id}
                            variants={cardVariants}
                            whileHover={{ y: -6 }}
                            className={`${cardClassName} cursor-default`}
                        >
                            <CardContent />
                        </motion.div>
                    )
                })}
            </motion.div>
        </section>
    )
}

export default Collabs