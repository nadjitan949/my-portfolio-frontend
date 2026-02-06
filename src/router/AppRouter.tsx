import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Skills from "../pages/Skills/Skills";
import Project from "../pages/Projects/Project";
import Services from "../pages/Services/Services";
import Contact from "../pages/Contact/Contact";
import ServicesDetails from "../pages/Services/components/ServicesDetails";
import NotFound from "../components/NotFound";

// 1. On garde la fonction ici, mais on enlève le "export default"
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // L'option 'smooth' permet un défilement glissé
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  return null;
}

function AppRouter() {
  return (
    <>
      {/* 2. On place ScrollToTop ICI, au-dessus des Routes */}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/experiences" element={<Skills />} />
        <Route path="/projects" element={<Project />} />
        <Route path="/services" element={<Services />} />
        <Route path="/service/details/:id" element={<ServicesDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

// 3. Un seul export default pour tout le fichier
export default AppRouter;