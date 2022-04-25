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
        if(result.status <= 201) {
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
        onClick={() => navigate("/register")}
        variant = "outlined"
      >
      Don't have an account? Sign Up!</Button>
  </Box>
  </>;
}