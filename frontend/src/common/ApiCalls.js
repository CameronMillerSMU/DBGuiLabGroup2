import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';



export const addUser = (user) => newPromise((resolve, reject) => {
    user[0] = "thisismyusername";
    user[1] = "thisismypassword";
    
    axois.post(`${apiEndpoint}/users/${user[0]}/${user[1]}`, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});