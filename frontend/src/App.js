import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Header";
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

function CartWrapper() {
  const location = useLocation();
  const { cart, buyerId } = location.state || { cart: [], buyerId: null };
  return <Cart cart={cart} buyerId={buyerId} />;
}
function App() {
  return (
    <Router>
      <Header />
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
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </Router>
  );
}

export default App;
