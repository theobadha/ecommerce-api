import React from "react";
import { useNavigate } from "react-router-dom";

function Registration() {
  const navigate = useNavigate();

  // Render two buttons for registration type selection
  return (
    <div>
      <h2>Register as:</h2>
      <button onClick={() => navigate("/register/buyer")}>Buyer</button>
      <button onClick={() => navigate("/register/seller")}>Seller</button>
    </div>
  );
}

export default Registration;
