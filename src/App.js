import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Products from "./pages/Products";
import OurTeam from "./pages/OurTeam";
import News from "./pages/News";
import Contact from "./pages/Contact";

// Product Pages
import CSSD from "./pages/products/CSSD";
import HospitalDesign from "./pages/products/HospitalDesign";
import PlasticSurgery from "./pages/products/PlasticSurgery";
import Neurosurgery from "./pages/products/Neurosurgery";
import Theatre from "./pages/products/Theatre";
import HomeCares from "./pages/products/HomeCares";

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/cssd" element={<CSSD />} />
          <Route path="/products/hospital-design" element={<HospitalDesign />} />
          <Route path="/products/plastic-surgery" element={<PlasticSurgery />} />
          <Route path="/products/neurosurgery" element={<Neurosurgery />} />
          <Route path="/products/theatre" element={<Theatre />} />
          <Route path="/products/home-cares" element={<HomeCares />} />
          <Route path="/our-team" element={<OurTeam />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;