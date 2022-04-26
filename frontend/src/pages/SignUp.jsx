import { useContext, useState } from 'react';
import * as React from 'react';
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
import { Banner } from '../common/Banner';

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
      if (res.status <= 201) {
        navigate('/');
      }
    }).catch(err => {
      alert("User is already associated with this website");
    });
  };


  return <>
    <Banner />
    <div className="w-75 mx-auto">
      <div className="border mb-2 mt-5">
        <h1 className="text-white bg-primary p-3 mb-0">Sign Up</h1>
        <Box component="form" noValidate onSubmit={handleSignUp} className="bg-white py-2 mt-0">
          <div className="mb-5 ms-3 col-md-4" controlId="username">
            <TextField
              placeholder="Enter Your Username"
              name="username"
              required
              id="username"
              label="username" >
            </TextField>
          </div>
          <div className="mb-2 ms-3 col-md-4" controlId="password">
            <TextField
              placeholder="Enter Your Password"
              name="password"
              required
              id="password"
              label="password"
            ></TextField>
          </div>
          <Button
            type="submit"
            variant="outlined"
          >
            Submit</Button>
          <p>Already have an account?</p>
          <Button
            onClick={() => navigate("/")}
            variant="outlined"
          >Log in</Button>
          <Button
            onClick={() => navigate("/home")}
            variant="outlined"
          >Cancel</Button>
        </Box>
      </div>
    </div>
  </>;
};