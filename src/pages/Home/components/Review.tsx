import { useState, useEffect } from "react";
import RevewBackground from "../../../assets/Rectangle 60 (1).png";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../../ui/Button";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";

const reviews = [
  {
    text: "Benjamin a travaillé sur notre projet avec professionnalisme. La communication était fluide et le résultat final a dépassé nos attentes. Je le recommande fortement pour tout projet web ou design.",
    name: "John Smith",
    avatar: "https://i.pravatar.cc/100?img=32",
    stars: 5,
  },
  {
    text: "Un vrai plaisir de collaborer avec Benjamin. Il comprend parfaitement les besoins et livre un code de qualité.",
    name: "Jeanne Doe",
    avatar: "https://i.pravatar.cc/100?img=12",
    stars: 5,
  },
  {
    text: "Efficace, rapide et fiable. Benjamin est un atout pour tout projet technique.",
    name: "Marc Antoine",
    avatar: "https://i.pravatar.cc/100?img=45",
    stars: 5,
  },
];

function Review() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Défilement automatique toutes les 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);

    return () => clearInterval(interval); // cleanup
  }, []);

  const nextReview = () => setCurrentIndex((prev) => (prev + 1) % reviews.length);
  const prevReview = () =>
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);

  return (
    <section className="w-full h-230 relative flex flex-col gap-5 items-center justify-center">
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
          <span className="absolute top-2 left-4 text-blue-500 text-[80px] font-bold select-none pointer-events-none">
            “
          </span>
          <span className="absolute bottom-2 right-4 text-blue-500 text-[80px] font-bold select-none pointer-events-none">
            ”
          </span>

          {/* Texte centré */}
          <p className="text-gray-700 text-center font-medium text-[15px] md:text-lg leading-relaxed px-2 mb-8">
            "{reviews[currentIndex].text}"
          </p>

          {/* Personne */}
          <div className="flex items-center gap-3">
            <img
              src={reviews[currentIndex].avatar}
              alt="Avatar"
              className="w-12 h-12 rounded-full border-2 border-blue-400 object-cover"
            />
            <div className="flex flex-col items-start">
              <span className="font-bold italic text-gray-900">
                {reviews[currentIndex].name}
              </span>
              <div className="flex gap-1 text-yellow-400 text-sm">
                {[...Array(reviews[currentIndex].stars)].map((_, i) => (
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
              className={`w-3 h-3 rounded-full ${
                i === currentIndex ? "bg-blue-500 w-5" : "bg-gray-300"
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
    </section>
  );
}

export default Review;
