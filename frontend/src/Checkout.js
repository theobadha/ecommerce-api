import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Checkout page for buyers to enter mobile number and complete payment
function Checkout() {
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  // Handle form submission (simulate payment)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful payment and redirect to orders page
    alert("Payment successful!");
    navigate("/orders");
  };

  return (
    <div>
      <h2>Checkout</h2>
      <form onSubmit={handleSubmit}>
        <p>
          Please enter your mobile phone number to complete the payment. You
          will receive an MPESA prompt to confirm the payment.
        </p>
        <label>
          Mobile Phone Number:
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Enter your mobile number"
          />
        </label>
        <br />
        <button type="submit">Complete Payment</button>
      </form>
    </div>
  );
}

export default Checkout;
