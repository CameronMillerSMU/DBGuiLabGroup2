import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ApiCalls } from '../common/ApiCalls';
import * as React from 'react'; 
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




  const currentUser = ApiCall.getUser(sessionStorage.getItem("currentUser"));



  const [plant, setPlant] = React.useState([]);
  React.useEffect(() => {
    ApiCall.getPlant(plantName).then(res => {
      const plant = res.data;
      setPlant(plant);
    });
  }, []);
  return <>
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h1" gutterBottom>
              Plant Page
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Plant Name: {props.plant.name}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Plant Description: {props.plant.description}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Plant Category: {props.plant.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Plant Climate: {props.plant.image}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" component="h2" gutterBottom>
              Plant Image: {props.plant.location}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  </>
}