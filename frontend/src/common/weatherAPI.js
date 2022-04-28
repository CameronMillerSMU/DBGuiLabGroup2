import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Display } from './weatherDisplay';
import { useEffect, useState } from 'react';

import axios from 'axios';

const API_KEY = "d388cdb64706c8b7a2b2bf7f041b42dd"
const UNITS = "Metric"
const LANG = "en"
const apiEndPoint =  `http://api.openweathermap.org/data/2.5/weather?q=`;

/*
const apiConfig = {
    headers:{
        Authorization: 'd388cdb64706c8b7a2b2bf7f041b42dd'
    }
}

export const getWeatherByCity = (city) => new Promise((resolve, reject) => {
    axios.get(`${apiEndPoint}${city}&lang=${LANG}&appid=${API_KEY}&units=${UNITS}`,apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});
*/

//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export class WeatherAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            weatherReport : null,
            isLoading : true,
            error : null
        }
    }
    componentDidUpdate() {
    var URL = apiEndPoint + this.props.city
                        + "&lang=" + LANG + "&appid=" + API_KEY + "&units="+ UNITS
    fetch(URL).then(response =>{
        if(response.ok) {
            console.log("the city is responded by API")
            return response.json()
         }
        else { throw new Error("SOMETHING WENT WRONG")}})
            .then(data => this.setState(
                { weatherReport : data,
                    isLoading: false }))
            .catch(error => this.setState( {error, isLoading : true }));
    }


    render() {

        if(this.state.isLoading) {
            if(this.props.city != null) {
                console.log("the city is received")
                return (
                    <div>
                        <LinearProgress  />
                    </div>
                    )
            }
            else return null;
        }
        else {
            console.log("the city is about to be displayed")
            return(
                <Display weatherReport = {this.state.weatherReport}/>
            )
        }
    }
}