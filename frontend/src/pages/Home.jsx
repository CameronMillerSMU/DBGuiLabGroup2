import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import YardIcon from '@mui/icons-material/Yard';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate } from 'react-router-dom';
import { ApiCalls } from '../common/ApiCalls';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Banner } from '../common/Banner';
import { Profile } from '../common';


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

export const Home = (props) => {
  const ApiCall = new ApiCalls();
  const [users, setUsers] = React.useState([]);
  React.useEffect(() => {
    ApiCall.getUsers().then(res => {
      const users = res.data;
      setUsers(users);
    });
  }, []);
  
  const handleViewProfile = (user) => {
    console.log(user.username);
    sessionStorage.setItem("currentUser", user.username);
    navigate('/profile');
  };

  const navigate = useNavigate();
  const cards = ApiCall.getUsers();//ApiCall.getUsers();
  return (
    <div >
      <ThemeProvider theme={theme}>
        <Banner />

        <main>
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                Flora Home Page
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Welcome to the home page! Here you can view your plants, add more to your collection and view other users on Flora.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
              </Stack>
            </Container>
          </Box>
          <Typography variant="h3" align="center" color="text.primary" paragraph>Current Users</Typography>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {users.map((user) => (
                <Grid item key={user.username} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {user.username}
                      </Typography>
                    </CardContent>
                    <CardMedia
                      component="img"
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <Typography padding="5%">
                      Location: {user.location}
                    </Typography>
                    <Button
                      variant="contained"
                      size="medium"
                      align="center"
                      onClick={() => handleViewProfile(user)}
                    >View User</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div >
  );
}

