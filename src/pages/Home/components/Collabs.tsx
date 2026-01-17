import { useState, useRef } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Button from '../../../ui/Button'

const testimonials = [
    {
        name: "Jeanne Doe",
        role: "Front end developpeur",
        text: "J'ai collaboré avec Benjamin sur plusieurs projets informatiques. Il se distingue par son sérieux.",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400"
    },
    {
        name: "John Smith",
        role: "UI/UX Designer",
        text: "Un travail remarquable sur l'interface utilisateur. Benjamin comprend parfaitement les besoins. Un travail remarquable sur l'interface utilisateur. Benjamin comprend parfaitement les besoins. Un travail remarquable sur l'interface utilisateur. Benjamin comprend parfaitement les besoins.",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400"
    },
    {
        name: "Marc Antoine",
        role: "Product Manager",
        text: "Efficace et rigoureux, Benjamin est un atout précieux pour toute équipe technique.",
        img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400"
    },
    {
        name: "Sophie Claire",
        role: "Back-end Dev",
        text: "Une maîtrise parfaite des APIs et une communication fluide.",
        img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400"
    },
    {
        name: "Paul Victor",
        role: "CTO",
        text: "Benjamin livre toujours dans les temps avec une qualité de code irréprochable.",
        img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400"
    }
];

function Collabs() {
    const [currentIndex, setCurrentIndex] = useState(0)

    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const getTestimonial = (offset: number) => {
        const index = (currentIndex + offset + testimonials.length) % testimonials.length
        return testimonials[index]
    }

    const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)

    return (
        <section className="text-center overflow-hidden">
            <div ref={containerRef} className="relative max-w-6xl mx-auto flex items-center justify-center">

                {/* Navigation */}
                <Button onClick={prevSlide} className="absolute left-0 z-40 p-2 text-gray-400 hover:text-black transition">
                    <FiArrowLeft size={35} />
                </Button>

                <div className="flex items-center justify-center gap-4 lg:gap-12 relative w-full mb-auto">

                    {/* Décoration Gauche - Index -2 */}
                    <motion.div key={`p2-${currentIndex}`}
                        initial={{opacity:0}}
                        animate={isInView ? {opacity:0.2} : {}}
                        className="hidden rounded-[20px] overflow-hidden lg:block w-24 h-24 diamond-shape mt-24">
                        <img src={getTestimonial(-2).img} alt="" className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Décoration Gauche - Index -1 */}
                    <motion.div key={`p1-${currentIndex}`}
                        initial={{x: 50, opacity:0}}
                        animate={isInView ? {x: 0, opacity:0.5} : {}}
                        className="hidden rounded-[20px] overflow-hidden sm:block w-40 h-40 diamond-shape mb-12 shadow-lg">
                        <img src={getTestimonial(-1).img} alt="" className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Témoignage Central */}
                    <div className="flex flex-col items-center z-20 px-4 min-w-[320px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-48 h-48 md:w-60 md:h-60 diamond-shape shadow-2xl rounded-[30px] overflow-hidden border-4 border-white pentagon-shape">
                                    <img src={getTestimonial(0).img} alt="" className="object-cover w-full h-full" />
                                </div>

                                <div className="mt-10 max-w-md">
                                    <h3 className="text-2xl font-bold text-gray-900">{getTestimonial(0).name}</h3>
                                    <p className="text-blue-500 font-medium mb-4">{getTestimonial(0).role}</p>
                                    <p className="text-gray-500 italic w-50 lg:w-full text-sm md:text-base leading-relaxed line-clamp-3">
                                        "{getTestimonial(0).text}"
                                    </p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Décoration Droite - Index +1 */}
                    <motion.div key={`n1-${currentIndex}`}
                        initial={{x: -50, opacity:0}}
                        animate={isInView ? {x: 0, opacity:0.5} : {}}
                        className="hidden sm:block w-40 rounded-[20px] overflow-hidden h-40 diamond-shape mb-12 shadow-lg pentagon-shape">
                        <img src={getTestimonial(1).img} alt="" className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Décoration Droite - Index +2 */}
                    <motion.div key={`n2-${currentIndex}`}
                        initial={{opacity:0}}
                        animate={isInView ? {opacity:0.2} : {}}
                        className="hidden rounded-[20px] overflow-hidden lg:block w-24 h-24 diamond-shape mt-24 pentagon-shape">
                        <img src={getTestimonial(2).img} alt="" className="object-cover w-full h-full grayscale" />
                    </motion.div>

                </div>

                <Button onClick={nextSlide} className="absolute right-0 z-40 p-2 text-gray-400 hover:text-black transition">
                    <FiArrowRight size={35} />
                </Button>
            </div>

            <Button className="mt-10 bg-[#00A3FF] text-white px-10 py-3 rounded-full font-medium hover:bg-[#0086d1] transition-all transform">
                Laissez un témoignage
            </Button>
        </section>
    )
}

export default Collabs
