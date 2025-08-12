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
import { useLocation } from "react-router-dom";

function CartWrapper() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  return <Cart cart={cart} />;
}

function CartWrapper() {
  const location = useLocation();
  const { cart } = location.state || { cart: [] };
  return <Cart cart={cart} />;
}
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Registration />} />
        <Route path="/register/buyer" element={<BuyerAdmin />} />
        <Route path="/register/seller" element={<SellerAdmin />} />
        <Route path="/admin" element={<SellerAdmin />} />{" "}
        <Route path="/login/seller" element={<LoginForm userType="seller" />} />
        <Route path="/seller/:sellerId" element={<SellerHomepage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login/buyer" element={<LoginForm userType="buyer" />} />
        <Route path="/buyer/:buyerId" element={<BuyerHomepage />} />
        <Route path="/cart" element={<CartWrapper />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}

export default App;
