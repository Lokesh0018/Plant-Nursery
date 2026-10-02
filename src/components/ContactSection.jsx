import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import './ContactSection.css';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Reveal animations for content
      gsap.fromTo('.contact-reveal', 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          }
        }
      );

      // Parallax effect for the massive background text
      gsap.to('.contact-bg-text', {
        y: '-15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert("Thanks for subscribing!");
      setEmail('');
    }
  };

  return (
    <footer ref={sectionRef} id="contact" className="contact-section">
      <div className="contact-noise-overlay" />
      
      {/* Massive Background Typography */}
      <div className="contact-bg-text">VERDANT</div>

      <div className="contact-container">
        {/* Newsletter Area */}
        <div className="contact-newsletter contact-reveal">
          <h2 className="newsletter-heading">Let's grow together.</h2>
          <p className="newsletter-desc">
            Subscribe to our journal for botanical insights, care guides, and exclusive early access to new collections.
          </p>
          
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <input 
                type="email" 
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="newsletter-input"
              />
              <button 
                type="submit" 
                className="newsletter-submit"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Subscribe</span>
                <ArrowRight size={18} strokeWidth={1.5} className={`submit-icon ${isHovered ? 'hovered' : ''}`} />
              </button>
            </div>
          </form>
        </div>

        <div className="contact-divider contact-reveal" />

        {/* Footer Links Area */}
        <div className="contact-footer-grid contact-reveal">
          <div className="footer-brand">
            <h3 className="brand-name">VERDANT</h3>
            <p className="brand-tagline">Cultivating spaces with nature's finest.</p>
          </div>
          
          <div className="footer-links-group">
            <h4 className="footer-col-title">Shop</h4>
            <a href="#" className="footer-link">All Plants</a>
            <a href="#" className="footer-link">Collections</a>
            <a href="#" className="footer-link">Planters</a>
            <a href="#" className="footer-link">Care Tools</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-col-title">About</h4>
            <a href="#" className="footer-link">Our Story</a>
            <a href="#" className="footer-link">Journal</a>
            <a href="#" className="footer-link">Careers</a>
          </div>

          <div className="footer-links-group">
            <h4 className="footer-col-title">Support</h4>
            <a href="#" className="footer-link">Plant Care</a>
            <a href="#" className="footer-link">FAQ</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="contact-bottom contact-reveal">
          <p>&copy; {new Date().getFullYear()} Verdant. All rights reserved.</p>
          <div className="social-links">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Pinterest</a>
            <a href="#" className="social-link">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
