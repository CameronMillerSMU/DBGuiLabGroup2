import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Login } from './pages';

// React functional component
function App () {

  const [token, setToken] = useState();
  const [updateToken, setUpdateToken] = useState();


  useEffect(() => {
    const token = localStorage.getItem('token');
    setToken(localStorage.getItem('token'));
    setUpdateToken(token);
  }, [token]);

  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
