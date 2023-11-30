import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/login.css';
import NavBar from './NavBar'; 



const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [acc_type, setAccType] = useState('');
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/', { replace: true });
}

const handleAccTypeChange = (e) => { 
  setAccType(e.target.value);
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      username: username,
      password: password,
      acc_type: acc_type,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/api/login', {
        method: 'POST',
        credentials: 'include', 
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Login successful');
        // redirect based on account type
        if (acc_type === 'doctor') {
          navigate('/dochome');
        } else {
          navigate('/home');
        }
      } else {
        alert('Please check username or Password')
        console.error('Login failed');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  const handleInputChange = (e, setter) => {
    const value = e.target.value;
    const rgb = computeRGB(value);
    e.target.style.backgroundColor = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    setter(value);
  };


  const computeRGB = (value) => {
    let r = 200; 
    let g = 200;
    let b = 200;
  
    for (let i = 0; i < value.length; i++) {
      const code = value.charCodeAt(i);
      r = (r + code) % 256;
      g = (g + code * 2) % 256;
      b = (b + code * 3) % 256;
    }
  
  
    r = Math.max(r, 150);
    g = Math.max(g, 150);
    b = Math.max(b, 150);
  
    return { r, g, b };
  };
  

  return (


    <div className="container ">


       <NavBar onLogout={handleLogout} />
      
      <div className="signup-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => handleInputChange(e, setUsername)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChanges={(e) => setPassword(e.target.value)}
              onChange={(e) => handleInputChange(e, setPassword)}
            />
          </div>

          <div >
        <label>Account Type:</label>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ margin: '0 10px' }}>
            <input
              type="radio"
              name="acc_type"
              value="doctor"
              checked={acc_type === 'doctor'}
              onChange={handleAccTypeChange}
            />
            Doctor
          </label>
          <label style={{ margin: '0 10px' }}>
            <input
              type="radio"
              name="acc_type"
              value="patient"
              checked={acc_type === 'patient'}
              onChange={handleAccTypeChange}
            />
            Patient
          </label>
        </div>
      </div>

          <button type="submit">Login</button>
          <Link to="/signup">New Here ? Sign up now!</Link>
        </form>
      </div>
    </div>

  );
};

export default Login;
