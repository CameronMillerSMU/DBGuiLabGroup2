import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';



export const addUser = (user) => new Promise((resolve, reject) => {    
    axios.post(`${apiEndpoint}/register`, user, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});