import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import CameraIcon from '@mui/icons-material/PhotoCamera';
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
import { useEffect, useState } from 'react';
import { PlantPost } from '../pages/PlantPost';
import { Banner } from './Banner';
import { ApiCalls } from './ApiCalls';
import { User } from './User';
import { Plant } from './Plant';
import { OwnedPlants } from './OwnedPlants';
import { PlantCard } from './PlantCard';


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

export const Profile = (props) => {

  const testuser = new User();


  const [bgpic, setBgpic] = React.useState(null);


  const api = new ApiCalls();
  //const {user} = api.session(props.token);
  //api.getToken(props);

  //hardcoded plant num, need to change it later
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  //<PlantPost posts={user.plantPosts} id={card}/>

  const plant1 = new Plant(1, "Cactus", "Plant Description1", "plant category1", "plant climate1", "/plant1.jpg");
  const plant2 = new Plant(2, "Tree", "Plant Description2", "plant category2", "plant climate2", "plant2.jpg");
  const plant3 = new Plant(3, "Flower", "Plant Description3", "plant category3", "plant climate3", "plant3.jpg");

  const tempUser = new User();
  tempUser.username = sessionStorage.getItem("currentUser");
  tempUser.ownedPlants = [plant1, plant2, plant3];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Banner />

        <main>
          {/* Hero unit */}
          <Box
            sx={{
              bgcolor: 'background.paper',
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {tempUser.username}
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Something short and leading about the collection below—its contents,
                the creator, etc. Make it short and sweet, but not too short so folks
                don&apos;t simply skip over it entirely.
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >

                <Button variant="outlined">Change Location</Button>
              </Stack>
            </Container>
          </Box>



          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={2}>
              {!!tempUser.ownedPlants && tempUser.ownedPlants.map((plant, index) =>
                <PlantCard key={index} plant={plant} />
              )}
            </Grid>
          </Container>
        </main>
        {/* 
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
      Footer 
      
      </Box>*/
        }
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}