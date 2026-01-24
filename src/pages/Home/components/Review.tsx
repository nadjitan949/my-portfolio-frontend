import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../../../ui/Button"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import api from "../../../api/axios"
import { BiUser } from "react-icons/bi"
import ReviewForm from "./ReviewForm"

const RevewBackground = "https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284976/Rectangle_60_1_ckeayo.png"

interface Review {
  id: number
  author: string
  rating: number
  content: string
  avatar?: string
}

function Review() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reviews, setReviews] = useState<Review[] | null>(null)
  const [openForm, setOpenForm] = useState<boolean>(false)

  // Défilement automatique toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      if (!reviews || reviews.length === 0) return
      setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [reviews])

  const nextReview = () => {
    if (!reviews || reviews.length === 0) return
    setCurrentIndex((prev) => (prev + 1) % reviews.length)
  }

  const prevReview = () => {
    if (!reviews || reviews.length === 0) return
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
  };

  // Récupération des reviews depuis l'API
  useEffect(() => {
    const fetchReview = async () => {
      try {
        const res = await api.get("/reviews/all")
        if (!res.data.success) return alert(res.data.message)

        const data: Review[] = res.data.reviews
        setReviews(data)
      } catch (error) {
        console.log("Erreur: ", error)
      }
    }

    fetchReview()
  }, [])

  // Si les reviews ne sont pas encore chargées
  if (!reviews || reviews.length === 0) {
    return <p className="text-center text-gray-500">Chargement des avis...</p>
  }

  // Review actuelle
  const currentReview = reviews[currentIndex]

  return (
    <section className="w-full h-250 relative flex flex-col gap-5 items-center justify-center">
      <img
        src={RevewBackground}
        alt=""
        className="w-full absolute -z-1 h-full object-cover"
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="relative bg-white lg:w-[50%] lg:h-80 mx-5 lg:mx-0 rounded-[10px] p-10 flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Griffes internes en background */}
          <span className="absolute hidden md:block top-2 left-4 text-blue-500 text-[80px] font-bold select-none pointer-events-none">
            “
          </span>
          <span className="absolute hidden md:block bottom-2 right-4 text-blue-500 text-[80px] font-bold select-none pointer-events-none">
            ”
          </span>

          {/* Texte centré */}
          <p className="text-gray-700 text-center font-medium text-[15px] md:text-lg leading-relaxed px-2 mb-8">
            "{currentReview.content}"
          </p>

          {/* Personne */}
          <div className="flex items-center gap-3">
            {currentReview.avatar ? (
              <img
                src={currentReview.avatar}
                alt="Avatar"
                className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
              />
            ) : (
              <motion.div className=" p-2 rounded-full bg-gray-100 text-gray-500">
                <BiUser size={30} />
              </motion.div>
            )}
            <div className="flex flex-col items-start">
              <span className="font-bold italic text-gray-900">
                {currentReview.author}
              </span>
              <div className="flex gap-1 text-yellow-400 text-sm">
                {[...Array(currentReview.rating || 0)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-5 mt-6 items-center">
        <Button
          onClick={prevReview}
          className="border w-10 h-10 flex items-center justify-center rounded-full hover:bg-black hover:text-white"
        >
          <FiArrowLeft />
        </Button>

        {/* Points indicateurs */}
        <div className="flex gap-2 items-center justify-center">
          {reviews.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full ${i === currentIndex ? "bg-blue-500 w-5" : "bg-gray-300"
                }`}
            ></div>
          ))}
        </div>

        <Button
          onClick={nextReview}
          className="border w-10 h-10 flex items-center justify-center rounded-full hover:bg-black hover:text-white"
        >
          <FiArrowRight />
        </Button>

      </div>

      <Button onClick={() => setOpenForm(true)} className="border px-6 py-3 rounded-[5px] bg-blue-500 text-white font-medium hover:bg-blue-700">
        Laisser un avis
      </Button>

      {openForm && (<ReviewForm onClose={() => setOpenForm(false)}/>)}
    </section>
  )
}

export default Review
