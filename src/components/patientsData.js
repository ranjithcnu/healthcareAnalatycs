import React, { useState, useEffect } from 'react';
import TopNavBar from './DtopNav';
import '../styles/health_doc.css'; 

const FetchPatientsData = () => {
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState('');
  const [heartHealthData, setHeartHealthData] = useState([]);


  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/get_usernames')
    .then(response => {
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new TypeError('Oops, we haven\'t got JSON!');
      }
      return response.json();
    })
    .then(fetchedUsernames => setUsernames(fetchedUsernames))
    .catch(error => console.error('Error fetching usernames:', error));
  }, []);

 
  useEffect(() => {
    if (selectedUsername) {
      fetch(`http://127.0.0.1:5000/api/fetch_heart_health_data?username=${selectedUsername}`)
        .then(response => response.json())
        .then(data => setHeartHealthData(data));
    }
  }, [selectedUsername]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '70px' }}>
      <TopNavBar />
      <form style={{ width: '300px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '0.5px',backgroundColor: 'white' }}>
        <h2>Patients Heart Health Data</h2>
        <label>
          Select Username: 
          <select
            id="usernameDropdown"
            value={selectedUsername}
            onChange={(e) => setSelectedUsername(e.target.value)}
          >
            <option value="">-- Select --</option>
            {usernames.map((username, index) => (
              <option key={index} value={username}>
                {username}
              </option>
            ))}
          </select>
        </label>
      </form>
      {heartHealthData.length > 0 ? (
        
        <table className="table">
          <thead>
            <tr>
              <th>Age</th>
              <th>Sex</th>
              <th>Chest Pain Type</th>
              <th>Blood Pressure</th>
              <th>Cholesterol</th>
              <th>Blood Sugar</th>
              <th>Max Heart Rate</th>
              <th>Angina</th>
              <th>DateTime</th>
            </tr>
          </thead>
          <tbody>
            {heartHealthData.map((data, index) => (
              <tr key={index}>
                <td>{data.age}</td>
                <td>{data.sex === 1 ? 'Male' : 'Female'}</td>
                <td>{data.chestPainType === 1 ? 'Unstable or Variant Angina' :
                                heartHealthData.chestPainType === 2 ? 'Myocardial Infarction' :
                                heartHealthData.chestPainType === 3 ? 'Pericarditis' :
                                'Non-cardiac Chest Pain'
                                }</td>
                <td>{data.bloodPressure}</td>
                <td>{data.cholesterol}</td>
                <td>{data.bloodSugar}</td>
                <td>{data.maxHeartRate}</td>
                <td>{data.angina === 1? 'yes' : 'no'}</td>
                <td>{data.c_datetime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      
      ) : (
        <p>No heart health data available for the selected user.</p>
      )}
    </div>
   
  );
};

export default FetchPatientsData;
