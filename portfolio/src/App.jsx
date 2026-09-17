import React from 'react';
import CustomCursor from './components/ui/CustomCursor';
import GlobalBackground from './components/layout/GlobalBackground';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import FeaturedWork from './components/sections/FeaturedWork';
import Experiments from './components/sections/Experiments';
import PersonalPhilosophy from './components/sections/PersonalPhilosophy';
import Certificates from './components/sections/Certificates';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

function App() {
  return (
    <>
      <GlobalBackground />
      <CustomCursor />
      <Navigation />
      
      <main id="main-content">
        <Hero />
        <About />
        <FeaturedWork />
        <Experiments />
        <PersonalPhilosophy />
        <Certificates />
        <Journey />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
