import React from 'react';
import CustomCursor from './components/ui/CustomCursor';
import GlobalBackground from './components/layout/GlobalBackground';
import Navigation from './components/layout/Navigation';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import FeaturedWork from './components/sections/FeaturedWork';
import Creative from './components/sections/Creative';
import PersonalPhilosophy from './components/sections/PersonalPhilosophy';
import Certificates from './components/sections/Certificates';
import Journey from './components/sections/Journey';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';

function App() {
  // Smooth scroll behavior fallback for older browsers if needed, 
  // but CSS scroll-behavior is usually sufficient unless we use a library like Lenis.
  // For this build, we rely on native smooth scrolling.

  return (
    <>
      <GlobalBackground />
      <CustomCursor />
      <Navigation />
      
      <main>
        <Hero />
        <About />
        <FeaturedWork />
        <Creative />
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
