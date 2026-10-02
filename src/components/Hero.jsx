import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PurchasePanel from './PurchasePanel';
import { products } from '../data/products';
import { Star } from 'lucide-react';

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
          pin: true,
        }
      });

      tl.to(plantRef.current, {
        y: '-40vh',
        scale: 1.1,
        ease: 'none'
      }, 0)
      .to(contentRef.current, {
        y: '-20vh',
        opacity: 0,
        ease: 'none'
      }, 0)
      .to('.app-container', {
        backgroundColor: 'var(--color-warm-cream)',
        ease: 'none'
      }, 0);

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '0 5vw',
      paddingTop: '5vh',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        flex: 1,
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: 'var(--color-text-muted)' }}>
          <div style={{ display: 'flex', color: 'var(--color-accent-terracotta)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span style={{ fontSize: '0.9rem' }}>{product.rating} ({product.reviews} reviews)</span>
        </div>

        <h1 style={{ fontSize: '4.5rem', lineHeight: '1.1', marginBottom: '0.5rem' }}>
          {product.name}
        </h1>
        
        <h2 style={{ fontSize: '1.5rem', fontStyle: 'italic', color: 'var(--color-text-muted)', marginBottom: '2rem' }}>
          {product.scientificName}
        </h2>

        <p style={{ fontSize: '1.1rem', lineHeight: '1.6', maxWidth: '450px', marginBottom: '3rem', color: 'var(--color-text-secondary)' }}>
          {product.description}
        </p>

        <PurchasePanel product={product} />
      </div>
    </section>
  );
}
