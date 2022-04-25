import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDebugValue } from 'react';
import { User } from '../common/User';
import { apiEndpoint, apiConfig } from '../common/ApiConfig';
import { ApiCalls } from '../common/ApiCalls';
import { Navigate, useNavigate } from 'react-router-dom';

const theme = createTheme();

export const Login = () => {

  const [value, setValue] = React.useState('User');
  const changeEvent = (e) => {
    setValue(e.target.value);
  };
  const ApiCall = new ApiCalls();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    ApiCall.login(data.get('username'), data.get('password')).then(result => {
      if (result.status <= 201) {
        ApiCall.getToken().then(response => {
          console.log('Result: ');
          console.log(response);
          sessionStorage.setItem('username', response.data.username);
          sessionStorage.setItem('password', response.data.password);
        })
          .catch(error1 => {
            console.log('Error: ')
            console.log(error1);
          });
        navigate('/home');
      }

    }).catch(error2 => {
      alert("Username or Password incorrect");
    });
  };

  return <>
    <div className="w-75 mx-auto">
      <div className="border mb-2 mt-5">
        <h1 className="text-white bg-primary p-3 mb-0">Login</h1>
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
          >Submit</Button>
          <p className="ms-3">Need an account? <Link to="/register">Sign Up</Link></p>
        </Box>
      </div>
      <Link to="/home" className="btn btn-danger me-3">Cancel</Link>
      <button className="btn btn-success" id="loginButton" type="submit" form="login-form">Submit</button>
    </div>
  </>;
}

/*
<div className="w-75 mx-auto">
            <div className="border mb-2 mt-5">
                <h1 className="text-white bg-primary p-3 mb-0">Login</h1>
                <Form noValidate validated={validated} id="login-form" onSubmit={handleLogin} className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <p className="ms-3">Need an account? <Link to="/Signup">Sign Up</Link></p>
                </Form>
                
            </div>
            <Link to="/" className="btn btn-danger me-3">Cancel</Link>
            <button className="btn btn-success" id="loginButton" type="submit" form="login-form">Submit</button>
            
        </div>
        */

        /*
<div className="w-75 mx-auto">
            <div className="border mb-2 mt-5">
                <h1 className="text-white bg-primary p-3 mb-0">Login</h1>
                <Form noValidate validated={validated} id="login-form" onSubmit={handleLogin} className="bg-white py-2 mt-0">
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" placeholder="Enter Your Username" value={username} onChange={(event) => setUsername(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a username.</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-2 ms-3 col-md-4" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Your Password" value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <Form.Control.Feedback type="invalid"> Please enter a password.</Form.Control.Feedback>
                    </Form.Group>
                    <p className="ms-3">Need an account? <Link to="/Signup">Sign Up</Link></p>
                </Form>
                
            </div>
            <Link to="/" className="btn btn-danger me-3">Cancel</Link>
            <button className="btn btn-success" id="loginButton" type="submit" form="login-form">Submit</button>
            
        </div>
        */