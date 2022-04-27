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

import { Banner } from '../common/Banner';

const ApiCall = new ApiCalls();


const theme = createTheme();

export const Home = (props) => {

  [users, setUsers] = useState([]);
  const getUser = (i, userList) => {
    var userTemp = users;
    let currentUser = userList[i];
    userTemp[i] = currentUser;
    setUsers(userTemp);
  };

  const loadUsers = () => {
    ApiCall.getUsers().then(res => {
      for (var i in res.data) {
        getUser(i, res.data);
      }
      console.log(res.data);
    }).catch(err => {
      console.log(err);
    });
  };
  const navigate = useNavigate();
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];//ApiCall.getUsers();
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
                <Button variant="contained"
                  onClick={() => navigate("/PlantPage")}>
                  View your plants
                </Button>
                <Button variant="outlined"
                  onClick={() => navigate("/PlantPage")}>
                  Add plants to your collection
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 8 }} maxWidth="md">
            <Grid container spacing={4}>
              {cards.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card
                    sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                  >
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        User Name
                      </Typography>

                    </CardContent>
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        // pt: '56.25%',
                      }}
                      image="https://source.unsplash.com/random"
                      alt="random"
                    />
                    <Typography padding="5%">
                      This is where the users backgrounds will go
                    </Typography>
                    <Button variant="contained" size="medium" align="center">View User</Button>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </ThemeProvider>
    </div>
  );
}

