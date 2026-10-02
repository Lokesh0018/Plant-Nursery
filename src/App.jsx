import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useSmoothScroll } from './hooks/useSmoothScroll';

import Navbar from './components/Navbar';
import LandingHero from './components/LandingHero';
import Hero from './components/Hero';
import Collection from './components/Collection';
import StorySection from './components/StorySection';
import PlantCare from './components/PlantCare';
import Newsletter from './components/Newsletter';
import Footer from './components/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useSmoothScroll();

  return (
    <div className="app-container" style={{ backgroundColor: 'var(--color-sage-green)' }}>
      <Navbar />
      <LandingHero />
      <Hero />
      <Collection />
      <StorySection />
      <PlantCare />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default App;
