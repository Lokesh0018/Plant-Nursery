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

      tl.to(plantRef.current, {
        y: '-10vh',
        scale: 0.9,
        ease: 'none'
      }, 0)
      .to(contentRef.current, {
        y: '-30vh',
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
          <button style={{
            background: 'var(--color-text-dark)',
            color: 'var(--color-off-white)',
            padding: '1.2rem 2.5rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.9rem',
            borderRadius: '100px',
            fontWeight: '500',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.15)';
            e.currentTarget.style.background = 'var(--color-accent-terracotta)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            e.currentTarget.style.background = 'var(--color-text-dark)';
          }}
          >
            Discover Collection
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
