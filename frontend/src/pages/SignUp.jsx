import { useContext, useState } from 'react';
import * as React from 'react';
import TextField from '@mui/material/TextField';
import { AppContext } from "../AppContext";
import { useNavigate, useLocation } from 'react-router-dom';
import { Password, SettingsBackupRestoreSharp, SettingsOverscanOutlined } from '@mui/icons-material';
import { User } from '../common/User';
import Grid from '@mui/material/Grid';
import { Navigate } from 'react-router-dom';
import { apiEndpoint, apiConfig } from '../common/ApiConfig';
import { ApiCalls } from '../common/ApiCalls';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import ListItemText from '@mui/material/ListItemText';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import { FormControlLabel } from '@mui/material';

const theme = createTheme({
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
});


export const SignUp = () => {
  const theme = createTheme();
  const navigate = useNavigate();
  const context = useContext(AppContext);
  const ApiCall = new ApiCalls();

  const [location, setLocation] = React.useState("");
  const handleLocation = (e) => {
    setLocation(e.target.value);
  };
  const [age, setAge] = React.useState("");
  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    ApiCall.register(data.get('username'), data.get('password'), data.get('birthday'), data.get('location'), data.get('isPrivate')).then(res => {
      if (res.status <= 201) {
        navigate('/');
      }
    }).catch(err => {
      alert("User is already associated with this website");
    });
  };

  
  


  const [cities, setCities] = React.useState([]);
  React.useEffect(() => {
    ApiCall.getLocations().then(res => {
      const cities = res.data;
      setCities(cities);
    });
  }, []);

  const [isPrivate, setIsPrivate] = React.useState(false);

  
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
          <h1 className="text-white bg-primary p-3 mb-0">Sign Up</h1>
          <Box component="form" noValidate onSubmit={handleSignUp} className="bg-white py-2 mt-0">
            <Grid container spacing={2}>
              <Grid item xs={12} controlId="username">
                <TextField
                  placeholder="Enter Your Username"
                  name="username"
                  required
                  id="username"
                  label="username" >
                </TextField>
              </Grid>
              <Grid item xs={12} controlId="password">
                <TextField
                  placeholder="Enter Your Password"
                  name="password"
                  required
                  id="password"
                  label="password"
                  type="password"
                ></TextField>
              </Grid>
              <Grid item xs={12} controlId="birthday">
                <TextField
                  sx={{ mb: 1, width: '27.8ch' }}
                  placeholder="Enter Your Birthday"
                  name="birthday"
                  required
                  id="birthday"
                  type="date"
                ></TextField>
              </Grid>
            </Grid>
            <Grid item xs={12} controlId="location" >
              <FormControl fullWidth
                sx={{ m: 1, width: '27.8ch' }}>
                <InputLabel id="required-select-label">Location</InputLabel>
                <Select
                  value={location}
                  onChange={handleLocation}
                  required
                  labelId="location"
                  id="location"
                  label="loc"
                  placeholder="Enter Your Location"
                >
                  {cities.map(city => {
                    return (
                      < MenuItem value={city.cityName} key={city.cityName} loc={city.cityName} >
                        <ListItemText primary={city.cityName} />
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid>
              <FormControlLabel
                label="Are you a private user?"
                control={<Checkbox checked={isPrivate} color="primary" onChange={e => setIsPrivate(e.target.checked)} />}
              />
            </Grid>
            <Button item sx={{ mt: 2 }}
              type="submit"
              variant="outlined"
            >
              Submit</Button>
            <p>Already have an account?</p>
            <Button
              sx={{
                marginRight: 2
              }}
              onClick={() => navigate("/login")}
              variant="outlined">
              Log in
            </Button>
            <Button
              onClick={() => navigate("/")}
              variant="outlined"
            >Cancel (go home)
            </Button>
          </Box>
        </Box>
      </div>
    </ThemeProvider>
  </>;
};