import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FiMessageCircle, FiX, FiArrowUp, FiUser } from "react-icons/fi"
import BotProfil from "../assets/Rectangle 62 - Copie.png"
import api from "../api/axios"

const initialMessage = {
    text: "Bonjour ! Ravi de vous voir ici. Comment puis-je vous aider ?",
    isBot: true
}

function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([initialMessage])
    const [showSuggestions, setShowSuggestions] = useState(true)
    const [chatLoad, setChatLoad] = useState(false)
    const sessionIdRef = useRef<string | null>(null)

    const messagesEndRef = useRef<HTMLDivElement>(null)

    const initialSuggestions = [
        { text: "🤝 Travailler ensemble", color: "bg-blue-50 text-blue-600 border-blue-100" },
        { text: "💼 Services & Tarifs", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
        { text: "🚀 Voir tes projets", color: "bg-purple-50 text-purple-600 border-purple-100" },
        { text: "☕ Juste dire coucou", color: "bg-orange-50 text-orange-600 border-orange-100" },
    ]

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages]) // Scroll à chaque nouveau message

    const handleSend = async (text: string) => {
        if (!text.trim()) return

        setMessages(prev => [...prev, { text, isBot: false }])
        setShowSuggestions(false)

        try {
            // 2️⃣ Appel API ORBIT
            setChatLoad(true)
            const res = await api.post("/chat/messages", {
                message: text,
                sessionId: sessionIdRef.current
            })

            if (!sessionIdRef.current) {
                sessionIdRef.current = res.data.sessionId
            }

            const botMessage = res.data.response
            setMessages(prev => [...prev, { text: botMessage, isBot: true }])
            setChatLoad(false)

        } catch (error) {
            console.error("Erreur chatbot:", error)

            setMessages(prev => [
                ...prev,
                {
                    text: "Oups 😅 Orion a rencontré un petit souci. Réessaie plus tard 🚀",
                    isBot: true
                }
            ])
        }
    }

    const handleInputSend = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const inputElement = e.target as HTMLInputElement;
        if (e.key === 'Enter' && inputElement.value.trim()) {
            handleSend(inputElement.value);
            inputElement.value = ''; // Vide l'input après envoi
        }
    }

    const handleButtonClickSend = () => {
        const inputElement = document.querySelector<HTMLInputElement>('input[placeholder="Posez votre question..."]')
        if (inputElement && inputElement.value.trim()) {
            handleSend(inputElement.value);
            inputElement.value = ''; // Vide l'input après envoi
        }
    }

    const handleCloseChat = async () => {
        if (sessionIdRef.current) {
            try {
                await api.post("/chat/end-session", { sessionId: sessionIdRef.current })
            } catch (error) {
                console.error("Erreur lors de la suppression de session :", error)
            }
        }

        // Reset front
        setIsOpen(false)
        setMessages([initialMessage])
        setShowSuggestions(true)
        sessionIdRef.current = null
    }

    return (
        <div className="fixed bottom-10 right-10 z-50 flex flex-col items-end font-sans">

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 30 }}
                        className="w-105 h-162.5 bg-white rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.25)] overflow-hidden flex flex-col mb-6"
                    >
                        {/* Header Premium Noir */}
                        <div className="bg-black px-10 py-5 text-white relative">
                            <h3 className="font-bold text-3xl tracking-tighter">Nadjitan Betan</h3>
                            <div className="flex items-center gap-2 mt-3">
                                <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
                                <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-semibold">Expert Web & AI • Online</p>
                            </div>
                        </div>

                        {/* Zone de Discussion */}
                        <div className="flex-1 overflow-y-auto p-5 bg-[#F8F9FA] flex flex-col gap-6 languages scroll-smooth">
                            {messages.map((msg, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex items-start gap-3 ${msg.isBot ? "self-start" : "self-end flex-row-reverse"}`}
                                >
                                    {/* Avatar */}
                                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${msg.isBot ? "bg-gray-200 overflow-hidden text-black" : "bg-gray-200 text-black"
                                        }`}>
                                        {msg.isBot ? (<motion.img src={BotProfil} className="w-full h-full" />) : <FiUser size={18} />}
                                    </div>
                                    {/* Contenu du message */}
                                    <div
                                        className={`max-w-[85%] py-2 px-5 rounded-3xl text-[13px] leading-relaxed ${msg.isBot ? "bg-white text-black" : "bg-black text-white"}`}
                                    >
                                        <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} /> {/* Pour le scroll automatique */}

                            {/* Suggestions : Mode Row & Wrap */}
                            <AnimatePresence>
                                {showSuggestions && (
                                    <motion.div
                                        exit={{ opacity: 0, y: 10 }}
                                        className="flex flex-wrap items-center justify-center gap-2.5 mt-2"
                                    >
                                        {initialSuggestions.map((sug, i) => (
                                            <motion.button
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 * i }}
                                                onClick={() => handleSend(sug.text)}
                                                className={`px-5 py-3 rounded-full text-[13px] font-medium transition-all hover:scale-105 active:scale-95 cursor-pointer ${sug.color}`}
                                            >
                                                {sug.text}
                                            </motion.button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Barre d'envoi */}
                        <div className="p-7 bg-white border-t border-gray-50 flex items-center gap-4">
                            <input
                                type="text"
                                placeholder="Posez votre question..."
                                className="flex-1 text-[15px] outline-none text-gray-800 placeholder:text-gray-300"
                                onKeyDown={handleInputSend}
                            />
                            <motion.button
                                whileHover={{ scale: 1.1, backgroundColor: "#333" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleButtonClickSend}
                                className="bg-black text-white w-10 h-10 flex items-center justify-center rounded-full shadow-xl cursor-pointer transition-colors"
                            >
                                {chatLoad ? (<motion.div
                                    className="border w-3 h-3 rounded-xs bg-white ">
                                </motion.div>) : <FiArrowUp size={20} />}
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bouton de déclenchement XL */}
            <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => {
                    if (isOpen) {
                        handleCloseChat()
                    } else {
                        setIsOpen(true)
                    }
                }}
                className="w-15 h-15 bg-black rounded-full flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.35)] z-50"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div
                            key="close"
                            initial={{ opacity: 0, rotate: -45 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 45 }}
                        >
                            <FiX size={20} className="text-white" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="msg"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                        >
                            <FiMessageCircle size={20} className="text-white" />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
}

export default ChatWidget