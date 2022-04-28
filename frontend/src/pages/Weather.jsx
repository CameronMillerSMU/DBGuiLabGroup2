import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
//import bgImg from "../../public/logo512.png";
import { WeatherAPI } from "../common/weatherAPI";
import { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import { Banner } from '../common/Banner';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
const style = makeStyles((theme) => ({
  root: {
    marginTop: 50,
    display: "flex",
    width: 550,
    height: 250,
  },
  cardcss: {
    //backgroundImage: "url(" + bgImg + ")",
    //backgroundPosition: "center",
  },
}));

export const Weather = (props) => {
  const classes = style();
  const [city, setCity] = React.useState(null);



  return <>
    <Banner />
    <Grid className={classes.root} alignItems="center" container justify>
      <Card className={classes.cardcss}>
        <CardContent>
          <TextField
            autoFocus
            label="City Name"
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
          
          { !!city && <WeatherAPI city={city} />
          }
        </CardContent>
      </Card>
    </Grid>
  </>;
}