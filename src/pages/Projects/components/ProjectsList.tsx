import { motion } from "framer-motion";
import { FiExternalLink, FiUser, FiCheckCircle } from "react-icons/fi";
import { FaGithub, FaBriefcase } from "react-icons/fa";

import Web1 from "../../../assets/web (1).png";
import Tablette1 from "../../../assets/tabelettes.png";
import Mobile1 from "../../../assets/mobile.png";


type Project = {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  collaborators: string[];
  images: {
    desktop: string;
    tablet: string;
    mobile: string;
  };
};

const projects: Project[] = [
  {
    id: 1,
    title: "Designplus",
    description:
      "Design Plus est un site vitrine dédié à la présentation de projets de mobilier sur mesure. Il a été conçu pour offrir une navigation claire, une mise en page structurée et une expérience utilisateur fluide.",
    type: "Projet professionnel",
    status: "Achévé",
    collaborators: ["Crepin ngueta", "Wilson bahun denis"],
    images: {
      desktop: Web1,
      tablet: Tablette1,
      mobile: Mobile1,
    },
  },
  {
    id: 2,
    title: "PortfolioX",
    description:
      "PortfolioX est une plateforme qui met en avant les projets graphiques d’artistes et designers, offrant une navigation fluide et moderne.",
    type: "Projet personnel",
    status: "En cours",
    collaborators: ["Alice Dupont", "John Doe"],
    images: {
      desktop: Web1,
      tablet: Tablette1,
      mobile: Mobile1,
    },
  },
];

const tags = [
  "vue js",
  "tailwind css",
  "node js",
  "react js",
  "bootstrap css scss",
  "postgres sql",
];

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 80 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.1 } },
};

export default function ProjectsList() {
  return (
    <section className="w-full py-16 px-6 md:px-12 lg:px-24 flex flex-col items-center gap-10 font-sans bg-gray-200 pb-70">
      {projects.map((project, index) => (
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
              {project.collaborators.map((name) => (
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
              <button className="flex items-center gap-1 md:gap-2 bg-black text-white px-4 py-2 md:px-7 md:py-3 rounded-full hover:opacity-80 transition font-medium md:font-bold text-[10px] md:text-sm">
                <FiExternalLink size={18} /> Live demo
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-7 py-3 rounded-full hover:opacity-80 transition font-bold text-[10px] md:text-sm">
                <FaGithub size={18} /> Code
              </button>
            </div>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-3 pt-4">
              {tags.map((tag) => (
                <span key={tag} className="px-6 py-2 border border-gray-600 rounded-full text-[14px] text-gray-800 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* -------- RIGHT MOCKUPS -------- */}
          <div className="flex justify-conter w-full lg:w-[40%] lg:h-full">
            <div className="mt-20 w-[25%] rounded-xl border-[6px] border-white bg-white relative">
              <img src={project.images.mobile} alt="Mobile" />
            </div>
            <div className="left-10 top-0 w-[85%] -ml-10 rounded-xl border-[6px] border-white bg-white overflow-hidden">
              <img src={project.images.desktop} alt="Desktop" />
            </div>
            {/* Tablet */}
            <div className="mt-20 w-[30%] rounded-xl border-[6px] -ml-10 border-white bg-white">
              <img src={project.images.tablet} alt="Tablet" />
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}
