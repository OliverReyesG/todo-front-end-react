import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/api/token/', {
        username: username,
        password: password,
      })
      .then((response) => {
        localStorage.setItem('access', JSON.stringify(response.data.access));
        localStorage.setItem('refresh', JSON.stringify(response.data.refresh));
        navigate('/');
      });
  };

  return (
    <div className="container login">
      <form onSubmit={handleSubmit}>
        <div className="login-card">
          <div className="input-container">
            <label htmlFor="username-input">Username</label>
            <input
              type="text"
              name="username-input"
              id="username-input"
              onChange={handleUsernameChange}
              value={username}
            />
          </div>
          <div className="input-container">
            <label htmlFor="password-input">Password</label>
            <input
              type="password"
              name="password-input"
              id="password-input"
              onChange={handlePasswordChange}
              value={password}
            />
          </div>
        </div>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
