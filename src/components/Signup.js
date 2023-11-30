import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/signup.css';
import NavBar from './NavBar';
/*import Dots  from '../dots'*/


function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    age: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
  });

  const [error, setError] = useState(''); // Error handling state


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const handleLogout = () => {
    navigate('/', { replace: true });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');
    
 const validateEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  if (!validateEmail(formData.email)) {
    setError('Invalid Email.');
    return;
  }

  // if (formData.mobile.length ===10) {
  //   alert('mobile number should be atleast 10 digits')
  //     console.error('error');
  //     return;
  // } 

    if (isNaN(formData.age) || formData.age < 13 || formData.age > 100) {
        alert('Age is not valid');
        return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      alert('passwords do not match')
        console.error('Passwords do not match');
        return;
    }

    if (formData.password.length<=7) {
      alert('passwords should be atleast 7 characters')
        console.error('Passwords do not match');
        return;
    }
    

  

    try {
      const response = await fetch('http://127.0.0.1:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      console.log(data)
      if (response.ok) {
        navigate('/', { replace: true });
        console.log('Signup successful', data);
      } else {
        alert('please check username or email and try again')
        console.error('Signup failed', data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    
    <div className="container">
       {/*<Dots count={200} />*/}
      <NavBar onLogout={handleLogout} />
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username (Unique)</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email ID</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="mobile">Contact Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              value={formData.contactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="state">State</label>
            <input
              type="text"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group"  style={{ display: 'flex', alignItems: 'center' }}>
            <label>Account Type:</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <label style={{ margin: '0 10px' }}>
                <input
                  type="radio"
                  name="acc_type"
                  value="doctor"
                  checked={formData.acc_type === 'doctor'}
                  onChange={handleChange}
                />
                Doctor
              </label >
              <label style={{ margin: '0 10px' }}>
                <input
                  type="radio"
                  name="acc_type"
                  value="patient"
                  checked={formData.acc_type === 'patient'}
                  onChange={handleChange}
                />
                Patient
              </label>
            </div>
          </div>
          

          
          {error && <p className="error-message">{error}</p>} 
          <button type="submit">Signup</button>
          <Link to="/">Already have an account? Login here</Link>
        </form>
      </div>
    </div>
  );
}

export default Signup;
