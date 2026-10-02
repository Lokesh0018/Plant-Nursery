import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pots } from '../data/pots';
import { Plus, Sun, Droplets } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

function PotCard({ pot }) {
  const [isHovered, React_useState] = React.useState(false);
  const setIsHovered = React_useState;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    const card = e.currentTarget.closest('.pot-card');
    const img = card.querySelector('img');
    const cartIcon = document.querySelector('.cart-icon-target');
    const cartBadge = document.querySelector('.cart-badge');

    if (!img || !cartIcon) return;

    const clone = img.cloneNode(true);
    const imgRect = img.getBoundingClientRect();
    const cartRect = cartIcon.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.top = `${imgRect.top}px`;
    clone.style.left = `${imgRect.left}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.zIndex = 9999;
    clone.style.pointerEvents = 'none';
    clone.style.transform = 'none';
    clone.style.transition = 'none';
    clone.style.filter = 'drop-shadow(0 15px 15px rgba(0,0,0,0.2))';
    
    document.body.appendChild(clone);

    // Horizontal movement
    gsap.to(clone, {
      left: cartRect.left + cartRect.width / 2 - 15,
      width: 30,
      height: 30,
      duration: 0.9,
      ease: "power1.inOut"
    });

    // Vertical movement with a deep U-dip
    gsap.to(clone, {
      top: cartRect.top + cartRect.height / 2 - 15,
      opacity: 0.3,
      duration: 0.9,
      ease: "back.in(3)", 
      onComplete: () => {
        clone.remove();
        
        window.dispatchEvent(new CustomEvent('cart-updated'));

        gsap.fromTo(cartIcon, { scale: 1 }, { scale: 1.3, duration: 0.15, yoyo: true, repeat: 1 });
        
        setTimeout(() => {
          const badge = document.querySelector('.cart-badge');
          if (badge) {
            gsap.fromTo(badge, { scale: 1 }, { scale: 1.5, duration: 0.15, yoyo: true, repeat: 1, backgroundColor: '#3a7d44' });
            gsap.to(badge, { backgroundColor: '#163624', delay: 0.3 });
          }
        }, 50);
      }
    });
  };

  return (
    <div 
      className="pot-card"
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
        {/* Soft shadow that shrinks when the pot lifts */}
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
        
        {/* Pot Image */}
        <img 
          src={pot.image} 
          alt={pot.name} 
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
        onClick={handleAddToCart}
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
            {pot.scientificName}
          </p>
          
          {pot.care && (
            <div style={{ display: 'flex', gap: '0.4rem', opacity: isHovered ? 1 : 0.6, transition: 'opacity 0.3s ease' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', color: '#4a5b4c', background: 'rgba(22, 54, 36, 0.06)', padding: '0.25rem 0.5rem', borderRadius: '100px', fontWeight: '600' }}>
                <Sun size={11} strokeWidth={2.5} />
                {pot.care.light}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.65rem', color: '#4a5b4c', background: 'rgba(22, 54, 36, 0.06)', padding: '0.25rem 0.5rem', borderRadius: '100px', fontWeight: '600' }}>
                <Droplets size={11} strokeWidth={2.5} />
                {pot.care.water}
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
          {pot.name}
        </h3>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '0.25rem' }}>
          <p style={{ 
            fontSize: '1.15rem', 
            fontWeight: '600',
            color: '#2a3a2d'
          }}>
            ₹{pot.price.toLocaleString()}
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

export default function PotsCollection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bgTextRef = useRef(null);
  const gridRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      
      // Animate background text
      gsap.fromTo(bgTextRef.current, 
        { y: 250, opacity: 0, scale: 0.85 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 95%',
            end: 'center center',
            scrub: 1.5
          },
          y: 0,
          opacity: 1,
          scale: 1,
          ease: 'none'
        }
      );

      // Animate heading
      gsap.fromTo(headingRef.current, 
        { y: 50, opacity: 0 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom top',
            toggleActions: 'play reverse play reverse'
          },
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out'
        }
      );

      // Animate pots grid children individually
      const cards = gsap.utils.toArray(gridRef.current.children);
      cards.forEach((card, index) => {
        gsap.fromTo(card, 
          { y: 120, opacity: 0, scale: 0.95 },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 90%', 
              end: 'bottom top',
              toggleActions: 'play reverse play reverse'
            },
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'back.out(1.2)',
            delay: (index % 4) * 0.1 
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pots-collection" ref={sectionRef} style={{
      padding: '10vh 5vw',
      backgroundColor: 'var(--color-warm-cream)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Huge background text */}
      <div ref={bgTextRef} style={{
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
        Pots
      </div>

      <div ref={headingRef} style={{
        textAlign: 'center',
        marginBottom: '4rem',
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <span style={{
          display: 'block',
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.2em',
          color: '#4a5b4c',
          fontWeight: '600',
          marginBottom: '1rem'
        }}>
          Handcrafted
        </span>
        <h2 style={{
          fontSize: '3.5rem',
          fontFamily: 'var(--font-serif)',
          color: '#163624',
          fontWeight: '400',
          lineHeight: '1.1',
          margin: 0
        }}>
          Ceramics
        </h2>
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: '#163624',
          marginTop: '1.5rem',
          opacity: 0.2
        }} />
      </div>

      <div ref={gridRef} style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '4rem 2rem'
      }}>
        {pots.map(pot => (
          <PotCard key={pot.id} pot={pot} />
        ))}
      </div>
    </section>
  );
}
