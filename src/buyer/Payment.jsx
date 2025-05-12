import React, { useState } from 'react';
import { useCart } from './cartContext';
import './buyer.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
import './toast.css';

const Toast = ({ message, type, onClose }) => {
  return (
    <div className={`toast-notification ${type}`}>
      <div className="toast-content">
        <span>{message}</span>
        <button onClick={onClose}>×</button>
      </div>
    </div>
  );
};

const discountOptions = [
  { label: 'Buy 1', price: 0, desc: 'Standard Price', value: 1 },
  { label: 'Buy 2, get 10% off', price: 0.9, desc: 'Most Popular', value: 2 },
  { label: 'Buy 3, get 15% off', price: 0.85, desc: 'Best Value', value: 3 },
];

const deliveryTabs = [
  { label: 'Shipping', icon: 'fas fa-truck' },
  { label: 'Store Pickup', icon: 'fas fa-store' },
  { label: 'Local Delivery', icon: 'fas fa-motorcycle' },
];

const paymentMethods = [
  { label: 'UPI', icon: 'fas fa-university' },
  { label: 'Credit/Debit Card', icon: 'fas fa-credit-card' },
  { label: 'Cash on Delivery', icon: 'fas fa-money-bill-wave' },
];

export default function Payment() {
  const { cart, clearCart } = useCart();
  const { buyer } = useAuth();
  const [selectedDiscount, setSelectedDiscount] = useState(1);
  const [deliveryTab, setDeliveryTab] = useState(1);
  const [pickupTime, setPickupTime] = useState('18:30');
  const [pickupDate, setPickupDate] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });

  const [upiId, setUpiId] = useState('');
  const [cardDetails, setCardDetails] = useState({ number: '', expiry: '', cvv: '' });

  const navigate = useNavigate();

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  const getDiscountedTotal = () => {
    let total = 0;
    cart.forEach(({ product, quantity }) => {
      let discount = 1;
      if (selectedDiscount === 2 && quantity >= 2) discount = 0.9;
      if (selectedDiscount === 3 && quantity >= 3) discount = 0.85;
      total += product.price * quantity * discount;
    });
    return Math.round(total);
  };
  const saveOrderToLocalStorage = (order) => {
  const existingOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
  const updatedOrders = [order, ...existingOrders];
  localStorage.setItem('myOrders', JSON.stringify(updatedOrders));
};


