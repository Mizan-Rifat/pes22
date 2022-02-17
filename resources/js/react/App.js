import axios from 'axios';
import React, { useEffect } from 'react';

const App = () => {
  const registerUser = () => {
    axios.post('/api/register', {
      name: 'Mizan Rifat',
      email: 'mizan@mail.com',
      password: '12345678',
      password_confirmation: '12345678'
    });
  };
  const loginUser = async () => {
    const sanctum = axios.get('/sanctum/csrf-cookie');
    console.log({ sanctum });
    if (sanctum) {
      const user = await axios.post('/api/login', {
        email: 'mizan@mail.com',
        password: '12345678'
      });
      console.log({ user });
    }
  };
  const logoutUser = () => {
    axios.post('/api/logout');
  };
  const getCurrentUser = async () => {
    const user = await axios.post('/api/user');
    console.log({ user });
  };

  useEffect(() => {
    // loginUser();
  }, []);
  return (
    <div>
      <button onClick={getCurrentUser}>Get User</button>
      <button onClick={loginUser}>Login</button>
      <button onClick={logoutUser}>Logout</button>
    </div>
  );
};

export default App;
