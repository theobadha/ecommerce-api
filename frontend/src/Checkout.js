import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Checkout page for buyers to enter mobile number and complete payment
function Checkout() {
  const [phone, setPhone] = useState("");
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
      alert("Buyer ID not found. Please log in again.");
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty. Please add items to cart first.");
      return;
    }

    // Simulate successful payment and redirect to orders page

    //Persist each cart item as an order in the database
    try {
      for (const item of cart) {
        const orderData = {
          buyerId,
          itemName: item.itemName,
          qtyPurchase: item.quantity,
          sellerId: item.seller,
        };
        console.log("Creating order with data:", orderData);
        
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderData),
        });
        
        if (!response.ok) {
          throw new Error(`Failed to create order: ${response.statusText}`);
        }
        
        const result = await response.json();
        console.log("Order created:", result);
      }

      alert("Payment successful!");
      navigate("/orders", { state: { cart, buyerId } });
    } catch (error) {
      console.error("Error creating orders:", error);
      alert("Failed to create orders: " + error.message);
    }
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
