import React, { useState } from 'react';
import TopNavBar from './TopNav';

const BMICalculator = () => {
  const [weight, setWeight] = useState(''); // Weight in pounds
  const [feet, setFeet] = useState(''); // Height in feet
  const [inches, setInches] = useState(''); // Additional height in inches
  const [bmi, setBmi] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to manage modal display

  // Handle weight change in pounds
  const handleWeightChange = (e) => {
    setWeight(e.target.value);
  };

  // Handle feet change for height
  const handleFeetChange = (e) => {
    setFeet(e.target.value);
  };

  // Handle inches change for height
  const handleInchesChange = (e) => {
    setInches(e.target.value);
  };

  // Calculate BMI in pounds and inches and show modal
  const calculateBMI = (e) => {
    e.preventDefault();
    const totalInches = parseInt(feet) * 12 + parseInt(inches); // Convert feet to inches and add the remaining inches
    if (weight && totalInches) {
      const calculatedBmi = (weight / (totalInches * totalInches)) * 703;
      setBmi(calculatedBmi.toFixed(2));
      setShowModal(true); // Show the result in a modal
    }
  };

  // Close modal function
  const closeModal = () => {
    setShowModal(false);
  };

  // Container style
  const containerStyle = {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '64px', // Space for the TopNavBar
    marginLeft: '7px',
    minHeight: 'calc(95vh - 64px)', // Height minus the TopNavBar
    background: `url("${process.env.PUBLIC_URL}/bmi.jpg") no-repeat left center`,
    backgroundSize: '60% 100%', // Background size
  };

  // Render the component
  return (
    <div>
      <TopNavBar />
      <div style={containerStyle}>
        {/* Empty div for background */}
        <div style={{ width: '65%', height: '100%' }}></div>
        {/* Form container */}
        <div style={{ width: '30%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <form onSubmit={calculateBMI} style={{
            width: '100%', // Use full width of the container
            padding: '20px',
            border: '1px solid #ccc',
            borderRadius: '8px',
            backgroundColor: 'white',
          }}>
            {/* Weight input for pounds */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="weight">Weight (lbs):</label>
              <input
                type="number"
                id="weight"
                value={weight}
                onChange={handleWeightChange}
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
              />
            </div>
            {/* Height input for feet */}
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="feet">Height (ft):</label>
              <input
                type="number"
                id="feet"
                value={feet}
                onChange={handleFeetChange}
                style={{ width: '100%', marginRight: '6%', padding: '10px', margin: '10px 0' }}
              />
              {/* Height input for inches */}
              <label htmlFor="inches">Inches:</label>
              <input
                type="number"
                id="inches"
                value={inches}
                onChange={handleInchesChange}
                style={{ width: '100%', padding: '10px', margin: '10px 0' }}
              />
            </div>
            {/* Submit button */}
            <button type="submit" style={{ width: '100%', padding: '10px', margin: '10px 0', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
              Calculate BMI
            </button>
          </form>
        </div>
      </div>
      {/* Modal for displaying BMI result */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: '20px',
          zIndex: 1000,
          border: '1px solid #ccc',
          borderRadius: '8px',
        }}>
          <h3>Your BMI is: {bmi}</h3>
          <button onClick={closeModal} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '4px' }}>
            Close
          </button>
        </div>
      )}
      {/* Overlay for modal */}
      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 999,
        }} onClick={closeModal}></div>
      )}
    </div>
  );
};

export default BMICalculator;
