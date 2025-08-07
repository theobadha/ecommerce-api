import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerAdmin from "./SellerAdmin";
import SellerHomepage from "./SellerHomepage";
import Inventory from "./Inventory";
import LoginForm from "./LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<SellerAdmin />} />
        <Route path="/seller/:sellerId" element={<SellerHomepage />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/login/seller" element={<LoginForm userType="seller" />} />
        <Route path="/login/buyer" element={<LoginForm userType="buyer" />} />
      </Routes>
    </Router>
  );
}

export default App;