const handleCheckout = () => {
  if (cart.length === 0) {
    showToast('Your cart is empty!', 'error');
    return;
  }

  const newOrder = {
    id: Date.now().toString(),
    orderDate: new Date().toISOString(),
    items: cart.map(({ product, quantity }) => ({
      ...product,
      quantity,
      discountApplied: selectedDiscount
    })),
    totalAmount: getDiscountedTotal(),
    deliveryMethod: deliveryTabs[deliveryTab].label,
    paymentMethod,
    location,
    status: 'Placed',
    trackingInfo: {
      orderPlaced: new Date().toISOString(),
      estimated: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    },
    pickupDetails:
      deliveryTab === 1
        ? {
            date: pickupDate,
            time: pickupTime
          }
        : null
  };

  setLoading(true);

  setTimeout(() => {
    saveOrderToLocalStorage(newOrder); // ✅ ensures order is saved for MyOrders
    showToast('Payment successful! Your order has been placed.', 'success');
    clearCart();
    setLoading(false);
    setTimeout(() => {
      navigate('/myorders');
    }, 2000);
  }, 1000);
};

  const suggestions = [
    { name: 'Fresh Carrots', price: 40 },
    { name: 'Organic Lettuce', price: 60 },
    { name: 'Tomatoes', price: 35 },
  ];

  return (
    <div className="payment-flex-container">
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}

      <div className="payment-cart-summary">
        {cart.length === 0 ? (
          <p>No items in cart.</p>
        ) : (
          <>
            <h4>Order Summary</h4>
            <ul className="payment-items-list">
              {cart.map(({ product, quantity }) => (
                <li key={product.id} className="payment-item">
                  <span>{product.name} (x{quantity})</span>
                  <span>₹{product.price * quantity}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>

      <div className="payment-main-section">
        <div className="payment-discount-box">
          <div className="discount-header">
            <span className="discount-title">Exclusive Discount</span>
            <span className="discount-badge">Save Big Deals!</span>
          </div>

          <div className="discount-options">
            {discountOptions.map((opt) => (
              <label
                key={opt.value}
                className={`discount-option${selectedDiscount === opt.value ? ' selected' : ''}`}
              >
                <input
                  type="radio"
                  name="discount"
                  checked={selectedDiscount === opt.value}
                  onChange={() => setSelectedDiscount(opt.value)}
                />
                <span className="discount-label">{opt.label}</span>
                <span className="discount-desc">{opt.desc}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="payment-delivery-box">
          <div className="delivery-tabs">
            {deliveryTabs.map((tab, idx) => (
              <button
                key={tab.label}
                className={`delivery-tab${deliveryTab === idx ? ' active' : ''}`}
                onClick={() => setDeliveryTab(idx)}
              >
                <i className={tab.icon}></i> {tab.label}
              </button>
            ))}
          </div>

          <div className="delivery-content">
            {deliveryTab === 1 && (
              <>
                <div className="delivery-row">
                  <label htmlFor="pickup-location">Pickup Location</label>
                  <input
                    id="pickup-location"
                    type="text"
                    placeholder="Enter location..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="delivery-row">
                  <label htmlFor="pickup-date">Select Pickup Date</label>
                  <input
                    id="pickup-date"
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                  />
                </div>

                <div className="delivery-row">
                  <label htmlFor="pickup-time">Select Pickup Time</label>
                  <input
                    id="pickup-time"
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                  />
                </div>
              </>
            )}

            {deliveryTab === 0 && (
              <>
                <div className="delivery-row">
                  <label htmlFor="shipping-address">Shipping Address</label>
                  <input
                    id="shipping-address"
                    type="text"
                    placeholder="Enter full shipping address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="delivery-row">
                  <label htmlFor="confirm-area">Delivery Area</label>
                  <div className="manual-location-hint">
                    Please confirm your delivery area manually.
                  </div>
                </div>
              </>
            )}

            {deliveryTab === 2 && (
              <>
                <div className="delivery-row">
                  <label htmlFor="delivery-address">Delivery Address</label>
                  <input
                    id="delivery-address"
                    type="text"
                    placeholder="Enter delivery address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="delivery-row">
                  <label htmlFor="confirm-area">Delivery Area</label>
                  <div className="manual-location-hint">
                    Please confirm your delivery area manually.
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="payment-methods">
            <label style={{ fontWeight: 600, marginBottom: 6 }}>
              Payment Method
            </label>
            <div className="payment-method-options">
              {paymentMethods.map((m) => (
                <label
                  key={m.label}
                  className={`payment-method-option${paymentMethod === m.label ? ' selected' : ''}`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === m.label}
                    onChange={() => setPaymentMethod(m.label)}
                  />
                  <i className={m.icon}></i> {m.label}
                </label>
              ))}
            </div>

            {paymentMethod === 'UPI' && (
              <div className="payment-input">
                <label htmlFor="upi-id">Enter UPI ID</label>
                <input
                  type="text"
                  id="upi-id"
                  placeholder="example@upi"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}

            {paymentMethod === 'Credit/Debit Card' && (
              <div className="payment-inputs">
                <label>Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.number}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, number: e.target.value })
                  }
                />
                <label>Expiry Date</label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                <label>CVV</label>
                <input
                  type="password"
                  placeholder="***"
                  value={cardDetails.cvv}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvv: e.target.value })
                  }
                />
              </div>
            )}
          </div>

          <button
            className="proceed-pay-btn"
            style={{ width: '100%', marginTop: 18 }}
            onClick={handleCheckout}
            disabled={cart.length === 0 || loading}
          >
            {loading ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>

      <div className="payment-suggestions">
        <button className="continue-shopping-btn" onClick={() => navigate('/buyerviewproducts')}>
          <i className="fas fa-arrow-left"></i> Continue Shopping
        </button>
        <div className="suggestions-list">
          <h5>You may also like</h5>
          <ul>
            {suggestions.map((s, idx) => (
              <li key={idx} className="suggestion-item">
                <span>{s.name}</span>
                <span>₹{s.price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="payment-total-box">
        <span>Total:</span>
        <span className="payment-total-amount">₹{getDiscountedTotal()}</span>
      </div>
    </div>
  );
}
