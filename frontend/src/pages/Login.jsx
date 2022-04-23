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
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useDebugValue } from 'react';
import { User } from '../common/User';
import { ApiCalls } from '../common/ApiCalls';
import { Navigate } from 'react-router-dom';

const theme = createTheme();

export const Login = (props) => {
  const api = new ApiCalls();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [validated, setValidated] = useState(false);


  const handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
    if(form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
    }
    else {
      let newUser = new User(username, password);
      api.login(newUser).then(res => {
        props.setToken(res.data.data.jwt);
        localStorage.setItem('token', res.data.data.jwt);
        Navigate("/home"); //takes to homepage once logged in
      }).catch(err =>{
        console.log(err);
        alert(err);
      })

    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LocalFloristIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link to="/home" variant="body2">
                  Continue without logging in
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        
      </Container>
    </ThemeProvider>
  );

  
}