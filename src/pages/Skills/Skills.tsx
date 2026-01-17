import SectionTitle from "../../ui/SectionTitle"
import Head from "./components/Head"
import Languages from "./components/Languages"
import Tools from "./components/Tools"

function Skills() {
    return (
        <>
            <main className="flex flex-col gap-15">
                <Head />
                <SectionTitle text="Languanges"/>
                <Languages/>
                <Tools/>
            </main>
        </>
    )
}

export default Skills
