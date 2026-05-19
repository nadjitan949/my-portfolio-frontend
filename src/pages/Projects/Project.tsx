import SectionTitle from "../../ui/SectionTitle"
import ProjectHead from "./components/ProjectHead"
import ProjectsList from "./components/ProjectsList"
import { Helmet } from "react-helmet-async"

function Project() {
  return (
    <>
      <Helmet>
        <title>Mes projets réalisés</title>
        <meta name="description" content="Explorez mes réalisations, mes projets fullstack, applications web et mobiles, et découvrez mon code source." />
        <meta property="og:title" content="Projets | Nadjitan Betan" />
        <meta property="og:description" content="Découvrez mon portfolio de projets web et mobiles." />
        <meta property="og:image" content="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284524/Rectangle_95_1_vc13jk.png" />
        <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/projects" />
      </Helmet>
      <main className="flex flex-col gap-15 ">
        <ProjectHead /><br />
        <SectionTitle text="Mes projets" />
        <ProjectsList />
      </main>
    </>
  )
}

export default Project
