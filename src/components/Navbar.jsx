import React from 'react';
import { ShoppingBag, User } from 'lucide-react';

export default function Navbar() {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '2rem 4rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      color: 'var(--color-text-dark)'
    }}>
      <div style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '1.5rem',
        letterSpacing: '2px',
        fontWeight: '500'
      }}>
        VERDANT
      </div>
      
      <ul style={{
        display: 'flex',
        gap: '3rem',
        fontSize: '0.85rem',
        fontWeight: '500',
        letterSpacing: '1px'
      }}>
        <li style={{ cursor: 'pointer' }}>SHOP NOW</li>
        <li style={{ cursor: 'pointer' }}>COLLECTIONS</li>
        <li style={{ cursor: 'pointer' }}>WORKSHOP</li>
      </ul>
      
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <button><User size={20} strokeWidth={1.5} /></button>
        <button><ShoppingBag size={20} strokeWidth={1.5} /></button>
      </div>
    </nav>
  );
}
