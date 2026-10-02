import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Footer.css';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.fromTo('.footer-reveal', 
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="premium-footer">
      <div className="premium-footer-container">
        
        <div className="footer-top-grid footer-reveal">
          <div className="footer-brand-col">
            <h3 className="footer-brand-name">VERDANT</h3>
            <p className="footer-brand-desc">
              Cultivating spaces with nature's finest. Elevate your interior with our curated botanical collection.
            </p>
          </div>
          
          <div className="footer-links-col">
            <h4 className="footer-col-header">Shop</h4>
            <a href="#" className="footer-link">All Plants</a>
            <a href="#" className="footer-link">Collections</a>
            <a href="#" className="footer-link">Planters</a>
            <a href="#" className="footer-link">Care Tools</a>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-header">About</h4>
            <a href="#" className="footer-link">Our Story</a>
            <a href="#" className="footer-link">Journal</a>
            <a href="#" className="footer-link">Careers</a>
          </div>

          <div className="footer-links-col">
            <h4 className="footer-col-header">Support</h4>
            <a href="#" className="footer-link">Plant Care</a>
            <a href="#" className="footer-link">FAQ</a>
            <a href="#" className="footer-link">Contact Us</a>
          </div>
        </div>

        <div className="footer-divider footer-reveal" />

        <div className="footer-bottom footer-reveal">
          <p className="footer-copyright">&copy; {new Date().getFullYear()} Verdant. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#" className="social-link">Instagram</a>
            <a href="#" className="social-link">Pinterest</a>
            <a href="#" className="social-link">TikTok</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
