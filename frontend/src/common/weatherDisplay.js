import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import Box from "@material-ui/core/Box";

//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export const Display = ({ weatherReport }) =>{
  var lon = weatherReport.coord.lon;
  var lat = weatherReport.coord.lat;
  var weathermain = weatherReport.weather[0].main;
  var weatherdiscription = weatherReport.weather[0].description;
  var tempC = weatherReport.main.temp;
  const tempF = (temp * 9/5) + 32;
  var pressure = weatherReport.main.pressure;
  var humidity = weatherReport.main.humidity;
  var wind = weatherReport.wind.speed;
  var country = weatherReport.sys.country;
  var city = weatherReport.name;

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

  return (
    <div >
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h2" color="textPrimary">
              {city},{country}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              {lon}, {lat}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h4" color="textPrimary">
              Temp: {temp}
              <span>&#176;</span>
              {unit}
            </Typography>
            <button onClick={handleSwitchTemp}>C/F</button>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row-reverse">
          <Box p={0}>
            <Typography variant="h6" color="textSecondary">
              {weatherdiscription}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardContent>
        <Box display="flex" flexDirection="row">
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              Humidity: {humidity} %
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              pressure: {pressure} pa
            </Typography>
          </Box>
          <Box p={1}>
            <Typography variant="h6" color="textPrimary">
              wind: {wind} km/h
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </div>
  );
}