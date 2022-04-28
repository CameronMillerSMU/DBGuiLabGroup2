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
import { getWeatherByCity,getPicByWeather,getPicByWeather2 } from "../common/weatherAPI";
import { useEffect, useState } from 'react';
import { Button } from "@material-ui/core";
import { Banner } from '../common/Banner';

//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export const Weather = (props) => {
  
  const [query, setQuery] = useState(null);
  const [city, setCity] = useState(null);
  const [weather, setWeather] = useState(null);
  const [pic, setPic] = useState(null);
  //const [style, setStyle] = useState(null);


  useEffect(() => {setCity(query)},[query])
  

   async function handleSubmit(event) {
    //setCity(query);
    //console.log( 'handle submit. City:', city, 'query: ', query);

    //const value = useMemo(() => setCity(query), [query])
    
    const temp = await getWeatherByCity(city);
    //console.log(temp);
    setWeather(temp);
    const dayNight = temp.current.is_day == 0? "Night" : "Day";
    const temppic = await getPicByWeather2(`${query} ${dayNight} ${temp.current.condition.text} Sky`)
    //const temppic = await getPicByWeather(`Clear Sky`)

    
    //const temppic = await getPicByWeather2(`Clear Sky`)
    //console.log(temppic)
    const [picPath,picDesc] = [temppic.relatedSearches[0].thumbnail.thumbnailUrl,temppic.relatedSearches[0].text];
    //const [picPath,picDesc] = [temppic.images_results[0].original,temppic.images_results[0].title];
    /*
  https://c8.alamy.com/comp/2GC3T34/london-uk-6th-august-2021-partly-cloudy-sky-over-the-city-of-london-as-rain-and-sunshine-alternate-on-an-erratic-day-credit-vuk-valcic-alamy-live-news-2GC3T34.jpg
  London, UK. 6th August 2021. Partly cloudy sky over the City of London as  rain and sunshine alternate on an erratic day. (Credit: Vuk Valcic / Alamy  Live News Stock Photo - Alamy
  */
 /*
  const [picPath,picDesc] = 
  ['https://c8.alamy.com/comp/2GC3T34/london-uk-6th-august-2021-partly-cloudy-sky-over-the-city-of-london-as-rain-and-sunshine-alternate-on-an-erratic-day-credit-vuk-valcic-alamy-live-news-2GC3T34.jpg'
  ,'London, UK. 6th August 2021. Partly cloudy sky over the City of London as  rain and sunshine alternate on an erratic day. (Credit: Vuk Valcic / Alamy  Live News Stock Photo - Alamy'];
  */
    //console.log(picPath,picDesc);
    
    
    setPic({path: picPath, name: picDesc});
  
  }

  //setWeather(getWeatherByCity(city));
    //console.log(weather);

  //const weatherInfo = useMemo(()=>getWeatherByCity(city),[city])
  //console.log(weatherInfo);


  //<Grid  alignItems="center" container spacing={5} >
  //<Paper style={style}>
  return <>
  
    <Grid  >
    <Banner />
      
    {!(weather&&pic) && <Card >
      
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
          <IconButton type="submit" aria-label="search"
            onClick={
              (event) => {
              //setCity(query)
              handleSubmit(event)
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
  </>;
}