import axios from 'axios';

export class ApiCalls {
    
    url = "http://localhost:8000";

    login(user) {
        return axios.post(`${this.url}/login`, user);
    }

    signup(user) {
        return axios.post(`${this.url}/register`, user);
    }

    session(user) {
        return axios.get(`${this.url}/session`, user);
    }
}