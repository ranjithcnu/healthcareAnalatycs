import React, { useEffect } from 'react';

import TopNavBar from './TopNav';
import '../styles/health.css'; 


const HeartHealthData = () => {
    const [heartHealthData, setHeartHealthData] = React.useState(null);
    const [showHeartHealthPopup, setShowHeartHealthPopup] = React.useState(false);

    const fetchHeartHealthData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/api/fetch_heart_health', {
                method: 'GET',
                credentials: 'include',
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log(data); 
                setHeartHealthData(data);
                setShowHeartHealthPopup(true);
            } else {
                alert('You have not entered any previous health data. Please enter data in Track the Heart Health.');
                console.error('Failed to fetch heart health data');
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    useEffect(() => {
        fetchHeartHealthData();
    }, []);

    return (

        <div className="table-container">
              <TopNavBar />
            {showHeartHealthPopup && heartHealthData && (
                <div >
                    <h3 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '80px' }}>Heart Health Data</h3>
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
                                <th>Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                        {heartHealthData && heartHealthData.map((data, index) => (
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
                </div>
            )}
        </div>
    );
};

export default HeartHealthData;
