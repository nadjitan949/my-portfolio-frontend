import Background from "./components/Background"
import Content from "./components/Content"
import Collabs from "./components/Collabs"
import SectionTitle from "../../ui/SectionTitle"
import { Helmet } from "react-helmet-async"

function About() {
  return (
    <>
      <Helmet>
        <title>À propos de moi</title>
        <meta name="description" content="Découvrez mon parcours, mes compétences de développeur fullstack et l'histoire derrière mes projets." />
        <meta property="og:title" content="À propos | Nadjitan Betan" />
        <meta property="og:description" content="Découvrez mon parcours et mes compétences techniques." />
        <meta property="og:image" content="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769281577/Rectangle_68_vsf3uk.png" />
        <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/about" />
      </Helmet>

      <main className="mb-60 flex flex-col gap-20">
        <Content />
        <SectionTitle text="Quelques collaborateurs" />
        <Collabs />
        <Background />
      </main>
    </>
  )
}

export default About
