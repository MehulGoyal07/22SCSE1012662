import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Log } from './services/logger';
import './styles/main.css';

Log("debug", "app", "Application initialized");

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);