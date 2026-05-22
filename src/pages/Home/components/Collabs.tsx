import { useState, useRef, useEffect } from 'react'
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Button from '../../../ui/Button'
import api from '../../../api/axios'
import SendFeedBack from './SendFeedBack'
import Img from '../../../ui/Img'

interface Image {
    url: string
    public_id: string
}

interface Testimonial {
    id: number
    author: string
    jobTitle: string
    content: string
    image: Image | null
}

function Collabs() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null)
    const [showForm, setShowForm] = useState<boolean>(false)
    const [expanded, setExpanded] = useState(false)
    const contentRef = useRef<HTMLParagraphElement>(null)
    const [contentHeight, setContentHeight] = useState(0)

    useEffect(() => {
        if (contentRef.current) {
            setContentHeight(contentRef.current.scrollHeight)
        }
    }, [currentIndex, testimonials])

    const containerRef = useRef<HTMLDivElement | null>(null)
    const isInView = useInView(containerRef, { once: true, margin: "-100px" })

    const DEFAULT_AVATAR = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1774832675/feedbacks/dcbamzhhxxuleifpxew1.webp"

    const getTestimonial = (offset: number) => {
        if (!testimonials || testimonials.length === 0) return null;
        const index = (currentIndex + offset + testimonials.length) % testimonials.length;
        return testimonials[index];
    }


    useEffect(() => {
        const fetchTestimonials = async () => {
            try {

                const res = await api.get("/feedbacks/all")
                if (!res.data.success) return alert(res.data.message)

                const data: Testimonial[] = res.data.feedbacks
                setTestimonials(data)

            } catch (error) {
                console.log("Erreur: ", error)
            }
        }
        fetchTestimonials()
    }, [])

    const nextSlide = () => {
        if (!testimonials || testimonials.length === 0) return
        if (expanded) {
            setExpanded(false)
            setContentHeight(72) // <-- reset instantané avant le slide
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % testimonials.length)
            }, 500)
        } else {
            setContentHeight(72) // <-- reset instantané avant le slide
            setCurrentIndex((prev) => (prev + 1) % testimonials.length)
        }
    }

    const prevSlide = () => {
        if (!testimonials || testimonials.length === 0) return
        if (expanded) {
            setExpanded(false)
            setContentHeight(72) // <-- reset instantané
            setTimeout(() => {
                setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
            }, 500)
        } else {
            setContentHeight(72) // <-- reset instantané
            setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
        }
    }

    const getImageUrl = (image?: Image | string | null) => {
        if (!image) return DEFAULT_AVATAR
        if (typeof image === "string") return image
        return image.url
    }

    const closeForm = async () => {
        try {

            const res = await api.get("/feedbacks/all")
            if (!res.data.success) return alert(res.data.message)

            const data: Testimonial[] = res.data.feedbacks
            setTestimonials(data)

            setShowForm(false)

        } catch (error) {
            console.log("Erreur: ", error)
        }
    }

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
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.2 } : {}}
                        className="hidden rounded-[20px] overflow-hidden lg:block w-24 h-24 diamond-shape mt-24">
                        <Img src={getImageUrl(getTestimonial(-2)?.image)} alt={`${getTestimonial(0)?.author} avatar`} className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Décoration Gauche - Index -1 */}
                    <motion.div key={`p1-${currentIndex}`}
                        initial={{ x: 50, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 0.5 } : {}}
                        className="hidden rounded-[20px] overflow-hidden sm:block w-40 h-40 diamond-shape mb-12 shadow-lg">
                        <Img src={getImageUrl(getTestimonial(-1)?.image)} alt={`${getTestimonial(0)?.author} avatar`} className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Témoignage Central */}
                    <div className="flex flex-col items-center z-20 px-4 min-w-[320px]">

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentIndex}
                                initial={{ opacity: 0, y: 10 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeInOut" }}
                                className="flex flex-col items-center w-full"
                            >
                                <div className="w-48 h-48 md:w-60 md:h-60 diamond-shape shadow-2xl rounded-[30px] overflow-hidden border-4 border-white pentagon-shape">
                                    <Img src={getImageUrl(getTestimonial(0)?.image)} alt={`${getTestimonial(0)?.author} avatar`} className="object-cover w-full h-full" />
                                </div>

                                <div className="mt-10 max-w-md flex flex-col justify-start w-full">
                                    <h3 className="text-2xl font-bold text-gray-900">{getTestimonial(0)?.author}</h3>
                                    <p className="text-blue-500 font-medium mb-4">{getTestimonial(0)?.jobTitle}</p>

                                    <div className="relative">
                                        <div className="overflow-hidden" style={{ height: expanded ? contentHeight : 72 }}>
                                            <p
                                                ref={contentRef}
                                                className="text-gray-500 italic w-50 lg:w-full text-sm md:text-base leading-relaxed mx-auto"
                                            >
                                                "{getTestimonial(0)?.content}"
                                            </p>
                                        </div>

                                        {!expanded && (
                                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-linear-to-t from-white to-transparent pointer-events-none" />
                                        )}
                                    </div>

                                    <button
                                        onClick={() => setExpanded((prev) => !prev)}
                                        className="mt-2 text-blue-400 hover:text-blue-600 text-xs font-medium self-end transition-colors duration-200 flex items-center gap-1"
                                    >
                                        {expanded ? "Afficher moins" : "Afficher plus"}
                                        <motion.span
                                            animate={{ rotate: expanded ? 180 : 0 }}
                                            transition={{ duration: 0.4, ease: "easeInOut" }}
                                            className="inline-block"
                                        >
                                            ▼
                                        </motion.span>
                                    </button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Décoration Droite - Index +1 */}
                    <motion.div key={`n1-${currentIndex}`}
                        initial={{ x: -50, opacity: 0 }}
                        animate={isInView ? { x: 0, opacity: 0.5 } : {}}
                        className="hidden sm:block w-40 rounded-[20px] overflow-hidden h-40 diamond-shape mb-12 shadow-lg pentagon-shape">
                        <Img src={getImageUrl(getTestimonial(1)?.image)} alt="Avatar collaborateur" className="object-cover w-full h-full grayscale" />
                    </motion.div>

                    {/* Décoration Droite - Index +2 */}
                    <motion.div key={`n2-${currentIndex}`}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.2 } : {}}
                        className="hidden rounded-[20px] overflow-hidden lg:block w-24 h-24 diamond-shape mt-24 pentagon-shape">
                        <Img src={getImageUrl(getTestimonial(2)?.image)} alt={`${getTestimonial(0)?.author} avatar`} className="object-cover w-full h-full grayscale" />
                    </motion.div>

                </div>

                <Button onClick={nextSlide} className="absolute right-0 z-40 p-2 text-gray-400 hover:text-black transition">
                    <FiArrowRight size={35} />
                </Button>
            </div>

            <Button onClick={() => setShowForm(true)} className="mt-10 bg-[#00A3FF] text-white px-10 py-3 rounded-full font-medium hover:bg-[#0086d1] transition-all transform">
                Laissez un témoignage
            </Button>

            {showForm && (<SendFeedBack onClose={closeForm} />)}

        </section>
    )
}

export default Collabs
