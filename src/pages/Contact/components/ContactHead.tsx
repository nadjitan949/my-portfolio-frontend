import { motion } from 'framer-motion';
import { FiArrowDownRight, FiSend } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaWhatsapp } from 'react-icons/fa6';
import { GrGoogle } from 'react-icons/gr';

function ContactHead() {
  return (
    <section className="relative w-full flex items-center justify-center bg-white px-6 md:px-12 lg:px-24">
      
      {/* --- Effets de lumière (Glow) en arrière-plan --- */}
      <div className="absolute top-[10%] left-[-10%] w-125 h-125 bg-blue-500/10 rounded-full blur-[120px] z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-100 h-100 bg-blue-500/10 rounded-full blur-[100px] z-0" />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* --- PARTIE GAUCHE : TEXTE & RÉSEAUX (7 colonnes) --- */}
        <div className="lg:col-span-7 space-y-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-px bg-blue-500"></span>
              <span className="text-blue-500 uppercase tracking-[0.3em] text-sm font-bold">Contact</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black leading-[0.9] tracking-tighter">
              DISCUTONS DE <br /> 
              <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-200 to-gray-500">VOTRE VISION.</span>
            </h1>
            
            <p className="mt-8 text-xl text-gray-400 max-w-xl leading-relaxed font-light">
              Que ce soit pour une application mobile innovante ou un système complexe, 
              je mets mon expertise IA et Big Data au service de vos ambitions.
            </p>
          </motion.div>

          {/* Social Links avec hover premium */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-6"
          >
            {[
              { icon: <FaLinkedinIn />, label: "LinkedIn", link: "https://www.linkedin.com/in/nadjitan-betan-2a52b83a4/" },
              { icon: <FaGithub />, label: "Github", link: "https://github.com/nadjitan949" },
              { icon: <FaWhatsapp />, label: "Whatsapp", link: "https://wa.me/22896717742" },
              { icon: <GrGoogle />, label: "Email", link: "mailto:nadjitanb@gmail.com" }
            ].map((social, i) => (
              <a 
                key={i} 
                href={social.link} 
                className="group flex items-center gap-3 bg-black/5 border border-white/10 px-6 py-3 rounded-full hover:bg-blue-500 hover:text-black transition-all duration-500"
              >
                <span className="text-lg">{social.icon}</span>
                <span className="text-sm font-bold uppercase tracking-wider hidden sm:inline">{social.label}</span>
                <FiArrowDownRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </motion.div>
        </div>

        {/* --- PARTIE DROITE : COMPOSITION D'IMAGES (5 colonnes) --- */}
        <div className="lg:col-span-5 relative h-125 w-full">
          {/* Image principale (Verticale) */}
          <motion.div 
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute right-0 top-0 w-[80%] h-[90%] rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000" 
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              alt="Workspace"
            />
          </motion.div>

          {/* Deuxième image (Flottante) */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="absolute left-0 bottom-10 w-[60%] h-[50%] rounded-2xl overflow-hidden border-4 border-white shadow-2xl z-20"
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800" 
              className="w-full h-full object-cover"
              alt="Teamwork"
            />
          </motion.div>

          {/* Badge rotatif ou élément flottant */}
          <div className="absolute -bottom-5 -right-5 z-30 bg-blue-500 text-black p-8 rounded-full flex flex-col items-center justify-center animate-bounce">
            <FiSend size={30} />
          </div>
        </div>

      </div>

      {/* --- Scroll Indicator --- */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30">
        <span className="text-[10px] uppercase tracking-[0.4em]">Scroll</span>
        <div className="w-px h-12 bg-linear-to-b from-white to-transparent"></div>
      </div>
    </section>
  );
}

export default ContactHead;