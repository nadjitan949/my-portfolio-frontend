import type { ReactNode } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type MainLayoutProps = {
    children: ReactNode
};

function MainLayout({ children }: MainLayoutProps) {
    return (
        <>
            <Header />
                <main>{children}</main>
            <Footer />
        </>
    )
}

export default MainLayout
