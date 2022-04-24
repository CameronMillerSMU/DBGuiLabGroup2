import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import './App.css';
import axios from 'axios';
import Album from './pages/Home';
import OwnedPlants from './common/OwnedPlants';
import { Home } from './pages/Home';
import { Login } from './pages';
import { SignUp }from './pages/SignUp';

// React functional component
function App () {

  const [token, setToken] = useState();
  const [updateToken, setUpdateToken] = useState();
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(localStorage.getItem('token'));
    setUpdateToken(token);
  }, [token]);

  //missing update to header file surrounding routes
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setToken={setToken}/>} />
          <Route path="/register" element={<SignUp setToken={setToken}/>} />
          <Route path="/home" element={<Home token={token}/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
