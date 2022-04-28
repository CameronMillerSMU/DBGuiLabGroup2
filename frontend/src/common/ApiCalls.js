import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';

export class ApiCalls {
    getToken() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/users/session`, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
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
        )
    }
    register(username, password, birthday, location, privateTag) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/users/register`, { username: username, password: password, birthday: birthday, location: location, privateTag: privateTag })
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
    login(username, password) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/users/login`, { username: username, password: password })
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    sessionStorage.setItem('token', response.data);
                    sessionStorage.setItem('username', username); //what does this return
                    sessionStorage.setItem('password', password);

                    resolve(response);
                })
                .catch(error => {
                    console.log('Could not login');
                    console.log(error);
                    reject(error);
                })
                .finally(() => {
                    console.log("I'm in");
                })
        })
    }
    getUsers() {
        return new Promise((resolve, reject) => {
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
    getUser(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/users/specificuser`, { username: username })
                .then(response => {
                    console.log('Get User Response: ');
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log('Cannot get user');
                    console.log(error);
                    reject(error);
                })
                .finally(() => {
                    console.log("I'm in");
                })
        })
    }
    getPlantsByOwner(username) {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/ownedplants/byowner`, { username: username }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log('Cannot get plants');
                    console.log(error);
                    reject(error);
                })
                .finally(() => {
                    console.log("I'm in");
                })
        })
    }
    getLocations() {
        return new Promise((resolve, reject) => {
            axios.get(`${apiEndpoint}/location/alllocations`)
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log('Cannot get locations');
                    console.log(error);
                    reject(error);
                })
                .finally(() => {
                    console.log("I'm in");
                })
        })
    }
    setLocation(location) {
        return new Promise((resolve, reject) => {
            axios.post(`${apiEndpoint}/users/updatelocation`, { location: location }, { headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` } })
                .then(response => {
                    console.log('Response: ');
                    console.log(response);
                    resolve(response);
                })
                .catch(error => {
                    console.log('Cannot post location');
                    console.log(error);
                    reject(error);
                })
                .finally(() => {
                    console.log("I'm in");
                });
        })
    }
}
