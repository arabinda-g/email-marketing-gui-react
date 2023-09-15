// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './components/Landing';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Status from './components/Status';

function App() {
  // In your JavaScript file
  window.globalConfig = {
    apiUrl: 'https://mc_email_api_127.arabinda.me',
    // apiUrl: 'http://localhost:5214',
    apiKey: 'your-api-key',
  };


  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/status" element={<Status />} />
      </Routes>
    </Router>
  );
}

export default App;
