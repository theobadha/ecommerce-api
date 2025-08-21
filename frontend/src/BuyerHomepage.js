import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authenticatedGet } from "./utils/api";
import { useAuth } from "./contexts/AuthContext";

function BuyerHomepage() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemQuantities, setItemQuantities] = useState({});
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
        
        // Initialize quantities for all items
        const initialQuantities = {};
        data.forEach(item => {
          initialQuantities[item._id] = 1;
        });
        setItemQuantities(initialQuantities);
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

  const handleQuantityChange = (itemId, value) => {
    const numValue = parseInt(value) || 0;
    setItemQuantities(prev => ({
      ...prev,
      [itemId]: Math.max(0, numValue)
    }));
  };

  const handleAddToCart = (item) => {
    const quantity = itemQuantities[item._id] || 0;
    
    if (quantity <= 0) {
      return; // Don't add if quantity is 0 or less
    }

    // Check if item is already in the cart
    const itemInCart = cart.find((cartItem) => cartItem._id === item._id);
    if (itemInCart) {
      // If item is already in the cart, update the quantity
      setCart(
        cart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        )
      );
    } else {
      // If item is not in the cart, add it with the specified quantity
      setCart([...cart, { ...item, quantity: quantity }]);
    }
    
    // Reset quantity input to 1 after adding to cart
    setItemQuantities(prev => ({
      ...prev,
      [item._id]: 1
    }));
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
            <li key={item._id} style={{ marginBottom: "15px", padding: "10px", border: "1px solid #ddd", borderRadius: "5px" }}>
              <div style={{ marginBottom: "10px" }}>
                <strong>{item.itemName}</strong> - {item.itemDescription}
              </div>
              <div style={{ marginBottom: "10px" }}>
                Qty Available: {item.quantity} - Category: {item.condition} - ${item.price} - Seller: {item.seller?.name}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    max={item.quantity}
                    value={itemQuantities[item._id] || 1}
                    onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                    style={{ 
                      marginLeft: "5px", 
                      padding: "5px", 
                      width: "60px",
                      border: "1px solid #ccc",
                      borderRadius: "3px"
                    }}
                  />
                </label>
                <button
                  style={{ 
                    padding: "8px 16px",
                    backgroundColor: (itemQuantities[item._id] || 0) > 0 ? "#007bff" : "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: (itemQuantities[item._id] || 0) > 0 ? "pointer" : "not-allowed"
                  }}
                  onClick={() => handleAddToCart(item)}
                  disabled={(itemQuantities[item._id] || 0) <= 0}
                >
                  Add to Cart
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default BuyerHomepage;
