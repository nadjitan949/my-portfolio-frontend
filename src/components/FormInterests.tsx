import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiSend, FiMessageSquare, FiHash, FiShare2, FiLayers } from 'react-icons/fi'
import { useEffect, useState } from 'react'
import api from '../api/axios'
import Button from '../ui/Button'

interface Service {
    id: number
    title: string
    image: { url: string }
}

interface FormInterestsProps {
    serviceId?: number | null
    onClose: () => void
}

function FormInterests({ serviceId, onClose }: FormInterestsProps) {
    const [services, setServices] = useState<Service[]>([])
    const [selectedService, setSelectedService] = useState<Service | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [formData, setFormData] = useState({
        media: 'WhatsApp',
        contact: '',
        message: 'Salut, je suis intéressé par ce service'
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await api.get('/services/all');
                if (res.data.success) {
                    setServices(res.data.services);
                    if (serviceId) {
                        const found = res.data.services.find((s: Service) => s.id === serviceId);
                        if (found) setSelectedService(found);
                    }
                }
            } catch (err) { console.error(err) }
        };
        fetchData()
    }, [serviceId])

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {

            setLoading(true)

            const res = await api.post("/interests/add", 
                {
                    media: formData.media,
                    contact: formData.contact,
                    message: formData.message,
                    serviceId: selectedService?.id
                }
            )

            setLoading(false)
            if(!res.data.success) return alert(res.data.message)
            alert(res.data.message)
            
        } catch (error) {
            setLoading(false)
            console.log("Erreur: ", error)
        }
    }

    return (
        <section className="fixed inset-0 z-100 flex items-center justify-center p-6">
            {/* Overlay - Flou léger et élégant */}
            <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose} className="absolute inset-0 bg-black/50" 
            />

            <motion.div 
                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-137.5"
            >
                {/* --- PANNEAU VISUEL (GAUCHE) - Plus sobre --- */}
                <div className="md:w-5/12 bg-slate-50 relative p-10 flex flex-col border-r border-slate-100">
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2">
                            <span className="h-1 w-4 bg-blue-500 rounded-full"></span>
                            <span className="text-blue-600 uppercase tracking-widest text-[10px] font-semibold">Nouveau Projet</span>
                        </div>
                        <h2 className="text-2xl font-medium text-slate-800 leading-tight">
                            {selectedService ? selectedService.title : "Parlons de votre vision"}
                        </h2>
                        <p className="text-slate-500 text-sm font-light leading-relaxed">
                            Remplissez ces quelques informations pour que nous puissions échanger sur votre projet.
                        </p>
                    </div>

                    <div className="mt-auto relative h-40 w-full rounded-xl overflow-hidden shadow-inner">
                        <AnimatePresence mode="wait">
                            <motion.img 
                                key={selectedService?.id || 'default'}
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                src={selectedService?.image.url || "https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=1000"}
                                alt={`${selectedService?.title} image`}
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                        </AnimatePresence>
                        <div className="absolute inset-0 bg-blue-500/10 mix-blend-overlay" />
                    </div>
                </div>

                {/* --- FORMULAIRE (DROITE) - Épuré --- */}
                <div className="md:w-7/12 p-10 bg-white">
                    <div className="flex justify-between items-center mb-10">
                        <h3 className="text-lg font-semibold text-slate-800">Votre demande</h3>
                        <Button onClick={onClose} className="text-slate-400 hover:text-blue-500 transition-colors">
                            <FiX size={20} />
                        </Button>
                    </div>

                    <form className="space-y-8" onSubmit={handleSubmit}>
                        {/* SELECT SERVICE */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Service souhaité</label>
                            <div className="relative group">
                                <FiLayers className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                <select 
                                    className="w-full pl-7 py-2 outline-none border-b border-slate-200 focus:border-blue-500 bg-transparent text-sm text-slate-700 cursor-pointer transition-all"
                                    value={selectedService?.id || ""}
                                    onChange={(e) => {
                                        const s = services.find(ser => ser.id === parseInt(e.target.value));
                                        if (s) setSelectedService(s);
                                    }}
                                >
                                    <option value="" disabled>Sélectionner un service...</option>
                                    {services.map(s => (
                                        <option key={s.id} value={s.id}>{s.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* RÉSEAU SOCIAL & CONTACT */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Réseau préféré</label>
                                <div className="relative group">
                                    <FiShare2 className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    <input 
                                        type="text"
                                        placeholder="Ex: WhatsApp"
                                        className="w-full pl-7 py-2 outline-none border-b border-slate-200 focus:border-blue-500 text-sm placeholder:text-slate-300 transition-all"
                                        onChange={(e) => setFormData({...formData, media: e.target.value})}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Votre {formData.media || "Contact"}</label>
                                <div className="relative group">
                                    <FiHash className="absolute left-0 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                    <input 
                                        type="text"
                                        placeholder="Numéro ou Identifiant"
                                        className="w-full pl-7 py-2 outline-none border-b border-slate-200 focus:border-blue-500 text-sm placeholder:text-slate-300 transition-all"
                                        onChange={(e) => setFormData({...formData, contact: e.target.value})}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* MESSAGE */}
                        <div className="space-y-2">
                            <label className="text-[11px] font-medium text-slate-400 uppercase tracking-wider">Message</label>
                            <div className="relative group">
                                <FiMessageSquare className="absolute left-0 top-3 text-slate-300 group-focus-within:text-blue-500 transition-colors" />
                                <textarea 
                                    className="w-full pl-7 py-2 outline-none border-b border-slate-200 focus:border-blue-500 text-sm placeholder:text-slate-300 resize-none h-20 transition-all"
                                    value={formData.message}
                                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                                />
                            </div>
                        </div>

                        <Button type='submit' className={`w-full mt-4 py-4 ${loading ? 'bg-gray-500' : 'bg-slate-900'} text-white hover:bg-blue-600 rounded-lg text-xs font-semibold uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-lg shadow-slate-200`}>
                            {loading ? 'Veuillez patienter...' : 'Envoyer la demande'}
                            <FiSend size={14} />
                        </Button>
                    </form>
                </div>
            </motion.div>
        </section>
    );
}

export default FormInterests;