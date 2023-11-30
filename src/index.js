import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import your root component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // This should match the ID in your public/index.html file
);
