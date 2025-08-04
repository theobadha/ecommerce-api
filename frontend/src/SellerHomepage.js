import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function SellerHomepage() {
    const { sellerId } = useParams();
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    itemName: "",
    itemDescription: "",
    quantity: "",
    category: "",
    condition: "new",
    price: ""
  });

  // Fetch inventory items for this seller
  useEffect(() => {
    if (!sellerId) return;
    fetch(`/api/inventory?sellerId=${sellerId}`)
      .then(res => res.json())
      .then(data => setInventory(data));
  }, [sellerId]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/inventory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, sellerId })
    });
    if (res.ok) {
      const newItem = await res.json();
      setInventory([...inventory, newItem]);
      setForm({
        itemName: "",
        itemDescription: "",
        quantity: "",
        category: "",
        condition: "new",
        price: ""
      });
    }
  };

  return (
    <div>
      <h2>My Inventory</h2>
      <ul>
        {inventory.map(item => (
          <li key={item._id}>
            {item.itemName} - {item.itemDescription} - Qty: {item.quantity} - {item.category} - {item.condition} - ${item.price}
          </li>
        ))}
      </ul>

      <h2>Add Inventory Item</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="itemName"
          placeholder="Item Name"
          value={form.itemName}
          onChange={handleChange}
          required
        />
        <input
          name="itemDescription"
          placeholder="Description"
          value={form.itemDescription}
          onChange={handleChange}
          required
        />
        <input
          name="quantity"
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={handleChange}
          required
        />
        <input
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <select
          name="condition"
          value={form.condition}
          onChange={handleChange}
          required
        >
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="for parts">For Parts</option>
        </select>
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default SellerHomepage;