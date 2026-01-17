import { FiArrowRight, FiDownload } from "react-icons/fi"
import BlueHero from "../../../assets/pngwing.com (2) 1.png"
import VioletHero from "../../../assets/Rectangle 59 (1).png"
import PoseOne from "../../../assets/upscalemedia-transformed 1.png"
import YellowHero from "../../../assets/Rectangle 59.png"
import Button from "../../../ui/Button"
import { FaGithub, FaLinkedin } from "react-icons/fa6"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import MyCV from "../../../cv/Nadjitan_betan.pdf"

function Hero() {
    const [activeIndex, setActiveIndex] = useState(0)
    const [showContent, setShowContent] = useState(false) // content invisible au départ
    const bigWidth = 64
    const smallWidth = 17

    const nextIndex = () => setActiveIndex(prev => (prev + 1) % 3)

    const handleDownloadCV = () => {
        const link = document.createElement("a")
        link.href = MyCV
        link.download = "CV_Nadjitan_Betan.pdf"
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
    };

    // Carousel principal
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex(prev => (prev + 1) % 3)
        }, 60 * 1000)
        return () => clearInterval(interval)
    }, [])

    // Effet pour delay le contenu après 1s du changement d'index
    useEffect(() => {
        // cacher le contenu de manière asynchrone pour éviter le warning
        const hide = setTimeout(() => setShowContent(false), 0)

        // révéler après 1s
        const show = setTimeout(() => setShowContent(true), 500)

        return () => {
            clearTimeout(hide)
            clearTimeout(show)
        }
    }, [activeIndex])

    return (
        <>
            <section className="px-15 h-[80vh] hidden lg:block">
                <div className="h-full flex items-center justify-between relative">

                    {/* Bloc principal */}
                    <div
                        className="h-full rounded-[70px] relative bg-[#D8EFFF] transition-all duration-700"
                        style={{ width: activeIndex === 0 ? `${bigWidth}%` : `${smallWidth}%` }}
                    >

                        {/* Image de fond */}
                        <div className="absolute w-full h-full flex items-center justify-center">
                            <img src={BlueHero} alt="" className="" />
                        </div>


                        <AnimatePresence>
                            {activeIndex !== 0 && (
                                <motion.div
                                    key="overlay" // important pour que Framer Motion gère correctement l'animation exit
                                    initial={{ opacity: 0 }}      // état au montage
                                    animate={{ opacity: 0.4 }}    // état quand actif
                                    exit={{ opacity: 0 }}         // état au démontage
                                    transition={{ duration: 0.9 }} // durée de la transition
                                    className="absolute inset-0 w-full h-full rounded-[70px] bg-black"
                                ></motion.div>
                            )}
                        </AnimatePresence>



                        <motion.div
                            className="absolute z-20 p-15"
                            animate={{
                                color: activeIndex === 0 ? "black" : "white",
                                top: activeIndex === 0 ? 0 : "50%",      // top-10 => 2.5rem, sinon 50% centré
                                left: activeIndex === 0 ? 0 : "50%",   // left-15 => 3.75rem, sinon 50% centré
                                x: activeIndex === 0 ? 0 : "-50%",             // centrage horizontal
                                y: activeIndex === 0 ? 0 : "-50%",             // centrage vertical
                                rotate: activeIndex === 0 ? 0 : -90
                            }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                            <h1 className="text-6xl font-bold whitespace-nowrap">Developpeur</h1>
                        </motion.div>

                        {/* Contenu avec delay */}
                        <AnimatePresence>
                            {showContent && activeIndex === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1 }}
                                    className="absolute w-full h-full"
                                >
                                    <div className="absolute w-70 xl:w-100 bottom-0 right-0 ">
                                        <img src={PoseOne} alt="" />
                                    </div>

                                    <div className="w-[60%] h-full p-15 absolute flex flex-col justify-between">
                                        <div className="w-full space-y-15 mt-30">
                                            <p className="font-medium text-sm xl:text-[15px] 2xl:text-xl ">
                                                Je suis développeur web et mobile, spécialisé dans la création
                                                d’applications modernes et performantes. J’interviens également
                                                dans le développement de modèles d’intelligence artificielle et
                                                l’analyse de données, en combinant technologie, innovation et performance.
                                            </p>
                                        </div>

                                        <div className="w-500px space-y-3">
                                            <Button
                                                type="button"
                                                onClick={handleDownloadCV}
                                                className="flex items-center justify-baseline gap-2 px-5 py-2 rounded-full bg-black text-white hover:bg-gray-700"
                                            >
                                                <FiDownload /> <span>Telecharger mon cv</span>
                                            </Button>

                                            <div className="flex gap-2">
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                                                    <FaGithub size={25} />
                                                </div>
                                                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-white">
                                                    <FaLinkedin size={25} className="text-[#2375C2]" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-2 -right-2 flex flex-col items-end">
                                        <div className="w-27 h-17 rounded-full shdw_top mr-2 mt-2"></div>
                                        <div className="flex flex-row-reverse items-end">
                                            <Button
                                                type="button"
                                                onClick={nextIndex}
                                                className="border-8 border-white bg-black w-27 h-17 z-2 rounded-full flex items-center justify-center hero_button"
                                            >
                                                <FiArrowRight size={30} className="text-white" />
                                            </Button>
                                            <div className="w-27 h-15 rounded-full shdw_left mb-2"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bloc droit 1 */}
                    <div
                        className="h-full rounded-[70px] transition-all bg-[#feb8ffb2] duration-700 relative"
                        style={{ width: activeIndex === 1 ? `${bigWidth}%` : `${smallWidth}%` }}
                    >

                        <div className="absolute w-full h-full flex items-center justify-center">
                            <img src={VioletHero} alt="" className="" />
                        </div>


                        <AnimatePresence>
                            {activeIndex !== 1 && (
                                <motion.div
                                    key="overlay" // important pour que Framer Motion gère correctement l'animation exit
                                    initial={{ opacity: 0 }}      // état au montage
                                    animate={{ opacity: 0.4 }}    // état quand actif
                                    exit={{ opacity: 0 }}         // état au démontage
                                    transition={{ duration: 0.9 }} // durée de la transition
                                    className="absolute inset-0 w-full h-full rounded-[70px] bg-black"
                                ></motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="absolute z-20 p-15"
                            animate={{
                                color: activeIndex === 1 ? "black" : "white",
                                top: activeIndex === 1 ? 0 : "50%",      // top-10 => 2.5rem, sinon 50% centré
                                left: activeIndex === 1 ? 0 : "50%",   // left-15 => 3.75rem, sinon 50% centré
                                x: activeIndex === 1 ? 0 : "-50%",             // centrage horizontal
                                y: activeIndex === 1 ? 0 : "-50%",             // centrage vertical
                                rotate: activeIndex === 1 ? 0 : -90
                            }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                            <h1 className="text-6xl font-bold whitespace-nowrap">Insights</h1>
                        </motion.div>

                        {/* Contenu avec delay */}
                        <AnimatePresence>
                            {showContent && activeIndex === 1 && (
                                <motion.div
                                    className="w-full h-full p-6 md:p-10 xl:p-15 flex flex-col lg:flex-row relative overflow-hidden"
                                >
                                    <div className="w-full lg:w-[80%] xl:w-[70%] flex flex-col justify-between mt-12 md:mt-16 xl:mt-20 z-10">
                                        <div className="space-y-2 pt-10">
                                            <p className="max-w-full xl:max-w-120 text-sm xl:text-base text-black/70">
                                                Quelques chiffres concrets qui résument mon approche.
                                            </p>
                                        </div>

                                        {/* Stats : Grid 1 col sur mobile, 3 sur Laptop/Desktop */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 xl:gap-6 mt-4 xl:mt-10">
                                            {[
                                                { label: "Projets livrés", val: "+25", grow: "↑ croissance" },
                                                { label: "Satisfaction", val: "98%", grow: "feedback positif" },
                                                { label: "Temps moyen", val: "-30%", grow: "vs standard" },
                                            ].map((stat, i) => (
                                                <div key={i} className="rounded-2xl xl:rounded-3xl bg-white/40 backdrop-blur-md p-4 xl:p-6 border border-white/20">
                                                    <p className="text-[10px] xl:text-sm text-black/60 uppercase">{stat.label}</p>
                                                    <h3 className="text-xl md:text-2xl xl:text-4xl font-bold">{stat.val}</h3>
                                                    <span className="hidden xl:block text-[10px] text-green-600">{stat.grow}</span>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Highlights : Cachés sur petits écrans (Laptop inclus) pour éviter le chevauchement */}
                                        <div className="hidden md:flex flex-wrap lg:flex-nowrap gap-4 lg:gap-6 mt-8 lg:mt-10">
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0"></div>
                                                <p className="text-xs lg:text-sm max-w-50">
                                                    Architecture propre et scalable dès la première version.
                                                </p>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <div className="w-2 h-2 rounded-full bg-black mt-1.5 shrink-0"></div>
                                                <p className="text-xs lg:text-sm max-w-50">
                                                    Orienté performance, UX et maintenabilité long terme.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="absolute w-70 xl:w-100 bottom-0 right-0 ">
                                        <img src={PoseOne} alt="" />
                                    </div>

                                    <div className="absolute -bottom-2 -right-2 flex flex-col items-end">
                                        <div className="w-27 h-17 rounded-full shdw_top mr-2 mt-2"></div>
                                        <div className="flex flex-row-reverse items-end">
                                            <Button
                                                type="button"
                                                onClick={nextIndex}
                                                className="border-8 border-white bg-black w-27 h-17 z-2 rounded-full flex items-center justify-center hero_button"
                                            >
                                                <FiArrowRight size={30} className="text-white" />
                                            </Button>
                                            <div className="w-27 h-15 rounded-full shdw_left mb-2"></div>
                                        </div>
                                    </div>


                                </motion.div>
                            )}
                        </AnimatePresence>



                    </div>

                    {/* Bloc droit 2 */}
                    <div
                        className=" h-full rounded-[70px] bg-[#F9EE8E] transition-all duration-700 relative"
                        style={{ width: activeIndex === 2 ? `${bigWidth}%` : `${smallWidth}%` }}
                    >

                        <div className="absolute w-full h-full flex items-center justify-center rounded-[70px] overflow-hidden">
                            <img src={YellowHero} alt="" className="" />
                        </div>


                        <AnimatePresence>
                            {activeIndex !== 2 && (
                                <motion.div
                                    key="overlay" // important pour que Framer Motion gère correctement l'animation exit
                                    initial={{ opacity: 0 }}      // état au montage
                                    animate={{ opacity: 0.4 }}    // état quand actif
                                    exit={{ opacity: 0 }}         // état au démontage
                                    transition={{ duration: 0.9 }} // durée de la transition
                                    className="absolute inset-0 w-full h-full rounded-[70px] bg-black"
                                ></motion.div>
                            )}
                        </AnimatePresence>

                        <motion.div
                            className="absolute z-20 p-15"
                            animate={{
                                color: activeIndex === 2 ? "black" : "white",
                                top: activeIndex === 2 ? 0 : "50%",      // top-10 => 2.5rem, sinon 50% centré
                                left: activeIndex === 2 ? 0 : "50%",   // left-15 => 3.75rem, sinon 50% centré
                                x: activeIndex === 2 ? 0 : "-50%",             // centrage horizontal
                                y: activeIndex === 2 ? 0 : "-50%",             // centrage vertical
                                rotate: activeIndex === 2 ? 0 : -90
                            }}
                            transition={{ duration: 0.1, ease: "easeInOut" }}
                        >
                            <h1 className="text-6xl font-bold whitespace-nowrap">Workflow</h1>
                        </motion.div>

                        {/* Contenu avec delay */}
                        <AnimatePresence>
                            {showContent && activeIndex === 2 && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="w-full h-full p-6 md:p-10 xl:p-15 flex flex-col lg:flex-row gap-6 xl:gap-16 relative overflow-hidden"
                                >
                                    {/* IMAGE - Fluide : plus petite sur laptop (lg), taille d'origine sur xl */}
                                    <div className="absolute bottom-0 right-0 w-[50%] md:w-[40%] xl:w-96 pointer-events-none opacity-40 lg:opacity-90 z-0">
                                        <img
                                            src={PoseOne}
                                            alt=""
                                            className="max-h-[60%] lg:max-h-[85%] w-full object-contain object-bottom-right"
                                        />
                                    </div>

                                    {/* CONTENT */}
                                    <div className="w-full lg:w-[85%] xl:w-[70%] flex flex-col justify-between mt-10 md:mt-14 xl:mt-18 z-10">

                                        {/* HEADER */}
                                        <div className="space-y-2 xl:space-y-4 pt-10">
                                            <h2 className="text-2xl md:text-3xl xl:text-[42px] font-semibold leading-tight text-black">
                                                De l’idée au produit final
                                            </h2>
                                            <p className="max-w-full lg:max-w-100 xl:max-w-130 text-black/65 text-xs md:text-sm leading-relaxed">
                                                Un process structuré, pensé pour livrer vite, bien, et sans perte de qualité.
                                            </p>
                                        </div>

                                        {/* WORKFLOW STEPS - Grille adaptative */}
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 xl:gap-10 mt-8 xl:mt-16">
                                            {[
                                                { id: "01", title: "Discovery", desc: "Compréhension du besoin et objectifs business." },
                                                { id: "02", title: "Design", desc: "UX flows et interfaces orientées utilisateur." },
                                                { id: "03", title: "Build", desc: "Développement propre, scalable et performant." },
                                                { id: "04", title: "Delivery", desc: "Tests rigoureux et suivi post-mise en ligne." },
                                            ].map((step) => (
                                                <div key={step.id} className="flex flex-col gap-2 xl:gap-4 border-t border-black/10 pt-4 xl:pt-6">
                                                    <span className="text-[10px] xl:text-xs text-black/40 tracking-widest">{step.id}</span>
                                                    <h3 className="text-sm xl:text-lg font-semibold text-black">{step.title}</h3>
                                                    {/* Description masquée sur mobile pour garder de l'air, visible dès md */}
                                                    <p className="hidden md:block text-[11px] xl:text-sm text-black/60 leading-relaxed">
                                                        {step.desc}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* BOUTON NEXT - Redimensionné hors XL */}
                                    <div className="absolute -bottom-2 -right-2 flex flex-col items-end">
                                        <div className="w-27 h-17 rounded-full shdw_top mr-2 mt-2"></div>
                                        <div className="flex flex-row-reverse items-end">
                                            <Button
                                                type="button"
                                                onClick={nextIndex}
                                                className="border-8 border-white bg-black w-27 h-17 z-2 rounded-full flex items-center justify-center hero_button"
                                            >
                                                <FiArrowRight size={30} className="text-white" />
                                            </Button>
                                            <div className="w-27 h-15 rounded-full shdw_left mb-2"></div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>


                    </div>

                </div>
            </section>

            <section className="w-full px-5 lg:hidden h-[90vh] py-5">
                <div className="flex flex-col h-full gap-4">

                    {/* --- BLOC 0: DÉVELOPPEUR (BLEU) --- */}
                    <div
                        className="w-full rounded-[40px] relative bg-[#D8EFFF] transition-all duration-700 overflow-hidden"
                        style={{ height: activeIndex === 0 ? "60%" : "20%" }}
                        onClick={() => activeIndex !== 0 && setActiveIndex(0)}
                    >
                        {/* Image de fond */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <img src={BlueHero} alt="" className="object-cover w-full h-full" />
                        </div>

                        {/* Overlay sombre si inactif */}
                        {activeIndex !== 0 && (
                            <div className="absolute inset-0 bg-black/40 z-10 transition-opacity duration-700" />
                        )}

                        {/* Titre */}
                        <div className={`absolute z-20 p-6 transition-all duration-700 ${activeIndex === 0 ? "top-4 left-4" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}>
                            <h1 className={`font-bold uppercase tracking-tighter whitespace-nowrap ${activeIndex === 0 ? "text-3xl text-black" : "text-2xl text-white"}`}>
                                Developpeur
                            </h1>
                        </div>

                        {/* Contenu - Apparaît seulement si actif */}
                        <AnimatePresence>
                            {showContent && activeIndex === 0 && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute inset-0 p-6 flex flex-col justify-end"
                                >
                                    <div className="mb-20 md:w-[50%]">
                                        <p className="text-sm font-medium leading-relaxed text-black/80 max-w-[80%]">
                                            Je suis développeur web et mobile, spécialisé dans la création d’applications modernes et performantes.
                                        </p>
                                    </div>

                                    <div className="flex flex-col gap-3 mb-4">
                                        <Button onClick={handleDownloadCV} className="flex items-center gap-2 w-fit px-5 py-2 rounded-full bg-black text-white text-xs">
                                            <FiDownload /> <span>Telecharger mon cv</span>
                                        </Button>
                                        <div className="flex gap-2">
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm"><FaGithub size={18} /></div>
                                            <div className="w-9 h-9 rounded-full flex items-center justify-center bg-white shadow-sm"><FaLinkedin size={18} className="text-[#2375C2]" /></div>
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 right-0 w-40 md:w-65 pointer-events-none">
                                        <img src={PoseOne} alt="" className="w-full object-contain" />
                                    </div>

                                    <div className="absolute bottom-4 right-4">
                                        <Button onClick={() => { nextIndex() }} className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center border-4 border-white">
                                            <FiArrowRight size={20} />
                                        </Button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* --- BLOC 1: INSIGHTS (VIOLET) --- */}
                    <div
                        className="w-full rounded-[40px] relative bg-[#feb8ffb2] transition-all duration-700 overflow-hidden"
                        style={{ height: activeIndex === 1 ? "60%" : "20%" }}
                        onClick={() => activeIndex !== 1 && setActiveIndex(1)}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <img src={VioletHero} alt="" className="object-cover w-full h-full" />
                        </div>
                        {activeIndex !== 1 && <div className="absolute inset-0 bg-black/40 z-10" />}

                        <div className={`absolute z-20 p-6 transition-all duration-700 ${activeIndex === 1 ? "top-4 left-4" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}>
                            <h1 className={`font-bold uppercase tracking-tighter ${activeIndex === 1 ? "text-3xl text-black" : "text-2xl text-white"}`}>
                                Insights
                            </h1>
                        </div>

                        {showContent && activeIndex === 1 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 p-6 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-2 mt-10 max-w-[60%]">
                                    <div className="bg-white/40 p-3 rounded-2xl"><h3 className="text-xl font-bold">+25</h3><p className="text-[10px]">Projets</p></div>
                                    <div className="bg-white/40 p-3 rounded-2xl"><h3 className="text-xl font-bold">98%</h3><p className="text-[10px]">Feedback</p></div>
                                    <div className="bg-white/40 p-3 rounded-2xl"><h3 className="text-xl font-bold">-30%</h3><p className="text-[10px]">Temps</p></div>
                                </div>

                                <div className="absolute bottom-0 right-0 w-40 md:w-65 pointer-events-none">
                                    <img src={PoseOne} alt="" className="w-full object-contain" />
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <Button onClick={() => { nextIndex() }} className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center border-4 border-white">
                                        <FiArrowRight size={20} />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>

                    {/* --- BLOC 2: WORKFLOW (JAUNE) --- */}
                    <div
                        className="w-full rounded-[40px] relative bg-[#F9EE8E] transition-all duration-700 overflow-hidden"
                        style={{ height: activeIndex === 2 ? "60%" : "20%" }}
                        onClick={() => activeIndex !== 2 && setActiveIndex(2)}
                    >
                        <div className="absolute inset-0 flex items-center justify-center opacity-30">
                            <img src={YellowHero} alt="" className="object-cover w-full h-full" />
                        </div>
                        {activeIndex !== 2 && <div className="absolute inset-0 bg-black/40 z-10" />}

                        <div className={`absolute z-20 p-6 transition-all duration-700 ${activeIndex === 2 ? "top-4 left-4" : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"}`}>
                            <h1 className={`font-bold uppercase tracking-tighter ${activeIndex === 2 ? "text-3xl text-black" : "text-2xl text-white"}`}>
                                Workflow
                            </h1>
                        </div>

                        {showContent && activeIndex === 2 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 p-6 flex flex-col justify-center">
                                <div className="grid grid-cols-2 gap-3 mt-10">
                                    <div className="border-t border-black/20 pt-2"><span className="text-[10px] block">01</span><h4 className="font-bold text-xs">Discovery</h4></div>
                                    <div className="border-t border-black/20 pt-2"><span className="text-[10px] block">02</span><h4 className="font-bold text-xs">Design</h4></div>
                                    <div className="border-t border-black/20 pt-2"><span className="text-[10px] block">03</span><h4 className="font-bold text-xs">Build</h4></div>
                                    <div className="border-t border-black/20 pt-2"><span className="text-[10px] block">04</span><h4 className="font-bold text-xs">Delivery</h4></div>
                                </div>
                                <div className="absolute bottom-0 right-0 w-40 md:w-65 pointer-events-none">
                                    <img src={PoseOne} alt="" className="w-full object-contain" />
                                </div>
                                <div className="absolute bottom-4 right-4">
                                    <Button
                                        onClick={() => {
                                            nextIndex()
                                        }}
                                        className="w-12 h-12 bg-black text-white rounded-full flex items-center justify-center border-4 border-white">
                                        <FiArrowRight size={20} />
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Hero
