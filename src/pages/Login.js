import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/users?email=${email}&password=${password}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          // Simulate user login and set the user in localStorage or sessionStorage
          localStorage.setItem("currentUser", JSON.stringify(data[0]));
          navigate("/");
        } else {
          setError("Invalid email or password");
        }
      })
      .catch((error) => setError("Error logging in. Please try again."));
  };

  return (
    <div className="login-page">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin} className="login-form">
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
