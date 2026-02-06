import { FiUsers } from 'react-icons/fi'
import { motion } from 'framer-motion'
import Button from '../../../ui/Button'
import { useEffect, useState } from 'react'
import api from '../../../api/axios'
import { useNavigate } from 'react-router-dom'
import FormInterests from '../../../components/FormInterests'
import Img from '../../../ui/Img'

interface Image {
  url: string
  public_id: string
}

interface Interests {
  id: number,
  media: string
  contact: string
  message: string
}

interface Service {
  id: number
  title: string
  image: Image
  description: string
  Interests: Interests[] | null
}

function ServicesList() {

  const [services, setServices] = useState<Service[] | null>(null)
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const [openForm, setOpenForm] = useState<boolean>(false)

  const navigate = useNavigate()

  const showDetails = (id: number) => navigate(`/service/details/${id}`)
  const selectService = (id: number) => {
    setSelectedService(id)
    setOpenForm(true)
  }

  useEffect(() => {
    const fetchServices = async () => {
      try {

        const res = await api.get("/services/all")
        if(!res.data.success) return alert(res.data.message)

        const data: Service[] = res.data.services
        setServices(data)
        
      } catch (error) {
        console.log("Erreur: ", error)
      }
    }

    fetchServices()
  }, [])

  return (
    <section className="w-full py-20 bg-gray-200 flex flex-col items-center gap-10 px-6 pb-100 md:px-12">
      {services?.map((service, index) => {
        const imageFrom = index % 2 !== 0 ? -120 : 120

        return (
          <div
            key={index}
            className={`relative max-w-6xl w-full flex flex-col ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'
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
              <Img
                src={service.image.url}
                alt={service.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-tr from-black/20 to-transparent" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
              className={`
                relative z-10 w-full lg:w-[70%] bg-white rounded-[15px] py-15 px-10 lg:px-20
                ${index % 2 !== 0  ? 'lg:-mr-16 lg:pr-24' : 'lg:-ml-16 lg:pl-24'}
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
                      {service.Interests?.length}
                    </span>
                    <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                      <FiUsers size={18} />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={() => selectService(service.id)} className="bg-black text-white px-5 py-2 md:px-8 md:py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-gray-800 transition-all">
                      Intéressé
                    </Button>
                    <Button onClick={() => showDetails(service.id)} className="bg-white text-gray-900 border border-gray-300 px-8 py-3 rounded-full font-bold text-[12px] md:text-sm hover:bg-gray-50 transition-all">
                      En savoir plus
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )
      })}

      {openForm && (<FormInterests serviceId={selectedService} onClose={() => setOpenForm(false)} />)}

    </section>
  )
}

export default ServicesList
