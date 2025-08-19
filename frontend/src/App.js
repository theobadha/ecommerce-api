import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Registration from "./Registration";
import SellerAdmin from "./SellerAdmin";
import SellerHomepage from "./SellerHomepage";
import BuyerAdmin from "./BuyerAdmin";
import BuyerHomepage from "./BuyerHomepage";
import Inventory from "./Inventory";
import LoginForm from "./LoginForm";
import Cart from "./Cart";
import Checkout from "./Checkout";
import Orders from "./Orders";
import { useLocation } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function CartWrapper() {
  const location = useLocation();
  const { cart, buyerId } = location.state || { cart: [], buyerId: null };
  return <Cart cart={cart} buyerId={buyerId} />;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes - no authentication required */}
          <Route path="/register" element={<Registration />} />
          <Route path="/register/buyer" element={<BuyerAdmin />} />
          <Route path="/register/seller" element={<SellerAdmin />} />
          <Route path="/login/seller" element={<LoginForm userType="seller" />} />
          <Route path="/login/buyer" element={<LoginForm userType="buyer" />} />
          
          {/* Protected routes - authentication required */}
          <Route path="/admin" element={
            <ProtectedRoute userType="seller">
              <SellerAdmin />
            </ProtectedRoute>
          } />
          <Route path="/seller/:sellerId" element={
            <ProtectedRoute userType="seller">
              <SellerHomepage />
            </ProtectedRoute>
          } />
          <Route path="/buyer/:buyerId" element={
            <ProtectedRoute userType="buyer">
              <BuyerHomepage />
            </ProtectedRoute>
          } />
          <Route path="/inventory" element={
            <ProtectedRoute userType="seller">
              <Inventory />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <CartWrapper />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/orders" element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
