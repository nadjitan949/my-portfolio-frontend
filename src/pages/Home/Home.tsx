import SectionTitle from "../../ui/SectionTitle"
import Collabs from "./components/Collabs"
import Hero from "./components/Hero"
import Review from "./components/Review"
import WorkFlow from "./components/WorkFlow"

function Home() {
    return (
        <>
            <main className="flex flex-col gap-20">
                <Hero />
                <SectionTitle text="Construire des solutions numériques dans un cadre professionnel"/>
                <WorkFlow/>
                <SectionTitle text="Quelques collaborateurs"/>
                <Collabs/>
                <SectionTitle text="Ils me font confiance" />
                <Review/>
            </main>
        </>
    )
}

export default Home
