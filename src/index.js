import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './components/Login.js';

ReactDOM.render(
  <React.StrictMode>
        <div className="App">
         <Login/>     
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
