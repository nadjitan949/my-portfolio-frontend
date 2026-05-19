import SectionTitle from "../../ui/SectionTitle"
import Head from "./components/Head"
import Languages from "./components/Languages"
import Tools from "./components/Tools"
import { Helmet } from "react-helmet-async"

function Skills() {
    return (
        <>
            <Helmet>
                <title>Mes compétences</title>
                <meta name="description" content="Découvrez mon expertise technique : langages de programmation, frameworks (React, Node.js) et outils de développement que j'utilise au quotidien." />
                <meta property="og:title" content="Compétences | Nadjitan Betan" />
                <meta property="og:description" content="Explorez mes compétences techniques et technologies maîtrisées." />
                <meta property="og:image" content="https://res.cloudinary.com/dndpjhfm1/image/upload/v1769281555/Rectangle_69_bt49yd.png" />
                <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/experiences" />
            </Helmet>
            <main className="flex flex-col gap-10">
                <Head />
                <SectionTitle text="Languanges" />
                <Languages />
                <Tools />
            </main>
        </>
    )
}

export default Skills
