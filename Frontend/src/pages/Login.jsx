import React, { useState } from "react";
import './Login.css';

function LoginForm({ navigate }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/accounts/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (response.ok) {
        console.log('Login successful');
        setIsAuthenticated(true);
        navigate('/Transactions');
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container">
      <h2 className="text-center">Login</h2>
      {isAuthenticated ? (
        <div>
          
        </div>
      ) : (
        <form onSubmit={handleFormSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field"
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default LoginForm;
