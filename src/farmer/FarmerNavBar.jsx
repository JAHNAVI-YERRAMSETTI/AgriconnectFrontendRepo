import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './farmer.css';
import FarmerHome from './FarmerHome';
import FarmerProfile from './FarmerProfile';
import FarmerLogin from './FarmerLogin';
import AddProduct from './AddProduct';
import ViewProducts from './ViewProducts';
import ManageProducts from './ManageProducts';
import { useAuth } from '../contextapi/AuthContext';

export default function FarmerNavBar() {
  const { setIsFarmerLoggedIn, setFarmer } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsFarmerLoggedIn(false);
    setFarmer(null);
    navigate('/farmerlogin');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="logo">Welcome Farmer</div>
        <ul className="nav-links">
          <li><Link to="/farmerhome">Home</Link></li>
          <li><Link to="/farmerprofile">Profile</Link></li>
          <li><Link to="/addproduct">Add Product</Link></li>
          <li><Link to="/viewproducts">View Products</Link></li>
          <li><Link to="/manageproducts">Manage Products</Link></li>
          <li><button className="logout-button" onClick={handleLogout}>Logout</button></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/farmerhome" element={<FarmerHome />} />
        <Route path="/farmerprofile" element={<FarmerProfile />} />
        <Route path="/addproduct" element={<AddProduct />} />
        <Route path="/viewproducts" element={<ViewProducts />} />
        <Route path="/manageproducts" element={<ManageProducts />} />
        <Route path="/farmerlogin" element={<FarmerLogin />} />
      </Routes>
    </div>
  );
}