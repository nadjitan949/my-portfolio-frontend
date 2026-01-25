import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiMail, FiUser, FiArrowRight, FiCheckCircle } from 'react-icons/fi'
import { useState } from 'react'
import api from '../api/axios'
import Button from '../ui/Button'

interface AuthModalProps {
    onClose: () => void
}

function AuthModal({ onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true)
    const [message, setMessages] = useState<string | "">("")
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const endpoint = isLogin ? "/login" : "/users/add"
        const payload = isLogin ? { email: formData.email } : formData

        try {
            const res = await api.post(endpoint, payload)
            if (res.data.success) {
                if (isLogin) {
                    localStorage.setItem("token", res.data.token)
                } else {
                    alert("Bienvenue parmi nous ! Votre compte a été créé.")
                }
                onClose()
            }
            setMessages(res.data.message)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed inset-0 z-200 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={onClose} className="absolute inset-0 bg-white/60 backdrop-blur-xl"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="relative w-full max-w-md bg-white rounded-[3rem] shadow-[0_40px_120px_rgba(0,0,0,0.07)] border border-slate-50 overflow-hidden p-10 md:p-14"
            >
                {/* Fermeture */}
                <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-600 transition-colors">
                    <FiX size={20} />
                </button>

                {/* Header Dynamique */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                        <FiCheckCircle size={24} />
                    </div>
                    <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">
                        {isLogin ? 'Bon retour' : 'Rejoindre l\'aventure'}
                    </h2>
                    <p className="text-slate-400 text-sm mt-2 font-light">
                        {isLogin ? 'Connectez-vous avec votre email.' : 'Créez votre compte en quelques secondes.'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <AnimatePresence mode="wait">
                        {!isLogin && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="space-y-6 overflow-hidden"
                            >
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Nom</label>
                                        <div className="flex items-center border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-2">
                                            <FiUser className="text-slate-300 mr-2" size={14} />
                                            <input
                                                required type="text" placeholder="Doe"
                                                className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200"
                                                onChange={(e) => setFormData({ ...formData, firstname: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="group">
                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Prénom</label>
                                        <div className="flex items-center border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-2">
                                            <input
                                                required type="text" placeholder="John"
                                                className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200"
                                                onChange={(e) => setFormData({ ...formData, lastname: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <div className="group">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 block">Adresse Email</label>
                        <div className="flex items-center border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-3">
                            <FiMail className="text-slate-300 mr-3" />
                            <input
                                required type="email" placeholder="john@example.com"
                                className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200"
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                    </div>

                    {message && (<div className='border border-red-500 bg-red-100 text-red-500 p-2 px-5 rounded-xl'>
                        <span className='text-sm font-medium'> {message} !</span>
                    </div>)}

                    <Button
                        type="submit"
                        className="w-full py-5 bg-blue-600 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 flex items-center justify-center gap-3"
                    >
                        {loading ? 'Traitement...' : isLogin ? 'Se connecter' : 'Créer mon compte'}
                        <FiArrowRight size={16} />
                    </Button>
                </form>

                {/* Toggle Login/Register */}
                <div className="mt-10 text-center">
                    <p className="text-slate-400 text-xs font-light">
                        {isLogin ? "Pas encore de compte ?" : "Déjà parmi nous ?"}
                        <Button
                            onClick={() => {
                                setIsLogin(!isLogin)
                                setMessages("")
                            }}
                            className="ml-2 text-blue-600 font-bold hover:underline underline-offset-4"
                        >
                            {isLogin ? "S'inscrire" : "Se connecter"}
                        </Button>
                    </p>
                </div>
            </motion.div>
        </section>
    );
}

export default AuthModal