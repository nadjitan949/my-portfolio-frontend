import SectionTitle from "../../ui/SectionTitle"
import ProjectHead from "./components/ProjectHead"
import ProjectsList from "./components/ProjectsList"

function Project() {
  return (
    <>
    <main className="flex flex-col gap-15 ">
        <ProjectHead/><br />
        <SectionTitle text="Mes projets"/>
        <ProjectsList/>
    </main>
    </>
  )
}

export default Project
