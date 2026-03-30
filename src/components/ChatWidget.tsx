import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMessageCircle, FiX, FiSend, } from "react-icons/fi"
import api from "../api/axios"
import { Loader,} from "lucide-react"

const initialMessage = {
    text: "Bonjour ! Ravi de vous voir ici. Comment puis-je vous aider ?",
    isBot: true
}

const BotProfil = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769083513/feedbacks/hjebozhnwchanvjx3qkn"

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([initialMessage])
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [chatLoad, setChatLoad] = useState(false)
    const [inputValue, setInputValue] = useState("")
    
    const sessionIdRef = useRef<string | null>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const initialSuggestions = [
        { text: "🤝 Travailler ensemble", color: "hover:bg-blue-50 text-blue-600 border-blue-100" },
        { text: "💼 Services", color: "hover:bg-indigo-50 text-indigo-600 border-indigo-100" },
        { text: "🚀 Projets", color: "hover:bg-purple-50 text-purple-600 border-purple-100" },
    ]

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages, chatLoad])

    const handleSend = async (text: string) => {
        if (!text.trim() || chatLoad) return
        
        setMessages(prev => [...prev, { text, isBot: false }])
        setInputValue("")
        setShowSuggestions(false)
        setChatLoad(true)

        try {
            const res = await api.post("/chat/messages", {
                message: text,
                sessionId: sessionIdRef.current
            })
            if (!sessionIdRef.current) sessionIdRef.current = res.data.sessionId
            setMessages(prev => [...prev, { text: res.data.response, isBot: true }])
        } catch (error) {
            console.log("Erreur: ", error)
            setMessages(prev => [...prev, { text: "Oups 😅 Un petit souci technique. Réessaie ?", isBot: true }])
        } finally {
            setChatLoad(false)
        }
    }

    return (
        <div className="fixed bottom-5 right-5 z-9999 flex flex-col items-end font-sans">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        // "Flottant" sur mobile grâce au max-h et aux marges automatiques
                        className="mb-4 w-[calc(100vw-40px)] md:w-95 h-[70vh] md:h-137.5 bg-white rounded-4xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden border border-gray-100"
                    >
                        {/* Header Minimaliste */}
                        <div className="bg-white border-b border-gray-50 p-5 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative">
                                    <img src={BotProfil} className="w-10 h-10 rounded-full object-cover border border-gray-100" alt="Bot" />
                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900 text-sm">Nadjitan Betan</h3>
                                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">Assistant IA</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400">
                                <FiX size={20} />
                            </button>
                        </div>

                        {/* Zone de messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-[#F8F9FA] flex flex-col gap-4 custom-scrollbar">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-end gap-2 ${msg.isBot ? "self-start" : "self-end flex-row-reverse"}`}
                                >
                                    {msg.isBot && <div className="w-6 h-6 rounded-full bg-gray-200 shrink-0 overflow-hidden text-[8px] flex items-center justify-center font-bold">Bot</div>}
                                    <div className={`max-w-[85%] px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
                                        msg.isBot 
                                        ? "bg-white text-gray-700 rounded-2xl rounded-bl-none border border-gray-100" 
                                        : "bg-black text-white rounded-2xl rounded-br-none"
                                    }`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    </div>
                                </motion.div>
                            ))}

                            {/* Indicateur de frappe */}
                            {chatLoad && (
                                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="self-start flex items-center gap-2 bg-white px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                                    <Loader size={15} className="animate-spin text-gray-400" /> <span className="text-gray-500 text-[15px]">Réflexion</span>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Suggestions */}
                        {showSuggestions && (
                            <div className="px-4 py-2 bg-[#F8F9FA] flex flex-wrap gap-2">
                                {initialSuggestions.map((sug, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleSend(sug.text)}
                                        className={`px-3 py-1.5 bg-white border border-gray-100 rounded-full text-[11px] font-semibold transition-all hover:shadow-md ${sug.color}`}
                                    >
                                        {sug.text}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Barre de saisie avec bouton d'envoi dédié */}
                        <div className="p-4 bg-white">
                            <div className="flex items-center gap-2 bg-gray-50 rounded-2xl px-2 py-1 border border-gray-100 focus-within:bg-white focus-within:border-gray-200 transition-all">
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Écrivez ici..."
                                    className="flex-1 bg-transparent text-sm outline-none text-gray-800 placeholder:text-gray-300 py-1"
                                    onKeyDown={(e) => e.key === "Enter" && handleSend(inputValue)}
                                />
                                <button
                                    onClick={() => handleSend(inputValue)}
                                    disabled={!inputValue.trim() || chatLoad}
                                    className={`p-3 rounded-xl transition-all ${
                                        inputValue.trim() && !chatLoad 
                                        ? "bg-black text-white scale-100 shadow-lg shadow-black/20" 
                                        : "bg-gray-200 text-gray-400 scale-95 opacity-50"
                                    }`}
                                >
                                    <FiSend size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bouton Trigger principal */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-xl relative"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90 }} animate={{ rotate: 0 }} exit={{ rotate: 90 }}>
                            <FiX size={24} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <FiMessageCircle size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    )
}

export default ChatWidget