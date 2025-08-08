import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function BuyerAdmin() {
  const [buyers, setBuyers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/buyers")
      .then((res) => res.json())
      .then((data) => setBuyers(data))
      .catch((error) => {
        console.error("Failed to fetch buyers:", error);
      });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/buyer/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      const newBuyer = await res.json();
      setBuyers([...buyers, newBuyer]);
      setForm({ name: "", email: "", phone: "", address: "", password: "" });
    }
  };

  const handleBuyerClick = (buyerId) => {
    navigate(`/buyer/${buyerId}`);
  };
  return (
    <div>
      <h2>Add Buyer</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
        />
        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Add Buyer</button>
      </form>

      <h2>All Buyers</h2>
      <ul>
        {buyers.map((buyer) => (
          <li key={buyer._id}>
            <button onClick={() => handleBuyerClick(buyer._id)}>
              {buyer.name} - {buyer.email} - {buyer.phone} - {buyer.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BuyerAdmin;
