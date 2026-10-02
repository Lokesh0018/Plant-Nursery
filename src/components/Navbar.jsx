import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const darkGreen = '#163624';
  const textMuted = '#4a5b4c';

  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const navRef = React.useRef(null);
  const searchInputRef = React.useRef(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });

  useEffect(() => {
    const handleCartUpdate = () => setCartCount(c => c + 1);
    window.addEventListener('cart-updated', handleCartUpdate);
    return () => window.removeEventListener('cart-updated', handleCartUpdate);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
      
      const potsElement = document.getElementById('pots');
      const featuredElement = document.getElementById('featured');
      const aboutElement = document.getElementById('about');
      const contactElement = document.getElementById('contact');
      
      if (contactElement && contactElement.getBoundingClientRect().top <= window.innerHeight - 100) {
        setActiveSection('contact');
      } else if (aboutElement && aboutElement.getBoundingClientRect().top <= window.innerHeight / 2) {
        setActiveSection('about');
      } else if (potsElement && potsElement.getBoundingClientRect().top <= window.innerHeight / 2) {
        setActiveSection('pots');
      } else if (featuredElement && featuredElement.getBoundingClientRect().top <= window.innerHeight / 2) {
        setActiveSection('plants');
      } else {
        setActiveSection('home');
      }
    };
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Update sliding indicator position
  useEffect(() => {
    if (navRef.current) {
      const activeItem = navRef.current.querySelector('.active-nav-item');
      if (activeItem) {
        setIndicatorStyle({
          left: activeItem.offsetLeft + (activeItem.offsetWidth / 2) - 2,
          width: 4,
          opacity: 1
        });
      } else {
        setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
      }
    }
  }, [activeSection, isScrolled]);

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: isScrolled ? '1rem 5vw' : '1.75rem 5vw 1rem 5vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: isScrolled ? 'rgba(252, 251, 246, 0.85)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: isScrolled ? 'blur(16px)' : 'none',
      boxShadow: isScrolled ? '0 4px 20px rgba(22, 54, 36, 0.04)' : 'none',
      borderBottom: isScrolled ? '1px solid rgba(22, 54, 36, 0.05)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
    }}>
      {/* Brand Logo */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '0.6rem',
        cursor: 'pointer'
      }}>
        {/* Leaf icon logo */}
        <div style={{
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: darkGreen
        }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={darkGreen}>
            <path d="M12 2C6.5 2 2 6.5 2 12c0 3.5 2 6.5 5 8 .5-2.5 2-6.5 5-9 3-2.5 6.5-4 9-4.5C20.5 4 16.5 2 12 2z"/>
          </svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.5rem',
            fontWeight: '700',
            color: darkGreen,
            letterSpacing: '-0.02em',
            lineHeight: 1
          }}>
            Leafora
          </span>
          <span style={{
            fontSize: '0.45rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: textMuted,
            fontWeight: '600',
            marginTop: '3px'
          }}>
            Plants for a brighter you
          </span>
        </div>
      </div>
      {/* Center Nav Links */}
      <ul ref={navRef} style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#2a3a2d',
        margin: 0,
        padding: 0
      }}>
        {/* Sliding Indicator Dot */}
        <div style={{
          position: 'absolute',
          bottom: '-7px',
          height: '4px',
          backgroundColor: darkGreen,
          borderRadius: '50%',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          pointerEvents: 'none',
          ...indicatorStyle
        }} />

        {['Home', 'Plants', 'Pots', 'About', 'Contact'].map((item) => {
          const isActive = activeSection === item.toLowerCase();
          return (
            <li 
              key={item}
              className={isActive ? 'active-nav-item' : ''}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                fontWeight: isActive ? '600' : '500',
                color: isActive ? darkGreen : textMuted,
                transition: 'all 0.3s ease',
                position: 'relative'
              }}
              onMouseEnter={(e) => { if(!isActive) e.currentTarget.style.color = darkGreen }}
              onMouseLeave={(e) => { if(!isActive) e.currentTarget.style.color = textMuted }}
              onClick={() => {
                if (item === 'Plants') {
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                } else if (item === 'Pots') {
                  document.getElementById('pots')?.scrollIntoView({ behavior: 'smooth' });
                } else if (item === 'About') {
                  document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                } else if (item === 'Contact') {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                } else if (item === 'Home') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <span>{item}</span>
            </li>
          );
        })}
      </ul>
      
      {/* Right Controls */}
      <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1.25rem' }}>
        {/* Animated Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: isSearchOpen ? 'rgba(22, 54, 36, 0.06)' : 'transparent',
          borderRadius: '100px',
          padding: isSearchOpen ? '0.4rem 0.8rem' : '4px',
          transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          width: isSearchOpen ? '180px' : '27px',
          overflow: 'hidden'
        }}>
          <button style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#2a3a2d',
            display: 'flex',
            alignItems: 'center',
            padding: 0,
            minWidth: '19px'
          }} 
          aria-label="Search"
          onClick={() => {
            if (!isSearchOpen) {
              setIsSearchOpen(true);
              setTimeout(() => searchInputRef.current?.focus(), 100);
            }
          }}
          >
            <Search size={19} strokeWidth={1.8} />
          </button>
          
          <input 
            ref={searchInputRef}
            type="text" 
            placeholder="Find plants..." 
            style={{
              border: 'none',
              background: 'transparent',
              outline: 'none',
              width: isSearchOpen ? '100%' : '0',
              opacity: isSearchOpen ? 1 : 0,
              paddingLeft: isSearchOpen ? '0.6rem' : '0',
              color: darkGreen,
              fontSize: '0.85rem',
              fontWeight: '500',
              transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            onBlur={(e) => {
              if (e.target.value === '') {
                setIsSearchOpen(false);
              }
            }}
          />
        </div>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button className="cart-icon-target" style={{
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            color: '#2a3a2d',
            display: 'flex',
            alignItems: 'center',
            padding: '4px'
          }} aria-label="Cart">
            <ShoppingBag size={19} strokeWidth={1.8} />
          </button>
          {cartCount > 0 && (
            <span className="cart-badge" style={{
              position: 'absolute',
              top: '-2px',
              right: '-4px',
              backgroundColor: darkGreen,
              color: '#ffffff',
              fontSize: '0.62rem',
              width: '15px',
              height: '15px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}>
              {cartCount}
            </span>
          )}
        </div>

        <button style={{
          backgroundColor: darkGreen,
          color: '#ffffff',
          padding: '0.65rem 1.3rem',
          borderRadius: '100px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: '500',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: '0 4px 12px rgba(22, 54, 36, 0.15)'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-1px)';
          e.currentTarget.style.opacity = '0.94';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.opacity = '1';
        }}>
          <span>Shop Now</span>
          <ArrowRight size={14} />
        </button>
      </div>
    </nav>
  );
}
