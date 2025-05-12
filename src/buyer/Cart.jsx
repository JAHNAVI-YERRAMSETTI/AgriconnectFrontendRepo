import React from 'react';
import { useCart } from './cartContext';
import './buyer.css';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleProceedToPay = () => {
    navigate('/payment');
  };

  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h3 className="cart-title">Your Cart</h3>
      {cart.length === 0 ? (
        <p className="cart-empty">Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items-grid">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="cart-item-card">
                <div className="cart-image-placeholder">
                  {/* Replace with <img src={product.imageUrl} ... /> if available */}
                  <span>{product.name}</span>
                </div>
                <div className="cart-item-details">
                  <h4>{product.name}</h4>
                  <div className="cart-meta">
                    <span>Price: ₹{product.price}</span>
                    <span>Farmer: {product.farmer?.name || 'N/A'}</span>
                  </div>
                  <div className="cart-quantity-row">
                    <label>Qty:</label>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={e => updateQuantity(product.id, parseInt(e.target.value) || 1)}
                    />
                  </div>
                  <div className="cart-subtotal">Subtotal: ₹{product.price * quantity}</div>
                  <button className="remove-cart-btn" onClick={() => removeFromCart(product.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="cart-total">Total: ₹{total}</div>
            <button className="proceed-pay-btn" onClick={handleProceedToPay} disabled={cart.length === 0}>
              Proceed to Pay
            </button>
            <button className="clear-cart-btn" onClick={clearCart} disabled={cart.length === 0}>
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
} 