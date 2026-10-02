import React from 'react';
import { ShoppingBag, Search, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const darkGreen = '#163624';
  const textMuted = '#4a5b4c';

  return (
    <nav style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      padding: '1.75rem 5vw 1rem 5vw',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      backgroundColor: 'transparent'
    }}>
      {/* Brand Logo */}
      <div style={{
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
      <ul style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2.5rem',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#2a3a2d',
        margin: 0,
        padding: 0
      }}>
        <li style={{
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          fontWeight: '600',
          color: darkGreen
        }}>
          <span>Home</span>
          <span style={{
            width: '4px',
            height: '4px',
            backgroundColor: darkGreen,
            borderRadius: '50%',
            marginTop: '3px'
          }}></span>
        </li>
        <li style={{ cursor: 'pointer', color: textMuted, transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = darkGreen} onMouseLeave={(e) => e.currentTarget.style.color = textMuted}>Shop</li>
        <li style={{ cursor: 'pointer', color: textMuted, transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = darkGreen} onMouseLeave={(e) => e.currentTarget.style.color = textMuted}>About</li>
        <li style={{ cursor: 'pointer', color: textMuted, transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = darkGreen} onMouseLeave={(e) => e.currentTarget.style.color = textMuted}>Care Guide</li>
        <li style={{ cursor: 'pointer', color: textMuted, transition: 'color 0.2s ease' }} onMouseEnter={(e) => e.currentTarget.style.color = darkGreen} onMouseLeave={(e) => e.currentTarget.style.color = textMuted}>Contact</li>
      </ul>
      
      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <button style={{
          border: 'none',
          background: 'transparent',
          cursor: 'pointer',
          color: '#2a3a2d',
          display: 'flex',
          alignItems: 'center',
          padding: '4px'
        }} aria-label="Search">
          <Search size={19} strokeWidth={1.8} />
        </button>

        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <button style={{
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
          <span style={{
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
            2
          </span>
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
