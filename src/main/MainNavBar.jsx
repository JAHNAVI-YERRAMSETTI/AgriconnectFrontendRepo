import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../contextapi/AuthContext'; // ✅ Import auth context
import Home from './Home';
import About from './About';
import './style.css';
import BuyerLogin from './../buyer/BuyerLogin';
import BuyerRegistration from './../buyer/BuyerRegistration';
import Contact from './Contact';
import AdminLogin from './../admin/AdminLogin';
import FarmerLogin from '../farmer/FarmerLogin';
import NotFound from './NotFound';
import Gallery from './Gallery';
import ForgotPassword from '../components/ForgotPassword';

export default function MainNavBar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAdminLoggedIn, setIsAdminLoggedIn, setAdmin } = useAuth(); // ✅ Use auth context
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const closeDropdown = () => setIsDropdownOpen(false);

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdmin(null);
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('admin');
    navigate('/adminlogin', { replace: true });
  };

  return (
    <div>
      <nav className="navbar">
        <Link to="/" className="logo">
          <div className="logo-icon">
            <div className="icon-container">
              <i className="fas fa-seedling"></i>
              <i className="fas fa-leaf"></i>
              <i className="fas fa-store"></i>
            </div>
          </div>
          <div className="logo-text">
            AGRI<span>CONNECT</span>
          </div>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>
              About
            </Link>
          </li>
          <li>
            <Link to="/gallery" className={location.pathname === '/gallery' ? 'active' : ''}>
              Gallery
            </Link>
          </li>
          <li>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/buyerregistration"
              className={location.pathname === '/buyerregistration' ? 'active' : ''}
            >
              Register
            </Link>
          </li>

          <li className="dropdown">
            <span onClick={toggleDropdown} style={{ cursor: 'pointer' }}>
              Login ▾
            </span>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/buyerlogin" onClick={closeDropdown}>
                    <i className="fas fa-shopping-cart"></i> Buyer
                  </Link>
                </li>
                <li>
                  <Link to="/farmerlogin" onClick={closeDropdown}>
                    <i className="fas fa-tractor"></i> Farmer
                  </Link>
                </li>
                <li>
                  <Link to="/adminlogin" onClick={closeDropdown}>
                    <i className="fas fa-user-shield"></i> Admin
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* ✅ Optional Logout if admin is already logged in */}
          {isAdminLoggedIn && (
            <li>
              <button className="logout-button" onClick={handleLogout}>
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </li>
          )}
        </ul>
      </nav>

      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/buyerregistration" element={<BuyerRegistration />} />
          <Route path="/buyerlogin" element={<BuyerLogin />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/farmerlogin" element={<FarmerLogin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}