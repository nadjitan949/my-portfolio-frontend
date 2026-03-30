import { motion } from "framer-motion"
import { FiExternalLink, FiUser, FiCheckCircle } from "react-icons/fi"
import { FaGithub, FaBriefcase } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "../../../api/axios"
import Img from "../../../ui/Img"

type Project = {
  id: number
  title: string
  description: string
  type: string
  status: string
  collabTags: string[] | null
  tools: string[]
  live: string | ""
  github: string | ""
  computerView: string
  tabletteView: string
  mobileView: string
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 80 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.1 } },
}

const PlaceholderMockup = ({ title, type }: { title: string, type: 'pc' | 'mobile' | 'tablet' }) => (
  <div className="w-full h-full bg-linear-to-br from-gray-800 to-gray-900 flex flex-col p-4 relative overflow-hidden group">
    {/* Barre de navigation style navigateur */}
    <div className="flex gap-1.5 mb-4 opacity-50">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <div className="w-2 h-2 rounded-full bg-yellow-500" />
      <div className="w-2 h-2 rounded-full bg-green-500" />
    </div>

    <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
      <div className="p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 group-hover:scale-110 transition-transform duration-500">
        <FaBriefcase className="text-white/20 text-3xl" />
      </div>
      <div>
        <p className="text-white/40 text-[10px] uppercase tracking-widest font-bold">{type}</p>
        <h4 className="text-white/20 text-sm font-medium line-clamp-1 px-4 italic">
          {title}
        </h4>
      </div>
    </div>

    {/* Effet de brillance */}
    <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
  </div>
);

function ProjectsList() {

  const [projects, setProject] = useState<Project[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects/all");
        if (!res.data.success) return alert(res.data.message);

        // On map sur les projets pour parser les strings JSON en tableaux
        const parsedData = res.data.projects.map((project: Project) => ({
          ...project,
          collabTags: typeof project.collabTags === 'string'
            ? JSON.parse(project.collabTags)
            : (project.collabTags || []),
          tools: typeof project.tools === 'string'
            ? JSON.parse(project.tools)
            : (project.tools || [])
        }));

        setProject(parsedData);

      } catch (error) {
        console.log("Erreur: ", error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-10 font-sans bg-gray-200 pb-70">
      {projects?.map((project, index) => (
        <motion.div
          key={project.id}
          variants={cardVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-7xl w-full flex flex-col lg:flex-row items-start gap-16 bg-white rounded-2xl p-10 shadow-2xl hover:shadow-md"
        >
          {/* -------- LEFT CONTENT -------- */}
          <div className="flex-1 space-y-5">
            {/* Title */}
            <div className="flex items-center gap-5">
              <div className="flex items-center justify-center min-w-10 h-10 md:min-w-14 md:h-14 rounded-full border border-gray-800 text-2xl font-light">
                {index + 1}
              </div>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-900">{project.title}</h2>
            </div>

            {/* Description */}
            <p className="text-gray-500 leading-relaxed text-[15px] md:text-[17px] max-w-2xl">{project.description}</p>

            {/* Status */}
            <div className="flex gap-8 items-center text-[15px] font-medium text-gray-800">
              <div className="flex items-center gap-2">
                <FaBriefcase />
                <span>{project.type}</span>
              </div>
              <div className="flex items-center gap-2 text-green-500">
                <FiCheckCircle className="stroke-[3px]" />
                <span className="font-bold">{project.status}</span>
              </div>
            </div>

            {/* Collaborators */}
            <div className="flex flex-wrap gap-4">
              {project.collabTags?.map((name) => (
                <div key={name} className="flex items-center gap-2 bg-[#eef4ff] px-4 py-2 rounded-full">
                  <div className="bg-[#d0e0ff] p-1.5 rounded-full">
                    <FiUser className="text-[#3b82f6] text-sm" />
                  </div>
                  <span className="text-gray-700 text-sm font-semibold">{name}</span>
                </div>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <a
                href={project.live ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!project.live) {
                    e.preventDefault()
                    alert("Projet en cours 🚧")
                  }
                }}
                className="flex items-center gap-1 md:gap-2 bg-black text-white px-4 py-2 md:px-7 md:py-3 rounded-full hover:opacity-80 transition font-medium md:font-bold text-[10px] md:text-sm">
                <FiExternalLink size={18} /> Live demo
              </a>
              <a
                href={project.github ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  if (!project.github) {
                    e.preventDefault()
                    alert("Projet privé 🔒")
                  }
                }}
                className="flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full hover:opacity-80 transition font-bold text-[10px] md:text-sm">
                <FaGithub size={18} /> Code
              </a>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-3 pt-4">
              {project.tools.map((tag) => (
                <span key={tag} className="px-6 py-2 border border-gray-600 rounded-full text-[14px] text-gray-800 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* -------- RIGHT MOCKUPS -------- */}
          <div className="flex justify-center w-full lg:w-[45%] lg:h-full relative mt-10 lg:mt-0">

            {/* COMPUTER VIEW (On le met en premier ou en fond) */}
            <div className="relative w-[85%] aspect-video rounded-xl border-[6px] border-white bg-white shadow-2xl overflow-hidden z-10">
              {project.computerView ? (
                <Img src={project.computerView} alt="Interface ordinateur" className="w-full h-full object-cover" />
              ) : (
                <PlaceholderMockup title={project.title} type="pc" />
              )}
            </div>

            {/* MOBILE VIEW (Superposé devant à gauche) */}
            <div className="absolute -left-4 -bottom-6 w-[25%] aspect-9/19 rounded-2xl border-[6px] border-white bg-white shadow-2xl overflow-hidden z-30 hidden md:block">
              {project.mobileView ? (
                <Img src={project.mobileView} alt="Interface mobile" className="w-full h-full object-cover" />
              ) : (
                <PlaceholderMockup title={project.title} type="mobile" />
              )}
            </div>

            {/* TABLET VIEW (Superposé derrière à droite) */}
            <div className="absolute -right-4 -bottom-2 w-[35%] aspect-4/3 rounded-xl border-[6px] border-white bg-white shadow-xl overflow-hidden z-20 hidden md:block">
              {project.tabletteView ? (
                <Img src={project.tabletteView} alt="Interface tablette" className="w-full h-full object-cover" />
              ) : (
                <PlaceholderMockup title={project.title} type="tablet" />
              )}
            </div>

          </div>
        </motion.div>
      ))}
    </section>
  )
}

export default ProjectsList
