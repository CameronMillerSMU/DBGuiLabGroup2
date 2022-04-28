import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
//import bgImg from "../../public/logo512.png";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { WeatherAPI } from "../common/weatherAPI";
import { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import { Banner } from '../common/Banner';

//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export const Weather = (props) => {
  
  const [query, setQuery] = useState(null);
  const [city, setCity] = useState(null);

  //const weatherInfo = useMemo(()=>getWeatherByCity(city),[city])
  //console.log(weatherInfo);


  return <>
    <Banner />
    <Grid  alignItems="center" container>
      <Card >
        <CardContent>
          <TextField
            autoFocus
            label="City Name"
            onChange={(e) => {
              //setCity(e.target.value);
              setQuery(e.target.value);
            }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"
            onClick={() => {
              setCity(query);
              //console.log(query);
            }}>

            <SearchIcon />
          </IconButton>
        </CardContent>

        {!!city && <WeatherAPI city={city} />
        }
      </Card>
    </Grid>
  </>;
}