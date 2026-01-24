import { motion } from 'framer-motion';
import { FiX, FiUser, FiBriefcase, FiMessageCircle, FiSend, FiPlus, FiCamera } from 'react-icons/fi';
import { useState, useRef } from 'react';
import api from '../../../api/axios';
import Button from '../../../ui/Button';

interface SendFeedBackProps {
    onClose: () => void;
}

function SendFeedBack({ onClose }: SendFeedBackProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        author: '',
        jobTitle: '',
        content: '',
        image: null as File | null
    });

    const defaultAvatar = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769275993/8380015_qklxw6.jpg"

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData({ ...formData, image: file })
            setPreview(URL.createObjectURL(file))
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        const data = new FormData()
        data.append('author', formData.author)
        data.append('jobTitle', formData.jobTitle)
        data.append('content', formData.content)
        if (formData.image) {
            data.append('image', formData.image)
        } else {
            data.append('image.url', defaultAvatar)
        }

        try {
            const res = await api.post("/feedbacks/add", data)
            if (res.data.success) {
                onClose()
                alert(res.data.message)
            }
        } catch (error) {
            console.error(error)
            alert("Oups! Une erreur est survenue lors de l'envoi.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <section className="fixed inset-0 z-150 flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={onClose} className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.08)] border border-white p-10 md:p-14"
            >
                <button onClick={onClose} className="absolute top-8 right-8 text-slate-300 hover:text-slate-500 transition-colors">
                    <FiX size={22} />
                </button>

                <div className="text-center mb-10">
                    <h2 className="text-2xl font-semibold text-slate-800 tracking-tight">Laiser un avis</h2>
                    <p className="text-slate-400 text-sm mt-2 font-light">Votre retour est précieux pour nous.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-10">
                    {/* Square Image Picker */}
                    <div className="flex justify-center">
                        <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                            <div className="w-28 h-28 rounded-[2rem] overflow-hidden shadow-2xl shadow-blue-500/10 ring-4 ring-slate-50 transition-transform group-hover:scale-105 active:scale-95">
                                <img src={preview || defaultAvatar} className="w-full h-full object-cover" alt="Avatar" />
                                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <FiCamera className="text-white" size={24} />
                                </div>
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-blue-600 text-white p-2 rounded-xl shadow-lg border-4 border-white">
                                <FiPlus size={16} />
                            </div>
                            <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Champ Auteur */}
                        <div className="group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 block">Nom Complet</label>
                            <div className="flex items-center border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-3">
                                <FiUser className="text-slate-300 mr-4" />
                                <input
                                    required type="text" placeholder="Ex: Salim"
                                    className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200"
                                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Champ Job */}
                        <div className="group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 block">Profession / JobTitle</label>
                            <div className="flex items-center border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-3">
                                <FiBriefcase className="text-slate-300 mr-4" />
                                <input
                                    required type="text" placeholder="Ex: Manager"
                                    className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200"
                                    onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Champ Message */}
                        <div className="group">
                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1 block">Message</label>
                            <div className="flex items-start border-b border-slate-100 group-focus-within:border-blue-500 transition-all py-3">
                                <FiMessageCircle className="text-slate-300 mr-4 mt-1" />
                                <textarea
                                    required placeholder="Votre expérience..."
                                    className="w-full bg-transparent outline-none text-sm font-medium text-slate-700 placeholder:text-slate-200 resize-none h-24"
                                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full py-5 bg-blue-600 text-white rounded-[1.2rem] text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
                    >
                        {loading ? "Envoi..." : "Envoyer le feedback"}
                        <FiSend size={14} />
                    </Button>
                </form>
            </motion.div>
        </section>
    );
}

export default SendFeedBack


