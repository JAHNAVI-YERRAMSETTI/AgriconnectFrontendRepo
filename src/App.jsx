import { BrowserRouter } from "react-router-dom";
import MainNavBar from "./main/MainNavBar";
import FarmerNavBar from "./farmer/FarmerNavBar";
import BuyerNavBar from "./buyer/BuyerNavBar";
import AdminNavBar from "./admin/AdminNavBar";
import { AuthProvider, useAuth } from "./contextapi/AuthContext";
import { CartProvider } from "./buyer/cartContext";

function NavigationBar() {
  const { isAdminLoggedIn, isBuyerLoggedIn, isFarmerLoggedIn } = useAuth();

  if (isAdminLoggedIn) return <AdminNavBar />;
  if (isBuyerLoggedIn)
    return (
      <CartProvider>
        <BuyerNavBar />
      </CartProvider>
    );
  if (isFarmerLoggedIn) return <FarmerNavBar />;
  return <MainNavBar />;
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NavigationBar />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
