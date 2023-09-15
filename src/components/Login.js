import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './LoginPage.css'; // Import the CSS file for styling

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // For displaying error messages
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Perform login logic here (e.g., send a request to a server)

    // For demonstration purposes, let's log the credentials to the console
    console.log('Username:', username);
    console.log('Password:', password);


    // Send username and password to the server
    // fetch(window.globalConfig.apiUrl + 'auth/login', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ username, password })
    // });

    axios.post(window.globalConfig.apiUrl + '/auth/login', {
      username: username,
      password: password
    })
      .then((response) => {
        // Handle successful response
        console.log(response.data); // Data from the API

        // Save the token to local storage
        localStorage.setItem('token', response.data);

        history('/dashboard');
      })
      .catch((error) => {
        // Handle error
        console.error('Error:', error);
        setMessage('Invalid username or password');
      });


    // Clear the input fields
    // this.setState({ username: '', password: '' });

    // Redirect to the dashboard
    // history('/dashboard');










  };


  return (
    <div className="login-page">
      <div className="login-form">
        <h2>Login</h2>
        {/* Display the message */}
        {message && <div className="error-message">{message}<br /><br /></div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
