import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function StorySection() {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        },
        y: '15%',
        ease: 'none'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} style={{
      display: 'flex',
      alignItems: 'center',
      padding: '10vh 5vw',
      backgroundColor: 'var(--color-off-white)',
      minHeight: '80vh',
      gap: '5vw'
    }}>
      <div style={{ flex: 1, height: '60vh', overflow: 'hidden', borderRadius: '4px' }}>
        <img 
          ref={imageRef}
          src="/nursery.jpeg" 
          alt="Botanical setup" 
          style={{ width: '100%', height: '120%', objectFit: 'cover', transform: 'translateY(-10%)' }}
        />
      </div>
      
      <div style={{ flex: 1, padding: '0 4rem' }}>
        <h2 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '2rem' }}>
          Bring nature closer to home.
        </h2>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '1.5rem' }}>
          Every plant in our collection is carefully selected from sustainable growers who share our commitment to quality. We believe that caring for plants should be a joyful experience, not a stressful one.
        </p>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--color-text-muted)', marginBottom: '3rem' }}>
          That's why we don't just send you a plant—we provide the guidance, tools, and ongoing support you need to help your indoor garden thrive for years to come.
        </p>
        <a href="#" style={{
          display: 'inline-block',
          fontSize: '0.85rem',
          fontWeight: '500',
          letterSpacing: '1px',
          borderBottom: '1px solid var(--color-text-dark)',
          paddingBottom: '4px'
        }}>
          OUR STORY
        </a>
      </div>
    </section>
  );
}
