import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from '@mui/material/CardHeader';
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from '@mui/material/Paper';
import {ThemeProvider, createTheme } from '@mui/system';
import { Banner } from './Banner';
//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

/*
Promise {<pending>}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: Object
current:
  cloud: 0
  condition: {text: 'Clear', icon: '//cdn.weatherapi.com/weather/64x64/night/113.png', code: 1000}
  feelslike_c: 11.8
  feelslike_f: 53.3
  gust_kph: 10.8
  gust_mph: 6.7
  humidity: 94
  is_day: 0
  last_updated: "2022-04-28 04:00"
  last_updated_epoch: 1651111200
  precip_in: 0
  precip_mm: 0
  pressure_in: 30.06
  pressure_mb: 1018
  temp_c: 12
  temp_f: 53.6
  uv: 1
  vis_km: 10
  vis_miles: 6
  wind_degree: 60
  wind_dir: "ENE"
  wind_kph: 9
  wind_mph: 5.6
[[Prototype]]: Object
location:
  country: "Spain"
  lat: 41.25
  localtime: "2022-04-28 5:21"
  localtime_epoch: 1651116069
  lon: 1.3
  name: "Nulles"
  region: "Catalonia"
  tz_id: "Europe/Madrid"
*/

export const Display = ({ weatherReport, pic }) =>{
  const time = weatherReport.current.last_updated;
  const lon = weatherReport.location.lon;
  const lat = weatherReport.location.lat;
  const weatherdiscription = weatherReport.current.condition.text;
  const tempC = weatherReport.current.temp_c;
  const tempF = weatherReport.current.temp_f;
  const pressure = weatherReport.current.pressure_in;
  const humidity = weatherReport.current.humidity;
  const wind = weatherReport.current.wind_kph;
  const country = weatherReport.location.country;
  const city = weatherReport.location.name;

  const [unit,setUnit] = useState(`C`);

  const temp = tempC;

  function handleSwitchTemp(e){
    if(unit==`C`){
      setUnit(`F`);
      temp = tempF;
    }else{
      setUnit(`C`);
      temp = tempC;
    }
  }

  /*
  https://c8.alamy.com/comp/2GC3T34/london-uk-6th-august-2021-partly-cloudy-sky-over-the-city-of-london-as-rain-and-sunshine-alternate-on-an-erratic-day-credit-vuk-valcic-alamy-live-news-2GC3T34.jpg
  London, UK. 6th August 2021. Partly cloudy sky over the City of London as  rain and sunshine alternate on an erratic day. (Credit: Vuk Valcic / Alamy  Live News Stock Photo - Alamy
  */

  const picpath = pic.path;
  const pictitle = pic.name;

  const dayNight = weatherReport.current.is_day == 0? "#FFFFFF" : "#000000";
  const textbg = weatherReport.current.is_day == 0? "#d9d9d9" : "#363636";

  const styles = {
    root: {
        backgroundImage: `url(${picpath})`,
        color: dayNight
       
    },
    text: {
      bgcolor: textbg
    }
  };

  return <>
  
  <Card style={styles.root} >
    
    <CardHeader title={`${city}, ${country}`} style = {styles.text}/>
    <CardContent style = {styles.text}>
    <Typography >
    Current Time: {time}
      </Typography>
    <Typography >
    Current Weather: {weatherdiscription}
      </Typography>
      <Typography >
      Longitude: {lon}, Latitude: {lat}
      </Typography>
      <Typography>
      Temp: {temp}
      <span>&#176;</span>
      {unit}
      </Typography>
      <Typography >
      Humidity: {humidity} %
      Pressure: {pressure} pa
      Wind: {wind} km/h
      </Typography>

    </CardContent>
  </Card>
  </>;
}


/*
<CardMedia
          component="img"
          height="100%"
          image={picpath}
          alt={pictitle}
        />


<CardContent>
        <Box sx={{ display: 'flex', flexDirection:'row' }}>
          <Box p={1}>
            <Typography sx={{ constiant: 'h2', color:'textSecondary' }}>
              {city},{country}
            </Typography>
            <Typography sx={{ constiant: 'caption', color:'textSecondary' }}>
              {lon}, {lat}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection:'row-reverse' }}>
          <Box p={0}>
            <Typography sx={{ constiant: 'h4', color:'textSecondary' }}>
              Temp: {temp}
              <span>&#176;</span>
              {unit}
            </Typography>
            <button onClick={(x)=>handleSwitchTemp(x)}>C/F</button>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection:'row-reverse' }}>
          <Box p={0}>
            <Typography sx={{ constiant: 'h6', color:'textSecondary' }}>
              {weatherdiscription}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection:'row' }}>
          <Box p={1}>
            <Typography sx={{ constiant: 'h6', color:'textPrimary' }}>
              Humidity: {humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography sx={{ constiant: 'h6', color:'textSecondary' }}>
              pressure: {pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography sx={{ constiant: 'h6', color:'textSecondary' }}>
              wind: {wind} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
*/