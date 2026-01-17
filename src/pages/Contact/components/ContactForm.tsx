import { motion } from 'framer-motion'
import { FiSend, FiUser, FiMail, FiMessageCircle, FiPhone, FiMapPin } from 'react-icons/fi'
import Button from '../../../ui/Button'

function ContactForm() {
  return (
    <section className="w-full py-24 bg-white px-6 md:px-12 lg:px-24 flex justify-center">
      <div className="max-w-7xl w-full bg-[#fcfcfc] rounded-[40px] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col lg:flex-row">
        
        {/* --- PARTIE GAUCHE : IMAGE & INFOS (Visuel) --- */}
        <div className="lg:w-5/12 relative min-h-100 bg-black overflow-hidden">
          {/* Image illustrative (Abstraite ou Bureau Moderne) */}
          <img 
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" 
            alt="Contact Visual" 
            className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:scale-110 transition-transform duration-1000"
          />
          
          {/* Overlay avec les infos de contact */}
          <div className="relative z-10 h-full flex flex-col justify-between p-12 text-white">
            <div>
              <h2 className="text-4xl font-black leading-tight tracking-tighter">
                TRAVAILLONS <br /> <span className="text-blue-500">ENSEMBLE.</span>
              </h2>
              <p className="mt-4 text-gray-300 font-medium">
                Un café virtuel pour discuter de votre prochain grand projet ?
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <FiPhone size={20} />
                </div>
                <span className="font-bold">+228 96 71 77 42</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-blue-500 group-hover:text-black transition-all">
                  <FiMapPin size={20} />
                </div>
                <span className="font-bold">Lomé, Togo</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- PARTIE DROITE : FORMULAIRE --- */}
        <div className="lg:w-7/12 p-10 md:p-16 bg-white">
          <motion.form 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Nom */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Nom Complet</label>
                <div className="relative group">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full bg-gray-50 border-b-2 border-transparent py-4 pl-12 pr-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Email Professionnel</label>
                <div className="relative group">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                  <input 
                    type="email" 
                    placeholder="john@company.com"
                    className="w-full bg-gray-50 border-b-2 border-transparent py-4 pl-12 pr-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Votre Message</label>
              <div className="relative group">
                <FiMessageCircle className="absolute left-4 top-6 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                <textarea 
                  placeholder="Expliquez-moi brièvement votre besoin..."
                  className="w-full bg-gray-50 border-b-2 border-transparent py-4 pl-12 pr-4 rounded-xl outline-none focus:bg-white focus:border-blue-500 transition-all resize-none"
                ></textarea>
              </div>
            </div>

            {/* Bouton de soumission stylé */}
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden group w-full md:w-auto bg-black text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 transition-all shadow-xl shadow-black/10 hover:shadow-blue-500/20"
            >
              <Button className="relative z-10 flex items-center gap-3">
                Envoyer le message <FiSend size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
              <div className="absolute inset-0 bg-blue-500 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </motion.button>
          </motion.form>
        </div>

      </div>
    </section>
  )
}

export default ContactForm