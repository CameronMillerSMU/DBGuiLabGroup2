import React, { useMemo } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from '@mui/material/Paper';
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
//import bgImg from "../../public/logo512.png";
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { WeatherAPI } from "../common/weatherAPI";
import { Display } from '../common/weatherDisplay';
import { getWeatherByCity,getPicByWeather } from "../common/weatherAPI";
import { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import { Banner } from '../common/Banner';

//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export const Weather = (props) => {
  
  const [query, setQuery] = useState(null);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [pic, setPic] = useState(null);
  const [style, setStyle] = useState(null);
  

   async function handleSubmit(event) {
    setCity(query);
    //console.log( 'handle submit. City:', city, 'query: ', query);
    /*
    const temp = await getWeatherByCity(city);
    console.log(temp);
    setWeather(temp);
    const dayNight = temp.current.is_day == 0? "Night" : "Day";
    const temppic = await getPicByWeather(`${query} ${dayNight} ${temp.current.condition.text} Sky`)
    
   */
    const temppic = await getPicByWeather(`Clear Sky`)
    const [picPath,picDesc] = [temppic.images_results[0].original,temppic.images_results[0].title];
    console.log(picPath,picDesc);
    
    
    setPic({path: picPath, name: picDesc});

    if(pic)setStyle({
      paperContainer: {
          backgroundImage: `url(${pic.path})`
      }
    })
  }

  //setWeather(getWeatherByCity(city));
    //console.log(weather);

  //const weatherInfo = useMemo(()=>getWeatherByCity(city),[city])
  //console.log(weatherInfo);


  return <Paper style={style}>
    <Banner />
    <Grid  alignItems="center" container spacing={2}>
      
    {!(weather&&pic) && <Card xs={6} md={8} >
        <CardContent>
          <TextField
            autoFocus
            label="City Name"
            onChange={(e) => {
              setQuery(e.target.value);
              //setCity(e.target.value);
              //console.log( 'textfield changed. City:', city, 'query: ', query); 
            }}
          />
          <IconButton type="submit" sx={{ p: '10px' }} aria-label="search"
            onClick={
              (x) => {
              setCity(query)
              handleSubmit(x)
              //console.log( 'button clicked. City:', city, 'query: ', query); 
            }
            //handleSubmit
            }>
            <SearchIcon />
          </IconButton>
        </CardContent>

        {//!!city && <WeatherAPI city={city} />
        }
      </Card>}
      {!!(weather&&pic) && <Display weatherReport={weather} pic = {pic}/>}
      

    </Grid>
  </Paper>;
}