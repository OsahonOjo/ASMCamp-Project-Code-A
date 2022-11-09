/* libraries */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* component */
import App from './components/App.js';

/* style */
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);