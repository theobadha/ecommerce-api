import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authenticatedGet } from "./utils/api";
import { useAuth } from "./contexts/AuthContext";

function Orders() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, buyerId: buyerIdFromState } = location.state || { cart: [], buyerId: null };
  // Derive buyerId from multiple sources to support direct navigation
  const buyerId = buyerIdFromState || user?.id || localStorage.getItem("buyerId");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all orders for the buyer using authenticated API
    const fetchOrders = async () => {
      if (!buyerId) {
        setError("Buyer ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        // Use the authenticated API utility function
        const data = await authenticatedGet(`/api/orders/buyer/${buyerId}`);
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders: " + error.message);
        
        // Handle authentication errors
        if (error.message.includes("Authentication failed") || error.message.includes("token not found")) {
          navigate("/login/buyer");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [buyerId, navigate]);

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.length === 0 ? (
        <p> No orders placed yet.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order._id}>
              <strong>{order.itemName}</strong> - Qty: {order.qtyPurchase} - 
              Price: ${order.price} - Total: ${order.price * order.qtyPurchase}
              <br />
              <small>Ordered on: {new Date(order.createdAt).toLocaleDateString()}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Orders;
