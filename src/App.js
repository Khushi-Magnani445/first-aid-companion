import "./App.css";

import {Route, Routes} from "react-router-dom";
// Assuming LearnMore.js is another component
import Header from './components/Header';
import Footer from './components/Footer';
import LearnMore from './components/LearnMore';
import Contact from './components/Contact';
import Nav from './common/Nav';
import HomePage from './components/HomePage';

import DiseaseInfo from "./pages/DiseaseInfo";
// require('dotenv').config(); 
function App() {
  return (
    <div>
      <Header />
      <Nav />
      <main>
      {/* <Routes> */}
          {/* Define routes for your components */}
          {/* <Route path="/" element={<HomePage />} />
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog/:emergencyId" element={<BlogPage />} /> */}
        {/* </Routes> */}
        <section>
          <HomePage />
        </section>
        <section id="learn-more">
          <LearnMore />
        </section>
        
        
        <Routes>
          <Route path="/" element={<LearnMore />} />
          <Route path="/disease-info" element={<DiseaseInfo />} />
        </Routes>

        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
