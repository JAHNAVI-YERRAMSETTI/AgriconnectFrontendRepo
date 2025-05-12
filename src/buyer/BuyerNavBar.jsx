import { Routes, Route, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contextapi/AuthContext';
import './buyer.css';

import BuyerHome from './BuyerHome';
import BuyerProfile from './BuyerProfile';
import UpdateBuyerProfile from './UpdateBuyerProfile';
import BuyerLogin from './BuyerLogin';
import BuyerRegistration from './BuyerRegistration';
import ViewProducts from './ViewProducts';
import MyOrders from './MyOrders';
import Contact from '../main/Contact';
import Cart from './Cart';
import Payment from './Payment';

export default function BuyerNavBar() {
  const { setIsBuyerLoggedIn, buyer, setBuyer } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsBuyerLoggedIn(false);
    setBuyer(null);
    navigate("/buyerlogin");
  };

  // Define fixed and full nav item sets
  const fixedNavItems = [
    { path: '/buyerhome', label: 'Home', icon: 'fas fa-home' },
    { path: '/buyerprofile', label: 'Profile', icon: 'fas fa-user' },
    { path: '/updatebuyerprofile', label: 'Edit Profile', icon: 'fas fa-user-edit' },
    { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  const fullNavItems = [
    { path: '/buyerhome', label: 'Home', icon: 'fas fa-home' },
    { path: '/buyerviewproducts', label: 'Browse Products', icon: 'fas fa-shopping-bag' },
    { path: '/cart', label: 'Cart', icon: 'fas fa-shopping-cart' },
    { path: '/myorders', label: 'My Orders', icon: 'fas fa-clipboard-list' },
    { path: '/buyerprofile', label: 'Profile', icon: 'fas fa-user' },
    { path: '/updatebuyerprofile', label: 'Edit Profile', icon: 'fas fa-user-edit' },
    { path: '/contact', label: 'Contact', icon: 'fas fa-envelope' }
  ];

  // Determine whether to show fixed or full nav
  const fixedPages = ['/buyerhome', '/buyerprofile', '/updatebuyerprofile', '/contact'];
  const navItems = fixedPages.includes(location.pathname) ? fixedNavItems : fullNavItems;

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Buyer</div>
        <ul className="nav-links">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink to={item.path} className={({ isActive }) => isActive ? 'active' : ''}>
                <i className={item.icon}></i> {item.label}
              </NavLink>
            </li>
          ))}
          <li>
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/buyerhome" element={<BuyerHome />} />
        <Route path="/buyerviewproducts" element={<ViewProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/buyerprofile" element={<BuyerProfile />} />
        <Route path="/updatebuyerprofile" element={<UpdateBuyerProfile />} />
        <Route path="/buyerlogin" element={<BuyerLogin />} />
        <Route path="/buyerregistration" element={<BuyerRegistration />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}
