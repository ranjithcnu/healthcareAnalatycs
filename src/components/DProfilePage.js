import React, { useState, useEffect } from 'react';
import TopNavBar from './DtopNav';
import { useNavigate } from 'react-router-dom';
import '../styles/profile.css';
import Alert from './alert'; 




const DProfilePage = () => {

  const [updateSuccess, setUpdateSuccess] = useState(false);
  const navigate = useNavigate();
  const handleGoToHome = () => {
    navigate('/home'); 
  };
  const handleLogout = async () => {
    try {
        const response = await fetch('http://127.0.0.1:5000/api/logout', {
            method: 'POST',
            credentials: 'include', 
        });
        
        if (response.status === 200) {

            
            // Remove user data from local storage or cookies
            localStorage.removeItem('userData');

            navigate('/');
        } else {
            throw new Error('Failed to log out');
        }
    } catch (error) {
        console.error(error);
    }
};
   
  const [userData, setUserData] = useState({
    username: '',
    name: '',
    email: '',
    age: 0,
    mobile: '',
    city: '',
    state: '',
  });

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/api/fetch_user_data', {
        method: 'GET',
        credentials: 'include',
      });
      const data = await response.json();
      setUserData(data);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:5000/api/update_profile', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
      });
      if (response.status === 200) {
        console.log('Profile updated successfully');
        setTimeout(() => setUpdateSuccess(false), 5000);
        setUpdateSuccess(true); 
        fetchData();
      } else {
        setUpdateSuccess(true); 
        console.error('Error updating profile');
      }
    } catch (error) {
        setUpdateSuccess(true); 
      console.error("An error occurred:", error);
    }
  };

  const closeAlert = () => {
    setUpdateSuccess(false);
  };

  return (
    <div className="profilePageP">
    <TopNavBar className = "top-navbar"
        handleGoToHome = {handleGoToHome}
        handleLogout={handleLogout}
    />

      <form className='form' onSubmit={handleProfileUpdate}>
      {updateSuccess && <Alert message="Profile Updated Successfully!" onClose={closeAlert} />}
      <h1>Profile Data</h1>
        <label>
          Username:
          <input 
            type="text" 
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            readOnly
          />
        </label>
        <label>
          Name:
          <input 
            type="text" 
            name="name"
            value={userData.name}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Email:
          <input 
            type="email" 
            name="email"
            value={userData.email}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Age:
          <input 
            type="number" 
            name="age"
            value={userData.age}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Mobile:
          <input 
            type="tel" 
            name="mobile"
            value={userData.mobile}
            onChange={handleInputChange}
          />
        </label>
        <label>
          City:
          <input 
            type="text" 
            name="city"
            value={userData.city}
            onChange={handleInputChange}
          />
        </label>
        <label>
          State:
          <input 
            type="text" 
            name="state"
            value={userData.state}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default DProfilePage;
