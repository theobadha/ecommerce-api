import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authenticatedPost } from "./utils/api";

// Checkout page for buyers to enter mobile number and complete payment
function Checkout() {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const cart = location.state?.cart || [];
  const buyerId = location.state?.buyerId || localStorage.getItem("buyerId");

  console.log("Checkout - location.state:", location.state);
  console.log("Checkout - buyerId:", buyerId);
  console.log("Checkout - cart:", cart);

  // Handle form submission (simulate payment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!buyerId) {
      setError("Buyer ID not found. Please log in again.");
      return;
    }

    if (cart.length === 0) {
      setError("Cart is empty. Please add items to cart first.");
      return;
    }

    // Simulate successful payment and redirect to orders page
    setLoading(true);
    setError(null);

    try {
      // Persist each cart item as an order in the database using authenticated API
      for (const item of cart) {
        const orderData = {
          buyerId,
          itemName: item.itemName,
          qtyPurchase: item.quantity,
          sellerId: item.seller,
        };
        console.log("Creating order with data:", orderData);
        
        // Use the authenticated API utility function
        const result = await authenticatedPost("/api/orders", orderData);
        console.log("Order created:", result);
      }

      alert("Payment successful!");
      navigate("/orders", { state: { cart, buyerId } });
    } catch (error) {
      console.error("Error creating orders:", error);
      setError("Failed to create orders: " + error.message);
      
      // Handle authentication errors
      if (error.message.includes("Authentication failed") || error.message.includes("token not found")) {
        navigate("/login/buyer");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      
      {/* Show error messages */}
      {error && (
        <div style={{ color: "red", padding: "10px", border: "1px solid red", margin: "10px 0" }}>
          Error: {error}
        </div>
      )}
      
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
            disabled={loading} // Disable input while processing
          />
        </label>
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      </form>
    </div>
  );
}

export default Checkout;
