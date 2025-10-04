import React, { useState } from "react";  
import axios from "axios";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogin({ ...login, [name]: value }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:8000/login", login); 
      setMessage(res.data.message); 
      navigate(`/dashboard/${res.data.id}/${res.data.name}`);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Welcome Back</h1>
        <p className="login-subtitle">Login to your account</p>
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={login.email}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={login.password}
              onChange={handleChange}
              className="form-input"
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <a href="/">signup</a>
        {message && <p className="login-message">{message}</p>}
      </div>
      
    </div>
  );
};

export default LoginForm;