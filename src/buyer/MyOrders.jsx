import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './buyer.css';

// Helper function to format date
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const navigate = useNavigate();

  // Load orders from localStorage on component mount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('myOrders') || '[]');
    setOrders(savedOrders);
  }, []);

  // Handler to view order details
  const viewOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  // Handler to go back to order list
  const backToOrderList = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="my-orders-container">
      <div className="my-orders-header">
        <h3>My Orders</h3>
        <button 
          className="continue-shopping-btn" 
          onClick={() => navigate('/buyerviewproducts')}
        >
          <i className="fas fa-shopping-basket"></i> Continue Shopping
        </button>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You don't have any orders yet.</p>
          <button 
            className="start-shopping-btn" 
            onClick={() => navigate('/buyerviewproducts')}
          >
            Start Shopping
          </button>
        </div>
      ) : selectedOrder ? (
        // Order Details View
        <div className="order-details">
          <button className="back-btn" onClick={backToOrderList}>
            <i className="fas fa-arrow-left"></i> Back to Orders
          </button>
          
          <div className="order-header">
            <div>
              <h4>Order #{selectedOrder.id.slice(-6)}</h4>
              <p>Placed on {formatDate(selectedOrder.orderDate)}</p>
            </div>
            <div className="order-status">
              <span className={`status-badge ${selectedOrder.status.toLowerCase()}`}>
                {selectedOrder.status}
              </span>
            </div>
          </div>
          
          <div className="order-info-grid">
            <div className="info-card">
              <h5>Delivery Method</h5>
              <p>{selectedOrder.deliveryMethod}</p>
              {selectedOrder.pickupDetails && (
                <p>
                  Pickup on {selectedOrder.pickupDetails.date} at {selectedOrder.pickupDetails.time}
                </p>
              )}
              <p>Location: {selectedOrder.location}</p>
            </div>
            
            <div className="info-card">
              <h5>Payment Information</h5>
              <p>Method: {selectedOrder.paymentMethod}</p>
              <p>Total Amount: ₹{selectedOrder.totalAmount}</p>
            </div>
          </div>
          
          <div className="order-items">
            <h5>Order Items</h5>
            <ul className="order-items-list">
              {selectedOrder.items.map((item, idx) => (
                <li key={idx} className="order-item">
                  <div className="item-details">
                    <span className="item-name">{item.name}</span>
                    <span className="item-quantity">x{item.quantity}</span>
                  </div>
                  <div className="item-price">
                    <span>₹{item.price * item.quantity}</span>
                    {item.discountApplied > 1 && (
                      <span className="discount-tag">
                        {item.discountApplied === 2 ? '10% OFF' : '15% OFF'}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="order-tracking">
            <h5>Order Tracking</h5>
            <div className="tracking-timeline">
              <div className="timeline-point active">
                <div className="point-indicator"></div>
                <div className="point-label">
                  <strong>Order Placed</strong>
                  <span>{formatDate(selectedOrder.trackingInfo.orderPlaced)}</span>
                </div>
              </div>
              
              <div className="timeline-point">
                <div className="point-indicator"></div>
                <div className="point-label">
                  <strong>Processing</strong>
                </div>
              </div>
              
              <div className="timeline-point">
                <div className="point-indicator"></div>
                <div className="point-label">
                  <strong>{selectedOrder.deliveryMethod === 'Store Pickup' ? 'Ready for Pickup' : 'Out for Delivery'}</strong>
                </div>
              </div>
              
              <div className="timeline-point">
                <div className="point-indicator"></div>
                <div className="point-label">
                  <strong>Completed</strong>
                  <span>Est. {formatDate(selectedOrder.trackingInfo.estimated)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Orders List View
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card" onClick={() => viewOrderDetails(order)}>
              <div className="order-card-header">
                <div>
                  <h4>Order #{order.id.slice(-6)}</h4>
                  <p>{formatDate(order.orderDate)}</p>
                </div>
                <span className={`status-badge ${order.status.toLowerCase()}`}>
                  {order.status}
                </span>
              </div>
              
              <div className="order-summary">
                <div className="order-items-preview">
                  {order.items.slice(0, 2).map((item, idx) => (
                    <div key={idx} className="item-preview">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                  {order.items.length > 2 && (
                    <div className="more-items">+{order.items.length - 2} more items</div>
                  )}
                </div>
                
                <div className="order-total">
                  <span>Total:</span>
                  <span className="total-amount">₹{order.totalAmount}</span>
                </div>
              </div>
              
              <div className="delivery-info">
                <span><i className={order.deliveryMethod.includes('Pickup') ? 'fas fa-store' : 'fas fa-truck'}></i> {order.deliveryMethod}</span>
              </div>
              
              <button className="view-details-btn">
                View Details <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
