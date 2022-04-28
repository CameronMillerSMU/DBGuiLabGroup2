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
import { ApiCalls } from '../common/ApiCalls';
import { Navigate } from 'react-router-dom';
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


export const PlantPage = (props) => {
  const ApiCall = new ApiCalls();
  const plantName = sessionStorage.getItem("currentPlant");

  const [plant, setPlant] = React.useState([]);
  React.useEffect(() => {
    ApiCall.getPlantByName(plantName).then(res => {
      const plant = res.data;
      setPlant(plant);
    });
  }, []);
  return <>
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {plant.name}
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            image={plant.plantPhoto}
            alt="random"
          />
          <Typography padding="5%">
            Description: {plant.plantDesc}
          </Typography>
          <Typography padding="5%">
            Climate: {plant.plantClimate}
          </Typography>
        </Card>
      </Container>
    </ThemeProvider>
  </>
}