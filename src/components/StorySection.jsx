import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

import './StorySection.css';

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
    <section ref={containerRef} className="story-section">
      <div className="story-image-container">
        <img 
          ref={imageRef}
          src="/nursery.jpeg" 
          alt="Botanical setup" 
          className="story-image"
        />
      </div>
      
      <div className="story-content">
        <h2 className="story-heading">
          Bring nature closer to home.
        </h2>
        <p className="story-paragraph">
          Every plant in our collection is carefully selected from sustainable growers who share our commitment to quality. We believe that caring for plants should be a joyful experience, not a stressful one.
        </p>
        <p className="story-paragraph">
          That's why we don't just send you a plant—we provide the guidance, tools, and ongoing support you need to help your indoor garden thrive for years to come.
        </p>
      </div>
    </section>
  );
}
