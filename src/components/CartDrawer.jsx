import React, { useEffect } from 'react';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import './CartDrawer.css';

export default function CartDrawer({ isOpen, onClose, cartItems = [], updateQuantity }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <>
      <div 
        className={`cart-overlay ${isOpen ? 'open' : ''}`} 
        onClick={onClose}
        aria-hidden="true"
      />
      <div 
        className={`cart-drawer ${isOpen ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button 
            className="cart-close-btn" 
            onClick={onClose}
            aria-label="Close cart"
          >
            <X size={24} />
          </button>
        </div>

        <div className={`cart-content ${cartItems.length === 0 ? 'empty-state' : ''}`} data-lenis-prevent="true">
          {cartItems.length === 0 ? (
            <>
              <div className="empty-cart-icon">
                <ShoppingBag size={48} strokeWidth={1} />
              </div>
              <h3>Your cart is empty</h3>
              <p>Looks like you haven't added any plants or pots to your cart yet.</p>
              <button 
                className="continue-shopping-btn"
                onClick={() => {
                  onClose();
                  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Continue Shopping</span>
                <ArrowRight size={16} />
              </button>
            </>
          ) : (
            <div className="cart-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {cartItems.map(item => (
                <div key={item.id} className="cart-item" style={{ display: 'flex', gap: '1rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '1rem' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px' }} />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1rem', color: 'var(--color-text-dark)' }}>{item.name}</h4>
                      <span style={{ fontWeight: '600', color: 'var(--color-text-dark)' }}>₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                    
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
                        <button onClick={() => updateQuantity(item.id, -1)} style={{ padding: '0.2rem 0.6rem', background: 'white', border: 'none', cursor: 'pointer' }}>-</button>
                        <span style={{ padding: '0 0.5rem', fontSize: '0.85rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} style={{ padding: '0.2rem 0.6rem', background: 'white', border: 'none', cursor: 'pointer' }}>+</button>
                      </div>
                      <button 
                        onClick={() => updateQuantity(item.id, -item.quantity)}
                        style={{ background: 'transparent', border: 'none', fontSize: '0.75rem', textDecoration: 'underline', color: 'var(--color-text-secondary)', cursor: 'pointer' }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer" style={{ padding: '1.5rem', borderTop: '1px solid #f1f5f9', backgroundColor: 'white' }}>
            <div className="cart-subtotal" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '1.1rem', fontWeight: '600', color: 'var(--color-text-dark)' }}>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>
            <p className="shipping-note" style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', marginBottom: '1rem' }}>Shipping and taxes calculated at checkout.</p>
            <button className="checkout-btn" style={{ width: '100%', background: 'var(--color-text-dark)', color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '1rem', cursor: 'pointer' }}>Checkout</button>
          </div>
        )}
      </div>
    </>
  );
}
