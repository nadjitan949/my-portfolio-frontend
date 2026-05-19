import ContactForm from "./components/ContactForm"
import ContactHead from "./components/ContactHead"
import { Helmet } from "react-helmet-async"

function Contact() {
    return (
        <>
            <Helmet>
                <title>Me contacter</title>
                <meta name="description" content="Vous avez un projet web, mobile ou besoin d'une expertise backend ? Discutons-en. Contactez-moi directement via le formulaire." />
                <meta property="og:title" content="Contact | Nadjitan Betan" />
                <meta property="og:description" content="Discutons de vos projets et collaborations futures." />
                <meta property="og:image" content="https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1000" />
                <meta property="og:url" content="https://nadjitan-betan.dayal-enterprises.com/contact" />
            </Helmet>
            <main className="mb-100 flex flex-col gap-15">
                <ContactHead />
                <ContactForm />
            </main>
        </>
    )
}

export default Contact
