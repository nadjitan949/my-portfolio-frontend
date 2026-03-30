import { FiCalendar, FiCheckCircle, FiPenTool, FiSearch, FiUploadCloud, FiArrowRight } from "react-icons/fi"
import Button from "../../../ui/Button"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"
import Img from "../../../ui/Img"

const DeskImage = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284860/Rectangle_59l_vurfvy.png"
const Background = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284843/Rectangle_60_mv4b1f.png"

function WorkFlow() {
    const navigate = useNavigate()
    const gotoServices = () => navigate("/services")

    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const workflowSteps = [
        { icon: <FiSearch />, label: "Analyse", color: "text-blue-500" },
        { icon: <FiCalendar />, label: "Planification", color: "text-amber-500" },
        { icon: <FiPenTool />, label: "Conception", color: "text-rose-500" },
        { icon: <FiUploadCloud />, label: "Déploiement", color: "text-indigo-500" },
        { icon: <FiCheckCircle />, label: "Livraison", color: "text-emerald-500" },
    ]

    const fadeInUp = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    }

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.12 }
        }
    }

    return (
        <section ref={containerRef} className="w-full py-12 px-6 lg:px-20 bg-gray-50/50">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 items-stretch">
                
                {/* --- CARTE GAUCHE : PHILOSOPHIE --- */}
                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="relative group overflow-hidden rounded-[2.5rem] lg:w-1/2 min-h-150 flex flex-col"
                >
                    <Img src={DeskImage} alt="Workspace" className="absolute inset-0 object-cover w-full h-full transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent" />
                    
                    <div className="relative mt-auto p-8 md:p-12 flex flex-col gap-6">
                        <span className="inline-block px-4 py-1 rounded-full bg-white/10 backdrop-blur-md text-white text-xs font-medium tracking-widest uppercase w-fit">
                            Valeurs
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Organisation</h2>
                        <p className="text-gray-200 leading-relaxed max-w-md">
                            Un cadre sain est essentiel pour des projets solides. Je privilégie la transparence et la communication claire pour garantir des résultats de haute précision.
                        </p>
                        
                        <div className="flex items-center gap-6 py-4">
                            <div className="flex -space-x-3">
                                {[1, 2, 3].map((i) => (
                                    <Img key={i} src={`https://i.pravatar.cc/150?u=${i}`} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-white object-cover shadow-lg" />
                                ))}
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-orange-500 border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-lg">
                                    +30
                                </div>
                            </div>
                            <div className="text-white">
                                <p className="text-lg font-bold leading-none">Collaborations</p>
                                <p className="text-sm text-gray-300">Projets menés avec succès</p>
                            </div>
                        </div>

                        <Button onClick={gotoServices} className="group mt-4 flex items-center gap-2 w-fit bg-white text-black font-bold py-4 px-8 rounded-xl transition-all hover:bg-orange-500 hover:text-white">
                            Mes services <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </Button>
                    </div>
                </motion.div>

                {/* --- CARTE DROITE : METHODOLOGIE --- */}
                <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    transition={{ delay: 0.2 }}
                    className="relative overflow-hidden rounded-[2.5rem] lg:w-1/2 min-h-125 bg-white border border-gray-100 shadow-2xl shadow-gray-200/50 flex flex-col"
                >
                    <Img src={Background} alt="Pattern" className="absolute top-0 right-0 w-full h-full object-cover opacity-10 pointer-events-none" />
                    
                    <div className="relative p-8 md:p-12 flex flex-col h-full">
                        <div className="mb-10">
                            <h2 className="text-4xl font-bold text-gray-900 mb-6">Comment je travaille</h2>
                            <p className="text-gray-500 text-lg leading-relaxed font-medium italic">
                                "La structure est la clé de la créativité."
                            </p>
                            <p className="mt-4 text-gray-600 leading-relaxed">
                                Chaque projet suit un processus rigoureux, de l’analyse des besoins jusqu’à la livraison finale, pour des solutions fiables et évolutives.
                            </p>
                        </div>

                        <motion.div 
                            variants={staggerContainer}
                            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-auto"
                        >
                            {workflowSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ y: -5, backgroundColor: "#fff" }}
                                    variants={{
                                        hidden: { opacity: 0, scale: 0.9 },
                                        visible: { opacity: 1, scale: 1 }
                                    }}
                                    className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gray-50 border border-gray-100 transition-shadow hover:shadow-xl hover:shadow-gray-200/40"
                                >
                                    <div className={`text-2xl mb-2 ${step.color}`}>
                                        {step.icon}
                                    </div>
                                    <span className="font-bold text-gray-700 text-xs md:text-sm tracking-wide">
                                        {step.label}
                                    </span>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>

            </div>
        </section>
    )
}

export default WorkFlow