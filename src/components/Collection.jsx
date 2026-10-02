import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '../data/products';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function ProductCard({ product }) {
  return (
    <div className="product-card" style={{ cursor: 'pointer', group: 'true' }}>
      <div style={{
        backgroundColor: '#EBE6D9',
        borderRadius: '4px',
        padding: '2rem',
        aspectRatio: '3/4',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{
            width: '80%',
            height: '80%',
            objectFit: 'contain',
            transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.08)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        />
        <button style={{
          position: 'absolute',
          bottom: '1rem',
          right: '1rem',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-text-dark)',
          color: 'var(--color-warm-cream)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: 0,
          transform: 'translateY(10px)',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
        className="add-btn"
        >
          <Plus size={20} />
        </button>
      </div>
      <div>
        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>{product.name}</h3>
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.85rem', fontStyle: 'italic', marginBottom: '0.5rem' }}>{product.scientificName}</p>
        <p style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)' }}>₹{product.price.toLocaleString()}</p>
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
    <section ref={sectionRef} style={{
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
        Planter
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
        Select a planter design
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
