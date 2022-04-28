import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Routes } from 'react-router';
import './App.css';
import axios from 'axios';
import Album from './pages/Home';
import { Home } from './pages/Home';
import { Login } from './pages';
import { SignUp } from './pages/SignUp';
import { PlantPage } from './pages/PlantPage';
import { Profile } from './common/Profile';
import { Weather } from './pages/Weather';
import { Banner } from './common/Banner';

// React functional component
function App() {

  const [token, setToken] = useState();
  const [updateToken, setUpdateToken] = useState();


  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(localStorage.getItem('token'));
    setUpdateToken(token);
  }, [token]);

  
  return (
    <div className="App">
      <BrowserRouter>
      
        <Routes>
          <Route path="/signup" element={<SignUp setToken={setToken}/>} />
          <Route path="/login" element={<Login setToken={setToken}/>} />
          <Route exact path="/" element={<Home token={token}/>} />
          <Route path="/plantPage" element={<PlantPage token={token}/>} />
          <Route path="/profile" element={<Profile token={token}/>} />
          <Route path="/weather" element={<Weather token={token}/>} />
        </Routes>
      </BrowserRouter>
    </div>
     );

}

export default App;
