import { motion } from 'framer-motion'
import { FiArrowLeft, FiArrowUpRight, FiClock } from 'react-icons/fi'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../../../ui/Button'
import { useEffect, useState } from 'react'
import api from '../../../api/axios'
import FormInterests from '../../../components/FormInterests'

// Interfaces (Inchangées)
interface Image { url: string; public_id: string }
interface Service { id: number; title: string; image: Image; description: string; details: string; createdAt: string }

function ServicesDetails() {
    const [service, setService] = useState<Service | null>(null)
    const [loading, setLoading] = useState<boolean>(true) // État de chargement
    const [openForm, setOpenForm] = useState<boolean>(false)

    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchService = async () => {
            try {
                const res = await api.get(`/services/details/${id}`)
                if(res.data.success) {
                    setService(res.data.service)
                } else {
                    alert(res.data.message)
                }
            } catch (error) {
                console.log("Erreur: ", error)
            } finally {
                setLoading(false)
            }
        }
        fetchService()
    }, [id])

    // 1. Gestion du Skeleton Loader (Optionnel mais recommandé pour le UX)
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <motion.div 
                    animate={{ rotate: 360 }} 
                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                    className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
                />
            </div>
        )
    }

    // 2. Sécurité si le service n'existe pas
    if (!service) return <div className="text-center py-20">Service introuvable</div>

    return (
        <section className="relative min-h-screen bg-white text-black overflow-hidden px-6 md:px-12 lg:px-24 py-12 mb-80">
            
            {/* Effets de lumière */}
            <div className="absolute top-[-10%] right-[-5%] w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-[20%] left-[-5%] w-100 h-100 bg-blue-500/5 rounded-full blur-[100px] -z-10" />

            <div className="max-w-7xl mx-auto">
                {/* Bouton Retour */}
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 group mb-12 text-sm font-bold uppercase tracking-widest hover:text-blue-500 transition-colors"
                >
                    <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                    Retour
                </motion.button>

                {/* Header Section */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-20">
                    <div className="lg:col-span-8">
                        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <div className="flex items-center gap-4 mb-6">
                                <span className="w-12 h-px bg-blue-500"></span>
                                <span className="text-blue-500 uppercase tracking-[0.3em] text-xs font-bold">Détails du Service</span>
                            </div>
                            <h1 className="text-5xl md:text-8xl font-black leading-[0.9] tracking-tighter uppercase">
                                {service.title.split(' ')[0]} <br />
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">
                                    {service.title.split(' ').slice(1).join(' ')}
                                </span>
                            </h1>
                        </motion.div>
                    </div>
                    <div className="lg:col-span-4">
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-gray-400 text-lg leading-relaxed font-light border-l-2 border-gray-100 pl-6">
                            {service.description}
                        </motion.p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Image & Content */}
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }} className="lg:col-span-7 relative">
                        <div className="aspect-video w-full rounded-3xl overflow-hidden border border-gray-100 shadow-2xl">
                            <img src={service.image.url} alt={service.title} className="w-full h-full object-cover transition-all duration-1000" />
                        </div>

                        {/* CORRECTIF ICI : Valeur par défaut "" pour éviter l'erreur de type */}
                        <div className="mt-12 prose prose-xl max-w-none 
                            prose-headings:font-black prose-headings:tracking-tighter prose-headings:uppercase
                            prose-p:text-gray-500 prose-p:leading-relaxed
                            prose-li:text-gray-500
                            prose-strong:text-blue-500">
                            <div dangerouslySetInnerHTML={{ __html: service.details || "" }} />
                        </div>
                    </motion.div>

                    {/* Sidebar */}
                    <div className="lg:col-span-5">
                        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="sticky top-12 bg-blue-500 text-white p-10 rounded-4xl overflow-hidden shadow-2xl shadow-blue-500/20">
                            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
                            <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 italic">
                                Prêt à démarrer ? <FiArrowUpRight />
                            </h3>
                            <div className="space-y-6">
                                <Button onClick={() => setOpenForm(true)} className="w-full py-4 bg-white text-black font-bold uppercase tracking-widest rounded-xl hover:bg-white hover:text-black transition-all duration-500 shadow-lg">
                                    Lancer le projet
                                </Button>
                            </div>
                            <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between text-[10px] text-white/70 uppercase tracking-[0.2em]">
                                <div className="flex items-center gap-2">
                                    <FiClock />
                                    Publié le {new Date(service.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {openForm && (<FormInterests serviceId={id ? Number(id) : undefined} onClose={() => setOpenForm(false)}/>)}

        </section>
    );
}

export default ServicesDetails