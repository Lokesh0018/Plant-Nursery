import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section style={{
      padding: '10vh 5vw',
      backgroundColor: 'var(--color-light-sage)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center'
    }}>
      <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Let's grow together.</h2>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: '3rem', maxWidth: '400px', lineHeight: '1.6' }}>
        Subscribe to our newsletter for plant care tips, new arrivals, and exclusive offers.
      </p>

      {submitted ? (
        <div style={{
          padding: '1.5rem 3rem',
          backgroundColor: 'var(--color-warm-cream)',
          borderRadius: '4px',
          color: 'var(--color-text-dark)'
        }}>
          Thank you for subscribing! Keep an eye on your inbox.
        </div>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', width: '100%', maxWidth: '450px', gap: '0.5rem' }}>
          <input 
            type="email" 
            placeholder="Your email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              flex: 1,
              padding: '1rem 1.5rem',
              border: 'none',
              borderRadius: '4px',
              backgroundColor: 'var(--color-off-white)',
              fontSize: '1rem',
              fontFamily: 'inherit',
              outline: 'none'
            }}
          />
          <button type="submit" style={{
            padding: '0 2rem',
            backgroundColor: 'var(--color-text-dark)',
            color: 'var(--color-warm-cream)',
            borderRadius: '4px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            Subscribe
          </button>
        </form>
      )}
    </section>
  );
}
