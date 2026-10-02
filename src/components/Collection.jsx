import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import { Plus, Sun, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product }) {
  const [isHovered, React_useState] = React.useState(false);
  const setIsHovered = React_useState;

  return (
    <div 
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        backgroundColor: 'transparent',
        padding: '1rem',
        aspectRatio: '3/4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        position: 'relative'
      }}>
        {/* Soft shadow that shrinks when the plant lifts */}
        <div style={{
          position: 'absolute',
          bottom: '10%',
          width: '50%',
          height: '20px',
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0) 70%)',
          borderRadius: '50%',
          transform: isHovered ? 'scale(0.85)' : 'scale(1)',
          opacity: isHovered ? 0.4 : 0.8,
          transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }} />
        
        {/* Plant Image */}
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            transform: isHovered ? 'scale(1.08) translateY(-10px)' : 'scale(1) translateY(0)',
            transition: 'all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
            zIndex: 2,
            filter: 'drop-shadow(0 15px 15px rgba(0,0,0,0.08))'
          }}
        />

        {/* Quick Add Button */}
        <button style={{
          position: 'absolute',
          bottom: '10%',
          right: '10%',
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          backgroundColor: '#163624',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
          cursor: 'pointer',
          opacity: isHovered ? 1 : 0,
          transform: isHovered ? 'translateY(0) scale(1)' : 'translateY(15px) scale(0.9)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          boxShadow: '0 8px 20px rgba(22, 54, 36, 0.25)',
          zIndex: 3
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>

      <div style={{ padding: '0 0.5rem', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <p style={{ 
            color: '#7a8c7c', 
            fontSize: '0.7rem', 
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: '600'
          }}>
            {product.scientificName}
          </p>
          
          {product.care && (
            <div style={{ display: 'flex', gap: '0.4rem', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', color: '#4a5b4c', background: 'rgba(22, 54, 36, 0.06)', padding: '0.25rem 0.5rem', borderRadius: '100px', fontWeight: '600' }}>
                <Sun size={11} strokeWidth={2.5} />
                {product.care.light}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', color: '#4a5b4c', background: 'rgba(22, 54, 36, 0.06)', padding: '0.25rem 0.5rem', borderRadius: '100px', fontWeight: '600' }}>
                <Droplets size={11} strokeWidth={2.5} />
                {product.care.water}
              </span>
            </div>
          )}
        </div>

        <h3 style={{ 
          fontSize: '1.4rem', 
          marginBottom: '0.5rem',
          fontFamily: 'var(--font-serif)',
          color: '#163624',
          fontWeight: '500',
          lineHeight: '1.2'
        }}>
          {product.name}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
          <p style={{ 
            fontSize: '1.15rem', 
            fontWeight: '600',
            color: '#2a3a2d'
          }}>
            ₹{product.price.toLocaleString()}
          </p>
          <div style={{
             width: isHovered ? '32px' : '0px',
             height: '2px',
             backgroundColor: '#163624',
             transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
             opacity: isHovered ? 1 : 0
          }} />
        </div>
      </div>
    </div>
  );
}

export default function Collection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      });

      gsap.from(gridRef.current.children, {
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="collection" ref={sectionRef} style={{
      padding: '10vh 5vw',
      backgroundColor: 'var(--color-warm-cream)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Huge background text */}
      <div style={{
        position: 'absolute',
        top: '5vh',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '25vw',
        fontWeight: 'bold',
        color: 'rgba(255, 255, 255, 0.4)',
        zIndex: 0,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        lineHeight: 1
      }}>
        Plant
      </div>

      <h2 ref={headingRef} style={{
        fontSize: '2.5rem',
        textAlign: 'center',
        marginBottom: '4rem',
        maxWidth: '600px',
        margin: '0 auto 4rem auto',
        position: 'relative',
        zIndex: 1
      }}>
        Select
      </h2>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '4rem 2rem'
      }}>
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
