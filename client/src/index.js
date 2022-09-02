import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css';
import {AuthProvider} from './context/AuthProvider';

//ReactDOM.render(<App/>, document.getElementById("root"))

//New render method

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
