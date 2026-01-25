import { FiCalendar, FiCheckCircle, FiPenTool, FiSearch, FiUploadCloud } from "react-icons/fi"
import Button from "../../../ui/Button"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { useNavigate } from "react-router-dom"

const DeskImage = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284860/Rectangle_59l_vurfvy.png"
const Background = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284843/Rectangle_60_mv4b1f.png"

function WorkFlow() {

    const navigate = useNavigate()
    const gotoServices = () => navigate("/services")

    const leftRef = useRef<HTMLDivElement | null>(null)
    const rightRef = useRef<HTMLDivElement | null>(null)
    const gridRef = useRef<HTMLDivElement | null>(null);
    const isGridInView = useInView(gridRef, { once: true, margin: "-50px" })

    const isLeftInView = useInView(leftRef, { once: true, margin: "-100px" })
    const isRightInView = useInView(rightRef, { once: true, margin: "-100px" })

    const workflowSteps = [
        { icon: <FiSearch size={28} />, label: "Analyse" },
        { icon: <FiCalendar size={28} className="text-yellow-500" />, label: "Planification" },
        { icon: <FiPenTool size={28} className="text-pink-500" />, label: "Conception" },
        { icon: <FiUploadCloud size={28} className="text-blue-500" />, label: "Déploiement" },
        { icon: <FiCheckCircle size={28} className="text-green-500" />, label: "Livraison" },
    ]

    // Variantes pour le conteneur des étapes (gère le décalage entre les enfants)
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1, // Délai entre chaque icône
            }
        }
    }

    const itemGrow = {
        hidden: { opacity: 0, scale: 0.5 },
        visible: { opacity: 1, scale: 1 }
    }

    const itemFromLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { opacity: 1, x: 0 }
    }

    const itemFromRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { opacity: 1, x: 0 }
    }

    return (
        <section className="w-full p-5 lg:px-15">
            <div className=" flex flex-col lg:flex-row items-center justify-center gap-5">
                <motion.div
                    ref={leftRef}
                    variants={itemFromLeft}
                    initial="hidden"
                    animate={isLeftInView ? "visible" : "hidden"}
                    transition={{ duration: 0.1 }}
                    className="h-150 lg:w-[45%] rounded-[40px] relative overflow-hidden flex items-center justify-center"
                >
                    <img src={DeskImage} alt="" className="object-cover w-full h-full" />
                    <div className="absolute w-full h-full bg-black/50 p-10 md:p-15 flex flex-col gap-10">
                        <motion.div variants={itemFromLeft} initial="hidden" animate={isLeftInView ? "visible" : "hidden"}>
                            <span className="text-white text-4xl font-medium">Organisation</span>
                        </motion.div>

                        <motion.div variants={itemFromLeft} initial="hidden" animate={isLeftInView ? "visible" : "hidden"}>
                            <p className="text-white">
                                Un cadre sain est essentiel pour des projets solides et durables. Je privilégie transparence, respect et communication claire, en collaborant étroitement avec mes partenaires, afin de favoriser confiance et efficacité, garantissant des résultats de qualité à chaque étape.
                            </p>
                        </motion.div>

                        <motion.div variants={itemFromLeft} initial="hidden" animate={isLeftInView ? "visible" : "hidden"} className="flex items-center gap-4">
                            <div className="flex -space-x-5">
                                <img src="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769275993/8380015_qklxw6.jpg" alt="" className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" />
                                <img src="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769275993/8380015_qklxw6.jpg" alt="" className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" />
                                <img src="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769275993/8380015_qklxw6.jpg" alt="" className="w-8 h-8 md:w-12 md:h-12 rounded-full border-2 border-white object-cover" />
                                <div className="w-8 h-8 md:w-12 md:h-12 rounded-full backdrop-blur-md border-2 border-white flex items-center justify-center text-sm font-semibold text-white">
                                    +30
                                </div>
                            </div>
                            <div className="flex flex-col text-white">
                                <span className="text-md md:text-lg font-semibold">Collaborations</span>
                                <span className="text-[10px] md:text-sm text-white/70">projets menés avec succès</span>
                            </div>
                        </motion.div>

                        <motion.div variants={itemFromLeft} initial="hidden" animate={isLeftInView ? "visible" : "hidden"} className="mt-auto">
                            <Button onClick={gotoServices} className="font-semibold bg-white px-5 py-3 rounded-[5px] hover:bg-transparent hover:text-white">Mes services</Button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Bloc Workflow */}
                <motion.div
                    ref={rightRef}
                    variants={itemFromRight}
                    initial="hidden"
                    animate={isRightInView ? "visible" : "hidden"}
                    transition={{ duration: 0.8 }}
                    className="h-190 lg:h-150 lg:w-[40%] rounded-[40px] relative overflow-hidden flex items-center justify-center"
                >
                    <img src={Background} alt="" className="object-cover w-full h-full" />
                    <div className="absolute w-full h-full p-8 md:p-15 flex flex-col gap-12">
                        {/* Titre + texte */}
                        <motion.div variants={itemFromRight} initial="hidden" animate={isRightInView ? "visible" : "hidden"} className="flex flex-col gap-10 max-w-120">
                            <span className="text-4xl font-medium">Comment je travaille</span>
                            <p className="text-gray-500 font-semibold">
                                Chaque projet suit un processus structuré, pensé pour garantir qualité,
                                efficacité et résultats durables, de l’analyse des besoins jusqu’à la livraison finale,
                                avec une attention particulière portée à la clarté, à l’anticipation des risques et à l’optimisation
                                des délais, afin de concevoir des solutions fiables, évolutives et parfaitement alignées avec les objectifs fixés.
                            </p>
                        </motion.div>

                        {/* Grid Workflow */}
                        <motion.div
                            ref={gridRef} // On surveille l'arrivée de la grille entière
                            variants={containerVariants}
                            initial="hidden"
                            // L'animation se déclenche uniquement quand la grille arrive à l'écran
                            animate={isGridInView ? "visible" : "hidden"}
                            className="grid grid-cols-3 gap-6 w-full md:max-w-90 mt-auto"
                        >
                            {workflowSteps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    variants={itemGrow} // Chaque item utilise la variante itemGrow
                                    className="flex flex-col items-center justify-center bg-white rounded-2xl h-23"
                                >
                                    {step.icon}
                                    <span className="font-medium text-gray-500 text-[10px] md:text-sm">{step.label}</span>
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
