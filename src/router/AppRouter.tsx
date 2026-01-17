import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Skills from "../pages/Skills/Skills";
import Project from "../pages/Projects/Project";
import Services from "../pages/Services/Services";
import Contact from "../pages/Contact/Contact";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/experiences" element={<Skills/>} />
      <Route path="/projects" element={<Project/>} />
      <Route path="/services" element={<Services/>}/>
      <Route path="/contact" element={<Contact/>}/>
    </Routes>
  );
}

export default AppRouter;
