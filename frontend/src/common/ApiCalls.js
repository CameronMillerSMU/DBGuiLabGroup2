import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';

export class ApiCalls {
    getToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/session`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
            .then(res => {
                console.log('Response: ')
                resolve(res);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log('I\'m in');
            });
        }
    )}
    register(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/register`, {username: username, password: password})
            .then(response => {
                console.log('Connected!!!');
                resolve(response);
            })
            .catch(error => {
                console.log('Not Connected :(');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log("I'm in");
            })
        })
    }

    login(username,password) {
        return new Promise((resolve,reject) => {
            axios.post(`${apiEndpoint}/`, {username: username, password: password})
            .then(response => {
                console.log('Response: ');
                console.log(response);
                sessionStorage.setIem('token', response.data.accessToken);
                resolve(response);
            })
            .catch(error => {
                console.log('Not Connected :(');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log("I'm in");
            })
        })
    }
}
