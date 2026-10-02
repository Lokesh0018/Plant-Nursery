import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sun, Droplets, Sprout } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const careData = [
  {
    icon: <Sun size={32} strokeWidth={1} />,
    title: 'Light',
    description: 'Find the perfect spot. Most of our plants thrive in bright, indirect sunlight.'
  },
  {
    icon: <Droplets size={32} strokeWidth={1} />,
    title: 'Water',
    description: 'Consistent moisture is key. We provide tailored watering schedules for every plant.'
  },
  {
    icon: <Sprout size={32} strokeWidth={1} />,
    title: 'Soil',
    description: 'Our custom potting mix ensures proper drainage and aeration for healthy roots.'
  }
];

export default function PlantCare() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(cardsRef.current.children, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out'
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      padding: '12vh 5vw',
      backgroundColor: 'var(--color-sage-green)',
      color: 'var(--color-text-dark)'
    }}>
      <h2 style={{
        fontSize: '3.5rem',
        textAlign: 'center',
        marginBottom: '5rem',
      }}>
        Growing happiness, one leaf at a time.
      </h2>

      <div ref={cardsRef} style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '4rem',
        flexWrap: 'wrap'
      }}>
        {careData.map((item, index) => (
          <div key={index} style={{
            flex: '1',
            minWidth: '250px',
            maxWidth: '350px',
            textAlign: 'center',
            padding: '2rem'
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 1.5rem auto',
              backgroundColor: 'var(--color-warm-cream)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-text-dark)'
            }}>
              {item.icon}
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{item.title}</h3>
            <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
