import axios from 'axios';

export class ApiCalls {
    
    url = "http://localhost:8000";

    login(user) {
        return axios.post(`${this.url}/login`, user);
    }

    signup(user) {
        return axios.post(`${this.url}/users`, user);
    }
}