import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
// import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { store } from './assets/data/store'
import 'font-awesome/css/font-awesome.css';
import './assets/styles/angerStyles.css';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);