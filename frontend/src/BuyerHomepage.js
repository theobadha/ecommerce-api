import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BuyerHomepage() {
  const [inventory, setInventory] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch all inventory items with quantity > 0
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, []);

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
    navigate("/cart", { state: { cart } });
  };

  return (
    <div>
      <h2>Buyer - Available Inventory</h2>
      <button onClick={goToCart} style={{}}>
        Go to Cart({cart.length})
      </button>
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
    </div>
  );
}

export default BuyerHomepage;
