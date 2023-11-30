import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Home from './components/Home';
import ProfilePage from './components/ProfilePage';
import TrackHealth from './components/TrackHealth';
import HeartHealthData from './components/HeartHealthData';
import BMIPage from './components/bmi';
import Dochome from './components/dochome';
import FetchPatientsData from './components/patientsData';
import DProfilePage from './components/DProfilePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/Dprofile" element={<DProfilePage />} />
        <Route path="/TrackHealth" element={<TrackHealth />} />
        <Route path="/HeartHealthData" element={<HeartHealthData />} />
        <Route path="/dochome" element={<Dochome />} />
        <Route path="/patientData" element={<FetchPatientsData />} />
        <Route path="/bmi" element={<BMIPage />} />
      </Routes>
    </Router>
  );
}


export default App;
