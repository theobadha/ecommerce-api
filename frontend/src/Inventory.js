import React, { useState, useEffect } from "react";

function Inventory() {
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    fetch("/api/inventory")
      .then((res) => res.json())
      .then((data) => setInventory(data));
  }, []);

  return (
    <div>
      <h2>Inventory</h2>
      <ul>
        {inventory.map((item) => (
          <li key={item._id}>
            {item.itemName} - {item.itemDescription} - Qty: {item.quantity} -{" "}
            {item.category} - {item.condition} - ${item.price} - Seller:
            {item.seller?.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inventory;
