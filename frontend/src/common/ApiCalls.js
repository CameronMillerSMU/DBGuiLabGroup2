import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';

export class ApiCalls {
    getToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/users/session`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}`}})
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
            axios.post(`${apiEndpoint}/users/register`, {username: username, password: password})
            .then(response => {
                console.log('Connected!!!');
                sessionStorage.setItem('token', response.data);
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
            debugger
            axios.post(`${apiEndpoint}/users/login`, {username: username, password: password})
            .then(response => {
                console.log('Response: ');
                console.log(response);
                sessionStorage.setItem('token', response.data);
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
    
    getUsers() {
        return new Promise((resolve,reject) => {
            axios.get(`${apiEndpoint}/users/allusers`)
            .then(response => {
                console.log('Response: ');
                console.log(response);
                resolve(response);
            })
            .catch(error => {
                console.log('Cannot get users');
                console.log(error);
                reject(error);
            })
            .finally(() => {
                console.log("I'm in");
            })
        })
    }
}
