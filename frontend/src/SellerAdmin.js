import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SellerAdmin() {
  const [sellers, setSellers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetch("/api/sellers")
      .then(res => res.json())
      .then(data => setSellers(data));
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await fetch("/api/sellers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });
    if (res.ok) {
      const newSeller = await res.json();
      setSellers([...sellers, newSeller]);
      setForm({ name: "", email: "", phone: "", address: "" });
    }
  };

  const handleSellerClick = (sellerId) => {
    navigate(`/seller/${sellerId}`);
  };
  return (
    <div>
      <h2>Add Seller</h2>
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
        <button type="submit">Add Seller</button>
      </form>

      <h2>All Sellers</h2>
      <ul>
        {sellers.map(seller => (
          <li key={seller._id}>
            <button onClick={() => handleSellerClick(seller._id)}>
            {seller.name} - {seller.email} - {seller.phone} - {seller.address}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SellerAdmin;