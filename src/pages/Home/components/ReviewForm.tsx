import { useState } from "react"
import { FiX, FiStar, FiSend } from "react-icons/fi"
import api from "../../../api/axios"

interface ReviewFormProps {
  onClose: () => void
}

function ReviewForm({ onClose }: ReviewFormProps) {
  const [formData, setFormData] = useState({
    author: "",
    rating: 0,
    content: ""
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.rating === 0) {
      alert("Veuillez sélectionner une note")
      return
    }

    try {
      setLoading(true)

      const res = await api.post("/reviews/add", formData)

      if (res.data.success) {
        alert("Avis envoyé avec succès 🙌")
        onClose()
      }
    } catch (error) {
      console.error(error)
      alert("Erreur lors de l’envoi de l’avis")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="fixed inset-0 z-100 bg-black/60 flex items-center justify-center p-4">
      
      {/* Overlay */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl z-10">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-gray-400 hover:text-gray-700"
        >
          <FiX size={22} />
        </button>

        <h2 className="text-xl font-bold text-gray-800 text-center mb-6">
          Laisser un témoignage
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Author */}
          <div>
            <label className="text-sm font-medium text-gray-500">Nom</label>
            <input
              required
              type="text"
              placeholder="Ex: Alice"
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-blue-500"
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
            />
          </div>

          {/* Rating */}
          <div>
            <label className="text-sm font-medium text-gray-500 block mb-2">
              Note
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() =>
                    setFormData({ ...formData, rating: star })
                  }
                  className={`transition ${
                    formData.rating >= star
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                >
                  <FiStar size={24} />
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="text-sm font-medium text-gray-500">Message</label>
            <textarea
              required
              placeholder="Votre avis..."
              className="w-full border-b border-gray-200 py-2 outline-none focus:border-blue-500 resize-none h-24"
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-full font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition"
          >
            {loading ? "Envoi..." : "Envoyer"}
            <FiSend size={16} />
          </button>

        </form>
      </div>
    </section>
  )
}

export default ReviewForm
