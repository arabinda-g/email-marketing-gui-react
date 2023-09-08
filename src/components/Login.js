// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // You can implement your API call for login validation here
    // Example: const response = await loginApi(username, password);

    // If login is successful, redirect to the dashboard
    // if (response.success) {
    //   history.push('/dashboard');
    // }
    // history.push('/dashboard'); // For demonstration purposes

    // If login is successful, redirect to the dashboard on React 18
    history('/dashboard');

  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
