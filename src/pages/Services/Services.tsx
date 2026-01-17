import SectionTitle from "../../ui/SectionTitle"
import ServicesHead from "./components/ServicesHead"
import ServicesList from "./components/ServicesList"

function Services() {
  return (
    <>
    <main className=" flex flex-col gap-15">
        <ServicesHead/><br />
        <SectionTitle text="Mes services"/>
        <ServicesList/>
    </main>
    </>
  )
}

export default Services
