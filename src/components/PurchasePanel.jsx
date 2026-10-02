import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

export default function PurchasePanel({ product }) {
  const [quantity, setQuantity] = useState(1);
  const [type, setType] = useState('one-time');

  return (
    <div className="purchase-panel" style={{
      background: 'var(--color-off-white)',
      padding: '2rem',
      borderRadius: '4px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
      width: '100%',
      maxWidth: '380px'
    }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input type="radio" name="purchaseType" checked={type === 'one-time'} onChange={() => setType('one-time')} />
          One-time purchase
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
          <input type="radio" name="purchaseType" checked={type === 'subscribe'} onChange={() => setType('subscribe')} />
          Subscribe and save 15%
        </label>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid #ddd',
          borderRadius: '4px',
          overflow: 'hidden'
        }}>
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '0.5rem 1rem' }}><Minus size={14} /></button>
          <span style={{ padding: '0 1rem', fontSize: '0.9rem' }}>{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)} style={{ padding: '0.5rem 1rem' }}><Plus size={14} /></button>
        </div>
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem' }}>
          ₹{(product.price * quantity * (type === 'subscribe' ? 0.85 : 1)).toLocaleString()}
        </div>
      </div>

      <button style={{
        background: 'var(--color-text-dark)',
        color: 'var(--color-off-white)',
        padding: '1rem',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        fontSize: '0.85rem',
        borderRadius: '4px',
        fontWeight: '500',
        transition: 'background 0.3s ease'
      }}>
        Add to Cart
      </button>

      <div style={{
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        textAlign: 'center',
        lineHeight: '1.5'
      }}>
        <p>Free carbon-neutral shipping on orders over ₹2000.</p>
        <p>30-day happiness guarantee.</p>
      </div>
    </div>
  );
}
