import React from 'react';

export default function Footer() {
  return (
    <footer id="contact" style={{
      backgroundColor: 'var(--color-warm-cream)',
      padding: '5vh 5vw 2vh 5vw',
      borderTop: '1px solid rgba(23, 39, 29, 0.1)',
      color: 'var(--color-text-dark)'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: '4rem',
        flexWrap: 'wrap',
        gap: '2rem'
      }}>
        <div style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          letterSpacing: '2px',
          fontWeight: '500'
        }}>
          VERDANT
        </div>

        <div style={{ display: 'flex', gap: '4rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', letterSpacing: '1px', marginBottom: '0.5rem' }}>SHOP</h4>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>All Plants</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Collections</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Planters</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Care Tools</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', letterSpacing: '1px', marginBottom: '0.5rem' }}>ABOUT</h4>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Our Story</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Journal</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Careers</a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '500', letterSpacing: '1px', marginBottom: '0.5rem' }}>SUPPORT</h4>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Plant Care</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>FAQ</a>
            <a href="#" style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>Contact</a>
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2rem',
        borderTop: '1px solid rgba(23, 39, 29, 0.1)',
        fontSize: '0.8rem',
        color: 'var(--color-text-muted)'
      }}>
        <div>&copy; {new Date().getFullYear()} Verdant. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <a href="#">Instagram</a>
          <a href="#">Pinterest</a>
          <a href="#">TikTok</a>
        </div>
      </div>
    </footer>
  );
}
