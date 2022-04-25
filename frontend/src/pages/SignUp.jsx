import { useContext, useState } from 'react';
import * as React from 'react';
import { Card } from "../Card";
import TextField from '@mui/material/TextField';
import { AppContext } from "../AppContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { Password, SettingsOverscanOutlined } from '@mui/icons-material';
import { User } from '../common/User';
import { Navigate } from 'react-router-dom';
import { apiEndpoint, apiConfig } from '../common/ApiConfig';
import { addUser, ApiCalls } from '../common/ApiCalls';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
  
export const SignUp = (props) => {

  const navigate = useNavigate();
  const location = useLocation();
  const context = useContext(AppContext);
  const [value, setValue] = React.useState('');
  const userChange = (event) => {
    SettingsOverscanOutlined(event.target.value);
  };
  const ApiCall = new ApiCalls();
  
  const handleSignUp = async (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      ApiCall.register(data.get('username'), data.get('password')).then(res => {
        if(res.status <= 201) {
          navigate('/');
        }
      }).catch(err => {
        alert("User is already associated with this website");
      });
  };


  return <>
    <Box component="form" noValidate onSubmit={handleSignUp}>
      <TextField
        name = "username"
        required
        id="username"
        label="username"
      ></TextField>
      <TextField
        name = "password"
        required
        id="password"
        label="password"
      ></TextField>
      <Button
        type = "submit"
        variant = "outlined"
      >Submit</Button>
      <Button
        onClick={() => navigate("/")}
        variant = "outlined"
      >Sign In</Button>
      <Button
            onClick={() => navigate("/home")}
            variant="outlined"
          >Cancel</Button>
    </Box>
  </>;
};