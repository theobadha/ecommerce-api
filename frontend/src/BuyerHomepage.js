import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authenticatedGet } from "./utils/api";
import { useAuth } from "./contexts/AuthContext";

function BuyerHomepage() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { buyerId } = useParams();
  const { logout } = useAuth(); // Use authentication context

  useEffect(() => {
    // Fetch all inventory items with quantity > 0 using authenticated API call
    const fetchInventory = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Use the authenticated API utility function
        const data = await authenticatedGet("/api/inventory");
        setInventory(data);
      } catch (error) {
        console.error("Error fetching inventory:", error);
        setError(error.message);
        
        // Handle authentication errors
        if (error.message.includes("Authentication failed") || error.message.includes("token not found")) {
          // Redirect to login page
          navigate("/login/buyer");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchInventory();
  }, [navigate]);

  const handleAddToCart = (item) => {
    // Check if item is already in the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (itemInCart) {
      // If item is already in the cart, update the quantity
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      // If item is not in the cart, add it
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  //navigate to cart page, passing cart as state
  const goToCart = () => {
    navigate("/cart", { state: { cart, buyerId } });
  };

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/login/buyer");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <h2>Buyer - Available Inventory</h2>
        <button 
          onClick={handleLogout}
          style={{ 
            padding: "8px 16px", 
            backgroundColor: "#dc3545", 
            color: "white", 
            border: "none", 
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      </div>
      
      <button onClick={goToCart} style={{}}>
        Go to Cart({cart.length})
      </button>
      
      {/* Show loading state */}
      {loading && <p>Loading inventory...</p>}
      
      {/* Show error state */}
      {error && (
        <div style={{ color: "red", padding: "10px", border: "1px solid red", margin: "10px 0" }}>
          Error: {error}
        </div>
      )}
      
      {/* Show inventory list */}
      {!loading && !error && (
        <ul>
          {inventory.map((item) => (
            <li key={item._id}>
              {item.itemName} - {item.itemDescription} - Qty: {item.quantity} -{" "}
              {item.category} - {item.condition} - ${item.price} - Seller:{" "}
              {item.seller?.name}
              <button
                style={{ marginLeft: "10px" }}
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyerHomepage;
