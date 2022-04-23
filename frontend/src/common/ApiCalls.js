import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';


export const addUser = (user) => new Promise((resolve, reject) => {
    user[0] = "thisismyusername";
    user[1] = "thisismypassword";
    
    axios.post(`${apiEndpoint}/users/${user[0]}/${user[1]}`, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const getUserById = (id) = new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/users/${id}`, apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});