import React, { useState } from "react";


// LoginForm component for both seller and buyer login
function LoginForm({ userType }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  //handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      //send POST request to backend
      const res = await fetch(`/api/auth/${userType}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) throw new Error("Invalid email or password");
      const data = await res.json();
      // Handle successful login (e.g., store token, redirect)
      console.log("Login successful:", data);
    } catch (err) {
      setError(err.message);
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
      <button type="submit">Login</button>
    </form>
  );
}
export default LoginForm;
