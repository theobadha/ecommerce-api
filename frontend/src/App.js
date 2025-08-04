import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SellerAdmin from "./SellerAdmin"; 
import SellerHomepage from "./SellerHomepage";

function App() {
  return (
    <Router>
      <Routes>
      <Route path = "/admin" element={<SellerAdmin />}  />
      <Route path = "/seller/:sellerId" element={<SellerHomepage/>} />
        </Routes>
      </Router>
      );
}

export default App;
