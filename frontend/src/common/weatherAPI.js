import React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Display } from './weatherDisplay';
import { useEffect, useState } from 'react';

import axios from 'axios';

//api info for weather
/*
const API_KEY = "d388cdb64706c8b7a2b2bf7f041b42dd"
const UNITS = "Metric"
const LANG = "en"
const apiEndPoint =  `http://api.openweathermap.org/data/2.5/weather?q=`;
*/

//api info for weather
const API_KEY = "68e04b10324846c68aa24010222804"
const UNITS = "Metric"
const LANG = "en"
const apiEndPoint =  `http://api.weatherapi.com/v1/current.json?`;

//api info for weather pic
const PROXY_URL = 'https://cors-anywhere.herokuapp.com/'
const PIC_API_KEY =`ec51b67a7d45a423c09dbb61f2c0245c60252e23aace2c7f7a1994bedcdd1156`;
const picEndPoint =  `https://serpapi.com/search.json?`;
const AFIX = `&tbm=isch&ijn=0`;


const apiConfig = {
    headers:{
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Access-Control-Max-Age": "86400"
        //Authorization: 'd388cdb64706c8b7a2b2bf7f041b42dd'
    }
}
/*
{location: {…}, current: {…}}
current: {last_updated_epoch: 1651114800, last_updated: '2022-04-28 05:00', temp_c: 13, temp_f: 55.4, is_day: 0, …}
location: {name: 'Nulles', region: 'Catalonia', country: 'Spain', lat: 41.25, lon: 1.3, …}
[[Prototype]]: Object
*/

export const getWeatherByCity = (city) => new Promise((resolve, reject) => {
    //axios.get(`${PROXY_URL}${apiEndPoint}key=${API_KEY}&q=${city}`
    axios.get(`${apiEndPoint}key=${API_KEY}&q=${city}`
    //,function (req, res) {res.header("Access-Control-Allow-Origin", "*")}
    //,apiConfig
    )
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


/*
{search_metadata: {…}, search_parameters: {…}, search_information: {…}, images_results: Array(101)}
images_results: (101) [{…}, {…}, {…} …]
    100: {position: 101, title: 'Clear Sky pictures | Curated Photography on EyeEm', 
    link: 'https://www.eyeem.com/search/pictures/clear%20sky', 
    thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcSH1_eEjdYL3WadqOLK5pACmryVaCBHQtBw&usqp=CAU', 
    original: 'https://cdn5.eyeem.com/thumb/92a8ca95a930145dcd8dc1a43d60689ad2c71767-1489414505185/w/800'}
    length: 101
search_information: {image_results_state: 'Results for exact spelling', query_displayed: 'q=Clear Sky'}
search_metadata: {id: '626a1147ef7dda2264e8eb5e', status: 'Success', json_endpoint: 'https://serpapi.com/searches/68020b8c551623ec/626a1147ef7dda2264e8eb5e.json', created_at: '2022-04-28 04:00:07 UTC', processed_at: '2022-04-28 04:00:07 UTC', …}
search_parameters: {engine: 'google', q: 'q=Clear Sky', google_domain: 'google.com', ijn: '0', device: 'desktop', …}
*/
//https://serpapi.com/search.json?q=Apple&tbm=isch&ijn=0&api_key=secret_api_key
export const getPicByWeather = (weather) => new Promise((resolve, reject) => {
    axios.get(`${PROXY_URL}${picEndPoint}q=${weather}${AFIX}&api_key=${PIC_API_KEY}`
    //axios.get(`${picEndPoint}q=${weather}&api_key=${PIC_API_KEY}`
    //,{headers: {'Access-Control-Allow-Origin': '*'}}
    //,function (req, res) {res.header("Access-Control-Allow-Origin", "*")}
    //,apiConfig
        )
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


/*
//code reference: https://anothertechs.com/programming/react/weather-app-using-react/

export class WeatherAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture : '',
            weatherReport : null,
            isLoading : true,
            error : null
        }
    }
    componentDidUpdate() {
    const URL = apiEndPoint + this.props.city
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
            const URLpic = picEndPoint + this.state.weatherReport.weather[0].description
                + AFIX + `&api_key=` + PIC_API_KEY
            fetch(URLpic).then(response => {
                if (response.ok) {
                    console.log("the pic is responded by API")
                    return response.json()
                }
                else { throw new Error("SOMETHING WENT WRONG") }
            })
                .then(data => this.setState(
                    {
                        picture : data
                    }))
                .catch(error => this.setState({ error, isLoading: true }));
            console.log("the city is about to be displayed")
            return (
                <Display weatherReport={this.state.weatherReport} />
            )
        }
    }
}
*/