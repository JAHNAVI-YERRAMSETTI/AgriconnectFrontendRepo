import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import './admin.css';
import AddFarmer from './AddFarmer';
import ViewFarmers from './ViewFarmers';
import ViewBuyers from './ViewBuyers';
import AllBuyerOrders from './AllBuyerOrders';
import ViewAllProducts from './ViewAllProducts';
import AdminDashboard from './AdminDashboard';
import AdminProfile from './AdminProfile';
import ContactMessages from './ContactMessages';
import { useAuth } from '../contextapi/AuthContext';
import axios from 'axios';

export default function AdminNavBar() {
  const { setIsAdminLoggedIn, setAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setIsAdminLoggedIn(false);
    setAdmin(null);
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("admin");

    // Delay navigation to ensure logout state takes effect
    setTimeout(() => {
      navigate("/adminlogin", { replace: true });
    }, 0);
  };

  const fixedNavItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: 'fas fa-tachometer-alt' },
    { path: '/adminprofile', label: 'Admin Profile', icon: 'fas fa-user-shield' }
  ];

  const dynamicNavItems = [
    { path: '/addfarmer', label: 'Add Farmers', icon: 'fas fa-user-plus' },
    { path: '/viewfarmers', label: 'View Farmers', icon: 'fas fa-users' },
    { path: '/viewallbuyers', label: 'View Buyers', icon: 'fas fa-shopping-cart' },
    { path: '/admin/vieworders', label: 'View Orders', icon: 'fas fa-clipboard-list' },
    { path: '/admin/viewproducts', label: 'View Products', icon: 'fas fa-box' },
    { path: '/admin/contactmessages', label: 'Contact Messages', icon: 'fas fa-envelope' }
  ];

  return (
    <div className="admin-layout">
      <nav className="admin-sidebar">
        <div className="admin-logo">Admin Panel</div>
        <ul className="admin-nav-links">
          {fixedNavItems.map((item) => (
            <li key={item.path}>
              <Link to={item.path}>
                <i className={item.icon}></i> {item.label}
              </Link>
            </li>
          ))}

          {dynamicNavItems.map((item) =>
            location.pathname !== item.path && (
              <li key={item.path}>
                <Link to={item.path}>
                  <i className={item.icon}></i> {item.label}
                </Link>
              </li>
            )
          )}

          <li>
            <Link to="#" onClick={handleLogout}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </Link>
          </li>
        </ul>
      </nav>

      <div className="admin-content">
        <Routes>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/addfarmer" element={<AddFarmer />} />
          <Route path="/viewfarmers" element={<ViewFarmers />} />
          <Route path="/viewallbuyers" element={<ViewBuyers />} />
          <Route path="/admin/vieworders" element={<AllBuyerOrders />} />
          <Route path="/admin/viewproducts" element={<ViewAllProducts />} />
          <Route path="/admin/contactmessages" element={<ContactMessages />} />
          <Route path="/adminprofile" element={<AdminProfile />} />
          <Route path="/" element={<AdminDashboard />} />
          <Route path="*" element={<AdminDashboard />} />
        </Routes>
      </div>
    </div>
  );
}