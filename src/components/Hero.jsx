import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import { Star, ArrowRight } from 'lucide-react';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const containerRef = useRef(null);
  const plantRef = useRef(null);
  const contentRef = useRef(null);
  
  const product = products[0];

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // Entrance animation
      gsap.from(contentRef.current.children, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from(plantRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top -10%',
          end: 'bottom top',
          scrub: 1,
        }
      });

      tl.to([plantRef.current, contentRef.current], {
        y: '-10vh',
        opacity: 0,
        ease: 'none'
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" ref={containerRef} className="featured-hero-section">
      {/* Floor color element */}
      <div className="featured-hero-floor" />

      <div className="featured-hero-image-container">
        <img 
          ref={plantRef}
          src={product.image}
          alt={product.name}
          className="featured-hero-image"
        />
      </div>

      <div ref={contentRef} className="featured-hero-content">

        <h1 className="featured-hero-title">
          {product.name}
        </h1>
        
        <h2 className="featured-hero-subtitle">
          {product.scientificName}
        </h2>

        <p className="featured-hero-description">
          {product.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button 
            className="hero-cta-button"
            style={{ padding: '1.1rem 2.2rem', fontSize: '1rem' }}
            onClick={() => {
              const el = document.getElementById('collection');
              if (el) {
                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                window.scrollTo({ top: y, behavior: 'smooth' });
              }
            }}
          >
            <span>Discover Collection</span>
            <ArrowRight size={18} className="cta-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
