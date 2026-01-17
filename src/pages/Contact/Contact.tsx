import ContactForm from "./components/ContactForm"
import ContactHead from "./components/ContactHead"

function Contact() {
    return (
        <>
            <main className="mb-100 flex flex-col gap-15">
                <ContactHead />
                <ContactForm/>
            </main>
        </>
    )
}

export default Contact
