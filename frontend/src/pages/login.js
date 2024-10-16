import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/users/login', { email, password });
      if (response.data.isOK) {
        console.log('Login successful:', response.data.token);
        Cookies.set('authToken', response.data.token, { expires: 30 });
        navigate('/home')
      } else {
        console.log('Login failed: Incorrect email or password');
        alert("Incorrect!")
      }
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  const redirectSignUp = () => {
    navigate('/signup');
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
      <button onClick={redirectSignUp}>SignUp</button>
    </form>
  );
};

export default Login;
