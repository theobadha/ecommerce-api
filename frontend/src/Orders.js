import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Orders() {
  const location = useLocation();
  const { cart, buyerId } = location.state || { cart: [], buyerId: null };
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all orders for the buyer
    const fetchOrders = async () => {
      if (!buyerId) {
        setError("Buyer ID not found. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/orders/buyer/${buyerId}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Fetched orders:", data);
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [buyerId]);

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
