import React, { useState } from "react";
import axios from "axios";


const SignupForm = () => {
  const [signup, setSignup] = useState({
    Name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    try {
      const res = await axios.post("http://localhost:8000/signup", signup);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h1 className="signup-title">Create Account</h1>
        <p className="signup-subtitle">Join us today and get started</p>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <input
              type="text"
              name="Name"
              value={signup.Name}
              onChange={handleChange}
              placeholder="Full Name"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={signup.email}
              onChange={handleChange}
              placeholder="Email Address"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={signup.password}
              onChange={handleChange}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="signup-button">Sign Up</button>
        </form>
        {message && <p className="message">{message}</p>}
        <a href="/login">Login</a>
      </div>
    </div>
  );
};

export default SignupForm;