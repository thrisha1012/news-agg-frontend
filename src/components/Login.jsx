import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import './login.css';

function Login({ onClose, onLogin }) { // use 'onLogin' instead of 'handleUserLogin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Go back to the previous page
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    // Login API call
    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (response.ok) {
            const data = await response.json();
            alert('Login successful');
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem('token', data.token);
            // Call the onLogin function to update the user in the parent component
            onLogin(data.user); // Pass the user data to the parent component
            navigate('/'); // Redirect to home
        } else {
            const errorMessage = await response.text();
            alert(`Login failed: ${errorMessage}`);
        }
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    <div className="login-modal">
      <div className="modal-content">
        <h2>Login</h2>
{/* 
        <button type="button" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button> */}

        <form onSubmit={handleLogin}>
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
          <button type="button" onClick={onClose}>Close</button>
        </form>
        <p>
          Not registered? <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
