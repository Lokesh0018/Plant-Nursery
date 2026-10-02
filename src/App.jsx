import React, { useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import Hero from './components/Hero';
import Collection from './components/Collection';
import PotsHero from './components/PotsHero';
import PotsCollection from './components/PotsCollection';
import StorySection from './components/StorySection';
import PlantCare from './components/PlantCare';
import Contact from './components/Contact';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useSmoothScroll();
  
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      // Refresh ScrollTrigger after loading screen is gone
      setTimeout(() => ScrollTrigger.refresh(), 100);
    }
  }, [isLoading]);

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--color-sage-green)' }}>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar />
      <LandingHero />
      <Hero />
      <Collection />
      <PotsHero />
      <PotsCollection />
      <StorySection />
      <PlantCare />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
