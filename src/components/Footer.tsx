import { FiGithub, FiLinkedin } from "react-icons/fi"
import Button from "../ui/Button"
import { useNavigate } from "react-router-dom"
import { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import FormInterests from "./FormInterests"
import { BsGoogle, BsWhatsapp } from "react-icons/bs"

const Pose3d = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284310/Rectangle_62_zoqcxz.png"
const BoxBack1 = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284331/Rectangle_63_iscier.png"
const BoxBack2 = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284323/Rectangle_65_o4jotp.png"

function Footer() {

    const [openForm, setOpenForm] = useState<boolean>(false)

    const navigate = useNavigate()
    const ref = useRef(null)
    const isInView = useInView(ref, { once: false, margin: "-10px" })

    const navLinks = [
        { name: "Accueil", action: () => navigate("/") },
        { name: "À propos", action: () => navigate("about") },
        { name: "Expériences", action: () => navigate("experiences") },
        { name: "Projets", action: () => navigate("projects") },
        { name: "Services", action: () => navigate("services") },
        { name: "Contact", action: () => navigate("contact") },
    ]

    const socials = [
        {
            icon: FiGithub,
            link: "https://github.com/nadjitan949",
        },
        {
            icon: FiLinkedin,
            link: "https://www.linkedin.com/in/nadjitan-betan-2a52b83a4/",
        },
        {
            icon: BsWhatsapp,
            link: "https://wa.me/22896717742",
        },
        {
            icon: BsGoogle,
            link: "mailto:nadjitanb@gmail.com",
        },
    ]

    return (
        <footer
            ref={ref}
            className="w-full lg:mt-auto min-h-[50vh] lg:h-150 flex flex-col items-center justify-center relative bg-black px-6"
        >
            {/* ================== BOX BLANC (CTA) ================== */}
            <div className="absolute -top-50 lg:mt-20 lg:-top-70 w-full flex justify-center px-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className="relative w-full lg:w-[70%] xl:w-[60%] min-h-75 lg:h-75 bg-white rounded-[30px] shadow-2xl flex flex-col lg:flex-row"
                >
                    {/* Images de fond décoratives (masquées sur petit mobile pour clarté) */}
                    <div className="absolute inset-0 flex justify-between pointer-events-none opacity-50 lg:opacity-100">
                        <img src={BoxBack1} className="h-full object-cover hidden sm:block" alt="" />
                        <img src={BoxBack2} className="h-full object-cover hidden sm:block" alt="" />
                    </div>

                    {/* Contenu de la Box */}
                    <div className="relative z-10 w-full h-full flex flex-col lg:flex-row items-center lg:items-end px-6 lg:px-12 py-8 lg:py-0">

                        {/* Image Pose 3D - Ajustée pour mobile */}
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            animate={isInView ? { x: 0, opacity: 1 } : {}}
                            transition={{ duration: 0.2, delay: 0.2 }}
                            className="w-40 lg:w-80 xl:w-100 mb-6 lg:mb-0"
                        >
                            <img src={Pose3d} alt="Pose 3D" className="w-full h-auto object-contain" />
                        </motion.div>

                        {/* Texte & Bouton */}
                        <div className="flex-1 flex flex-col gap-4 lg:gap-5 pb-8 lg:py-10 text-center lg:text-left">
                            <h2 className="text-xl lg:text-2xl font-black leading-tight text-black">
                                Parlez-moi de votre projet et je vous proposerai la meilleure solution
                            </h2>
                            <p className="text-sm text-gray-500 max-w-md">
                                Transformons votre projet en une réalité concrète et performante.
                            </p>
                            <div className="pt-2">
                                <Button onClick={() => setOpenForm(true)} className="w-full lg:w-auto px-10 py-4 bg-black text-white rounded-full font-bold uppercase text-xs tracking-widest hover:bg-gray-800 transition-colors">
                                    Interessé par un service
                                </Button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* ================== FOOTER CENTRAL ================== */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-full max-w-5xl flex flex-col items-center gap-8 pt-60 lg:pt-20 pb-10"
            >
                {/* Avatar & Nom */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shadow-blue-500/20">
                        <img src="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769275993/8380015_qklxw6.jpg" className="w-full h-full object-cover" alt="Profile" />
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter">
                        Nadjitan Betan
                    </h3>
                </div>

                {/* Liens de navigation - Grid sur mobile, Flex sur Desktop */}
                <ul className="grid grid-cols-2 md:grid-cols-3 lg:flex gap-x-8 gap-y-4 text-center">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Button
                                onClick={link.action}
                                className="text-gray-400 hover:text-white transition-colors text-sm font-medium uppercase tracking-widest"
                            >
                                {link.name}
                            </Button>
                        </li>
                    ))}
                </ul>

                {/* Réseaux Sociaux */}
                <div className="flex gap-8">
                    <div className="flex gap-8">
                        {socials.map(({ icon: Icon, link }, i) => (
                            <motion.a
                                key={i}
                                href={link}
                                target="_blank"
                                rel="noopener noreferrer"
                                initial={{ scale: 0 }}
                                animate={isInView ? { scale: 1 } : {}}
                                transition={{ duration: 0.4, delay: 0.6 + i * 0.1 }}
                                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white text-xl hover:bg-white hover:text-black transition-all"
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-8 border-t border-white/5 w-full text-center">
                    <p className="text-gray-600 text-xs font-medium tracking-widest uppercase">
                        © 2026 Benjamin Nadjitan. Design & Code avec passion.
                    </p>
                </div>
            </motion.div>

            {openForm && (<FormInterests onClose={() => setOpenForm(false)} />)}
        </footer>
    )
}

export default Footer