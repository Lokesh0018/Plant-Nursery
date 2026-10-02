import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import { Star, ArrowRight } from 'lucide-react';

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
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        delay: 0.2
      });

      gsap.from(plantRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.5,
        ease: 'power2.out'
      });

      // Scroll Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      tl.to([plantRef.current, contentRef.current], {
        y: '-20vh',
        opacity: 0,
        ease: 'none'
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="featured" ref={containerRef} style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5vw',
      paddingTop: '5vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floor color element */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '20vh',
        backgroundColor: 'var(--color-warm-cream)',
        zIndex: 0
      }} />

      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        <img 
          ref={plantRef}
          src={product.image}
          alt={product.name}
          style={{
            height: '75vh',
            objectFit: 'contain',
            transformOrigin: 'bottom center',
            filter: 'drop-shadow(0 30px 20px rgba(0,0,0,0.15))',
            zIndex: 10
          }}
        />
      </div>

      <div ref={contentRef} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '4rem',
        zIndex: 5
      }}>

        <h1 style={{ 
          fontSize: 'clamp(3.5rem, 5vw, 5.5rem)', 
          lineHeight: '1.05', 
          marginBottom: '0.75rem',
          fontWeight: '400',
          letterSpacing: '-0.02em',
          color: 'var(--color-text-dark)'
        }}>
          {product.name}
        </h1>
        
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontStyle: 'italic', 
          color: 'var(--color-text-muted)', 
          marginBottom: '2.5rem',
          fontWeight: '300'
        }}>
          {product.scientificName}
        </h2>

        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.7', 
          maxWidth: '480px', 
          marginBottom: '3.5rem', 
          color: 'var(--color-text-secondary)',
          fontWeight: '300'
        }}>
          {product.description}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button 
            className="hero-cta-button"
            style={{ padding: '1.1rem 2.2rem', fontSize: '1rem' }}
            onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <span>Discover Collection</span>
            <ArrowRight size={18} className="cta-arrow" />
          </button>
        </div>
      </div>
    </section>
  );
}
