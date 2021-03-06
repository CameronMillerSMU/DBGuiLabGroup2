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
import { PlantCard } from '../common/PlantCard';
import { Banner } from '../common/Banner';

/*
function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}
*/

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const theme = createTheme();

export const OwnedPlants = ({plantsList}) => {
  // if(plantsList.length === 0) {
  //  return <p>
  //    No plants owned.
  //  </p>;
  // }
  // else {
    return <>
    <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppBar position="relative">
          <Toolbar>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap>
              OwnedPlants layout
            </Typography>
          </Toolbar>
        </AppBar>


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
                OwnedPlants layout
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Your plants
              </Typography>
              <Stack
                sx={{ pt: 4 }}
                direction="row"
                spacing={2}
                justifyContent="center"
              >
                <Button variant="contained">Main call to action</Button>
                <Button variant="outlined">Secondary action</Button>
              </Stack>
            </Container>
          </Box>


          <Container sx={{ py: 8 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={4}>
            { !!plantsList && plantsList.map((plant, index) =>
                    <PlantCard key={index} value={ [plant.name, plant.plantPhoto] }/>
                  )}

              {/*cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>


                  { !!plantsList && plantsList.map((plant, index) =>
                    <PlantCard key={index} value={ [plant.name, plant.plantPhoto] }/>
                  )}
                  


                </Grid>
              ))*/
            }
            </Grid>
          </Container>


        </main>
        
      </ThemeProvider>
      </>;
    
  //}
}