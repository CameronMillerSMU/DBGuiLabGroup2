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
import { useNavigate, useLocation } from 'react-router-dom';


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
  const [bgpic, setBgpic] = React.useState(null);
  const ApiCall = new ApiCalls();

  const plant1 = new Plant(1, "Cactus", "Any of numerous succulent, spiny, usually leafless plants of the family Cactaceae, native chiefly to arid regions of the Americas, having variously colored, often showy flowers with numerous stamens and petals.", "Cacti", "Very Hot", "/plant1.jpg")
  const plant2 = new Plant(2, "Maple Wood", "A tree is a perennial plant with an elongated stem, or trunk, usually supporting branches and leaves. In some usages, the definition of a tree may be narrower, including only woody plants with secondary growth, plants that are usable as lumber or plants above a specified height", "Tree", "Moderate", "plant2.jpg");
  const plant3 = new Plant(3, "Fern", "Elephant ears are tropical perennial plants grown for the appeal of their large leaves rather than their flowers. Elephant ear is the common name for several species in three plant genera—Colocasia, Alocasia, and Xanthosoma. The most common one is Colocasia esculenta, also known as taro. These fast-growing plants will achieve their full size within two months and are generally planted in the spring after all danger of frost has passed", "", "Perrenial", "plant3.jpg");

  const currentUser = sessionStorage.getItem("currentUser");
  console.log("CurrentUser: " + currentUser);

  const navigate = useNavigate();
  // const [ownedPlants, setPlants] = React.useState([]);
  // React.useEffect(() => {
  //   ApiCall.getPlantsByOwner(sessionStorage.getItem("currentUser"), ApiCall.getToken).then(res => {
  //     const ownedPlants = res.data;
  //     setPlants(ownedPlants);
  //   });
  // }, []);

  const ownedPlants = [plant1, plant2, plant3];
  return (
    <div>
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
                component="h1"
                variant="h2"
                align="center"
                color="text.primary"
                gutterBottom
              >
                {sessionStorage.getItem("currentUser") == "null" ? sessionStorage.getItem("username") : sessionStorage.getItem("currentUser")}
              </Typography>
              <Typography variant="h3" align="center" color="text.secondary" paragraph>
                Owned Plants
              </Typography>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={2}>
              {!!ownedPlants && ownedPlants.map((plant, index) =>
                <PlantCard key={index} plant={plant} />
              )}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}