import SectionTitle from "../../ui/SectionTitle"
import ServicesHead from "./components/ServicesHead"
import ServicesList from "./components/ServicesList"
import { Helmet } from "react-helmet-async"

function Services() {
  return (
    <>
      <Helmet>
        <title>Mes services</title>
        <meta name="description" content="Développement d'applications web et mobiles sur mesure, création d'API performantes et architecture de solutions logicielles modernes." />
        <meta property="og:title" content="Services | Nadjitan Betan" />
        <meta property="og:description" content="Découvrez mes services en développement fullstack et ingénierie logicielle." />
        <meta property="og:image" content="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769284715/Rectangle_113_1_ydr5wk.png" />
        <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/services" />
      </Helmet>
      <main className=" flex flex-col gap-15">
        <ServicesHead />
        <SectionTitle text="Mes services" />
        <ServicesList />
      </main>
    </>
  )
}

export default Services
