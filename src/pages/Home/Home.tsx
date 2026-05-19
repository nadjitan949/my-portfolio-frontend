import SectionTitle from "../../ui/SectionTitle"
import Collabs from "./components/Collabs"
import Hero from "./components/Hero"
import Review from "./components/Review"
import WorkFlow from "./components/WorkFlow"
import { Helmet } from "react-helmet-async"

function Home() {
    return (
        <>
            <Helmet>
                <meta property="og:title" content="Portfolio | Nadjitan Betan" />
                <meta property="og:description" content="Découvrez mes réalisations et mes compétences en développement web." />
                <meta property="og:image" content="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769281530/upscalemedia-transformed_1_y1amsj.png" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/" />
            </Helmet>
            <main className="flex flex-col gap-20">
                <Hero />
                <SectionTitle text="Construire des solutions numériques dans un cadre professionnel" />
                <WorkFlow />
                <SectionTitle text="Quelques collaborateurs" />
                <Collabs />
                <SectionTitle text="Ils me font confiance" />
                <Review />
            </main>
        </>
    )
}

export default Home
