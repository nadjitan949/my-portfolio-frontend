import { motion, useInView } from "framer-motion"
import { useRef } from "react"


function SectionTitle({ text }: { text: string }) {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <div
            ref={ref}
            className=" w-[55%] lg:w-125 text-center flex flex-col gap-5 items-center justify-center m-auto"
        >
            {/* TRAIT */}
            <motion.div
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.1, ease: "easeOut" }}
                className="h-1 w-40 md:w-45 lg:w-50 bg-black origin-center"
            />

            {/* TEXTE */}
            <motion.span
                initial={{ opacity: 0, y: 25 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 }}
                className=" text-2xl md:text-3xl lg:text-4xl font-medium text-center"
            >
                {text}
            </motion.span>
        </div>
    )
}


export default SectionTitle