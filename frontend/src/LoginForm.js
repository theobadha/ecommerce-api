import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// LoginForm component for both seller and buyer login
function LoginForm({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth(); // Use authentication context

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loading) return; // Prevent multiple submissions
    
    try {
      setLoading(true);
      setError("");
      
      //send POST request to backend
      const res = await fetch(`/api/auth/${userType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Invalid email or password");
      }
      
      const data = await res.json();
      console.log(`Logged in successfully as ${userType}!`);
      
      // Use the authentication context to login
      login(data.token, data.buyerId || data.sellerId, userType);
      
      // Handle successful login (e.g., store token, redirect)
      if (userType === "seller") {
        navigate(`/seller/${data.sellerId}`); // data.sellerId should be the real ObjectId
      } else if (userType === "buyer") {
        navigate(`/buyer/${data.buyerId}`); // data.buyerId should be the real ObjectId
      } else {
        throw new Error("Unknown user type");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{userType.charAt(0).toUpperCase() + userType.slice(1)} Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={loading}>
        {loading ? "Logging In..." : "Login"}
      </button>
    </form>
  );
}
export default LoginForm;
