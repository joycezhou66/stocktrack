import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error('Please enter both email and password.');
      return;
    }

    console.log(`Fetching from URL: http://localhost:3001/users?email=${email}&password=${password}`); 

    fetch(`http://localhost:3001/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Login Response Data:', data);
        if (data.length > 0) {
          const user = data[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          toast.success('Login successful!');
          setTimeout(() => navigate('/'), 100); // Ensure localStorage updates
        } else {
          toast.error('Invalid email or password. Please try again.');
        }
      })
      .catch((error) => {
        console.error('Error logging in:', error);
        toast.error('Error logging in. Please try again.');
      });
  };

  return (
    <div className="login-page">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      <h1>Login</h1>
      <form onSubmit={handleLogin} className="login-form">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
