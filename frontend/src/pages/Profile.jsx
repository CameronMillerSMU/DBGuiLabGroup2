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

import { PlantPost } from './PlantPost';
import { ResponsiveAppBar } from '../common/ResponsiveAppBar';
import { ApiCalls } from '../common/ApiCalls';
import { User } from '../common/User';


const theme = createTheme();

export const Profile = (props) => {

  const testuser = new User(username = "test", 
    password, 
    birthDate, 
    location, 
    adminTag, 
    registeredTag, 
    privateTag, 
    backgroundPic, 
    favoritePlants, 
    ownedPlants)

    const [bgpic, setBgpic] = React.useState(null);

  
    const api = new ApiCalls;
    const {user} = api.session(props.token);
    //hardcoded plant num, need to change it later
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <ResponsiveAppBar />
        
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
                {testuser.username}
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
                <label htmlFor="contained-button-file">
  <Input accept="image/*" id="contained-button-file" multiple type="file" value={(x)=> setBgpic(x)}/>
  <Button variant="contained" component="span">
    Upload
  </Button>
</label>
                <Button variant="outlined">Change Location</Button>
              </Stack>
            </Container>
          </Box>



          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {/*cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>

            <PlantPost posts={user.plantPosts} id={card}/>
            </Grid>
              ))*/}
            </Grid>
          </Container>
        </main>
      {/* Footer */}
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
      
      </Box>
        {/* End footer */}
      </ThemeProvider>
    </div>
  );
}