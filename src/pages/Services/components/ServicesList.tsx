import { FiUsers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Button from '../../../ui/Button'

function ServicesList() {
  const services = [
    {
      title: "Developpement de site internet",
      description:
      "Je propose un service de développement de sites internet modernes et performants, incluant la création de sites vitrines pour les entreprises, afin de valoriser leur activité et renforcer leur présence en ligne. Chaque site est conçu avec un design soigné, une navigation intuitive et une compatibilité optimale sur tous les supports, tout en mettant l’accent sur la performance, la sécurité et l’évolutivité, pour offrir une solution fiable, professionnelle et adaptée aux objectifs du projet.",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      stats: "+12",
      isReversed: false,
    },
    {
      title: "Developpement mobile",
      description:
      "Je propose un service de développement d’applications mobiles modernes et performantes, conçues pour offrir une expérience utilisateur fluide et intuitive sur Android et iOS. Chaque application est développée en tenant compte des besoins spécifiques du projet, avec une attention particulière portée à la performance, à la sécurité et à l’ergonomie, afin de fournir une solution fiable, évolutive et adaptée aux objectifs de votre activité.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      stats: "+12",
      isReversed: true,
    },
    {
      title: "Developpement mobile",
      description:
      "Je propose un service de développement d’applications mobiles modernes et performantes, conçues pour offrir une expérience utilisateur fluide et intuitive sur Android et iOS. Chaque application est développée en tenant compte des besoins spécifiques du projet, avec une attention particulière portée à la performance, à la sécurité et à l’ergonomie, afin de fournir une solution fiable, évolutive et adaptée aux objectifs de votre activité.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      stats: "+12",
      isReversed: false,
    },
    {
      title: "Developpement mobile",
      description:
      "Je propose un service de développement d’applications mobiles modernes et performantes, conçues pour offrir une expérience utilisateur fluide et intuitive sur Android et iOS. Chaque application est développée en tenant compte des besoins spécifiques du projet, avec une attention particulière portée à la performance, à la sécurité et à l’ergonomie, afin de fournir une solution fiable, évolutive et adaptée aux objectifs de votre activité.",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
      stats: "+12",
      isReversed: true,
    },
  ]

  return (
    <section className="w-full py-20 bg-gray-200 flex flex-col items-center gap-10 px-6 pb-100 md:px-12">
      {services.map((service, index) => {
        const imageFrom = service.isReversed ? 120 : -120

        return (
          <div
            key={index}
            className={`relative max-w-6xl w-full flex flex-col ${
              service.isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } items-center`}
          >
            {/* --- IMAGE --- */}
            <motion.div
              initial={{ opacity: 0, x: imageFrom, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-20 w-full lg:rounded-t-none rounded-t-[15px] lg:w-[45%] h-64 md:h-80 overflow-hidden lg:shadow-xl"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />
            </motion.div>

            {/* --- TEXTE --- */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className={`
                relative z-10 w-full lg:w-[70%] bg-white rounded-[15px] py-15 px-10 lg:px-20
                ${service.isReversed ? 'lg:-mr-16 lg:pr-24' : 'lg:-ml-16 lg:pl-24'}
                -mt-12 lg:mt-0 shadow-2xl hover:shadow-md
              `}
            >
              <div className="space-y-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
                  {service.title}
                </h3>

                <p className="text-gray-500 leading-relaxed text-[15px] md:text-[16px]">
                  {service.description}
                </p>

                {/* Stats & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-500 font-bold text-lg">
                      {service.stats}
                    </span>
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <FiUsers size={18} />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="bg-black text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-gray-800 transition-all">
                      Intéressé
                    </Button>
                    <Button className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-gray-50 transition-all">
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}
    </section>
  )
}

export default ServicesList
