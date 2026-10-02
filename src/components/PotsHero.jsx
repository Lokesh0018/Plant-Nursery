import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function PotsHero() {
  const containerRef = useRef(null);
  const potRef = useRef(null);
  const contentRef = useRef(null);
  
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current.children, 
        { y: 30, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power3.out'
        }
      );

      gsap.fromTo(potRef.current, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out'
        }
      );

      // Scroll Parallax Animation
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      tl.to([potRef.current, contentRef.current], {
        y: '-20vh',
        opacity: 0,
        ease: 'none'
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pots" ref={containerRef} style={{
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

      {/* Centering Wrapper */}
      <div style={{
        display: 'flex',
        width: '100%',
        maxWidth: '1280px',
        margin: '0 auto',
        height: '100%',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Content on the Left */}
        <div ref={contentRef} style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: '12rem',
        paddingRight: '0',
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
          Handcrafted Ceramic
        </h1>
        
        <h2 style={{ 
          fontSize: '1.75rem', 
          fontStyle: 'italic', 
          color: 'var(--color-text-muted)', 
          marginBottom: '2.5rem',
          fontWeight: '300'
        }}>
          Minimalist Terrazzo Collection
        </h2>

        <p style={{ 
          fontSize: '1.15rem', 
          lineHeight: '1.7', 
          maxWidth: '480px', 
          marginBottom: '3.5rem', 
          color: 'var(--color-text-secondary)',
          fontWeight: '300'
        }}>
          Elevate your botanical display with our artisanal pots. Designed to provide perfect drainage and root breathability while serving as a stunning sculptural element in your home.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <button 
            className="hero-cta-button"
            style={{ padding: '1.1rem 2.2rem', fontSize: '1rem' }}
          >
            <span>Explore Pots</span>
            <ArrowRight size={18} className="cta-arrow" />
          </button>
        </div>
      </div>

      {/* Image on the Right */}
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
          ref={potRef}
          src="/pots/pots-Photoroom.png"
          alt="Handcrafted Ceramic Pot"
          style={{
            height: '90vh',
            marginTop: '13vh',
            objectFit: 'contain',
            transformOrigin: 'bottom center',
            filter: 'drop-shadow(0 30px 20px rgba(0,0,0,0.15))',
            zIndex: 10
          }}
        />
        </div>
      </div>
    </section>
  );
}
