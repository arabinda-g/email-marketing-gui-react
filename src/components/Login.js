import React, { Component } from 'react';
import './LoginPage.css'; // Import the CSS file for styling

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleLogin = () => {
    const { username, password } = this.state;

    // Perform login logic here (e.g., send a request to a server)

    // For demonstration purposes, let's log the credentials to the console
    console.log('Username:', username);
    console.log('Password:', password);
  };

  render() {
    const { username, password } = this.state;

    return (
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <form>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={this.handleInputChange}
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
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="button" onClick={this.handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
