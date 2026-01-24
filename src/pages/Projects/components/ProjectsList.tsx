import { motion } from "framer-motion"
import { FiExternalLink, FiUser, FiCheckCircle } from "react-icons/fi"
import { FaGithub, FaBriefcase } from "react-icons/fa"
import { useEffect, useState } from "react"
import api from "../../../api/axios"


interface Image {
  url: string
  public_id: string
}

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
  computerView: Image | null
  tabletteView: Image | null
  mobileView: Image | null
}

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 80 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.1 } },
}

function ProjectsList() {

  const [projects, setProject] = useState<Project[] | null>(null)

  useEffect(() => {
    const fetchProjects = async () => {
      try {

        const res = await api.get("/projects/all")
        if (!res.data.success) return alert(res.data.message)

        const data: Project[] = res.data.projects
        setProject(data)

      } catch (error) {
        console.log("Erreur: ", error)
      }
    }

    fetchProjects()
  }, [])

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
                    alert("Projet en cours 🚧")
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
          <div className="flex justify-conter w-full lg:w-[40%] lg:h-full">
            <div className="mt-20 w-[25%] rounded-xl border-[6px] border-white bg-white relative">
              <img src={project.mobileView?.url} alt="Mobile" />
            </div>
            <div className="left-10 top-0 w-[85%] -ml-10 rounded-xl border-[6px] border-white bg-white overflow-hidden">
              <img src={project.computerView?.url} alt="Desktop" />
            </div>
            {/* Tablet */}
            <div className="mt-20 w-[30%] rounded-xl border-[6px] -ml-10 border-white bg-white">
              <img src={project.tabletteView?.url} alt="Tablet" />
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  )
}

export default ProjectsList
