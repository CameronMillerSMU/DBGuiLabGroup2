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
import { useState, useDebugValue } from 'react';
import { User } from '../common/User';
import { apiEndpoint, apiConfig } from '../common/ApiConfig';
import { ApiCalls } from '../common/ApiCalls';
import { Navigate, useNavigate } from 'react-router-dom';
import { ResponsiveAppBar } from '../common/ResponsiveAppBar';

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
    <ThemeProvider theme={theme}>
      <div className="w-75 mx-auto">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <h1 className="text-white bg-primary p-3 mb-0">Login</h1>
          <Box component="form" noValidate onSubmit={handleSignUp} className="bg-white py-2 mt-0">
            <Grid container spacing={2} >
              <Grid item xs={12} controlId="username">
                <TextField
                  placeholder="Enter Your Username"
                  name="username"
                  required
                  id="username"
                  label="username"
                >
                </TextField>
              </Grid>
              <Grid item xs={12} controlId="password">
                <TextField
                  placeholder="Enter Your Password"
                  name="password"
                  required
                  id="password"
                  label="password"
                ></TextField>
              </Grid>
            </Grid>
            <Button item sx={{ mt: 3, }}
              type="submit"
              variant="outlined"
            >
              Submit</Button>
            <p>Need an account?</p>
            <Button
              sx={{
                marginRight: 2
              }}
              onClick={() => navigate("/register")}
              variant="outlined"
            >Sign Up</Button>
            <Button
              onClick={() => navigate("/home")}
              variant="outlined"
            >Cancel</Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  </>;
}