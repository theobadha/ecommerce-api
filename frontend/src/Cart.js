import React from "react";
import { useNavigate } from "react-router-dom";

function Cart({ cart, buyerId }) {
  const navigate = useNavigate();
  // If cart is empty, display a message
  if (!cart || cart.length === 0) {
    return <div>Your cart is empty. Start shopping!</div>;
  }

  //show cart items
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cart.map((item) => (
          <li key={item._id}>
            {item.itemName} - Qty: {item.quantity} - ${item.price} - Total: $
            {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <ul>
        <li>
          Order Total: $
          {cart.reduce((acc, item) => acc + item.price * item.quantity, 0)}
        </li>
      </ul>
      <button onClick={() => navigate("/")}>Continue Shopping</button>
      <button
        onClick={() => navigate("/checkout", { state: { cart, buyerId } })}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart;
