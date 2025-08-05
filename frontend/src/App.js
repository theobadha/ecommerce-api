import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerAdmin from "./SellerAdmin";
import SellerHomepage from "./SellerHomepage";
import Inventory from "./Inventory";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<SellerAdmin />} />
        <Route path="/seller/:sellerId" element={<SellerHomepage />} />
        <Route path="/inventory" element={<Inventory />} />
      </Routes>
    </Router>
  );
}

export default App;
