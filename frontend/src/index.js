import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, MusicProvider } from './Context/Context';  // Correct path to your context
import App from './App';
import './index.css'; // Global styles
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* Wrap the application with both AuthProvider and MusicProvider */}
      <AuthProvider>
        <MusicProvider>
          <App />
        </MusicProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
