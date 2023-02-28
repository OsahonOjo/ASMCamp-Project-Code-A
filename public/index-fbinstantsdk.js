/* libraries */
// import React from 'https://esm.sh/react@18.2.0';
// import ReactDOM from 'https://esm.sh/react-dom@18.2.0';
// import { BrowserRouter } from "https://cdn.skypack.dev/react-router-dom@6.8.1";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';


/* component */
import App from './view/App.js';

/* style */
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);