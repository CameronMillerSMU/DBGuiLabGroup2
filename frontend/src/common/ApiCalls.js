import axios from 'axios';
import { apiEndpoint, apiConfig } from './ApiConfig';

//Users

export const addUser = (user) => new Promise((resolve, reject) => {    
    //how do you get returned token???
    axios.post(`${apiEndpoint}/register`, user, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const login = (params) => new Promise((resolve, reject) => {
    axios.post(`${apiEndpoint}/login`, params, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});





export const getUserById = (id, token) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/user`, token, id, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const deleteUser = (id, token) => new Promise((resolve, reject) => {
    axios.delete(`${apiEndpoint}/deleteuser`, token, id, apiConfig)
    .then(x => resolve())
    .catch(x => {
        alert(x);
        reject(x);
    });
})

export const getUsers = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    // should this have params and token or just token???
    axios.get(`${apiEndpoint}/users`, token, params, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getRegisteredUsers = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/registeredusers`, token, params, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});

export const getPublicUsers = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/publicusers`, token, params, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});


//Plants

export const addPlant = (plant, token) => new Promise((resolve, reject) => {    
    axios.post(`${apiEndpoint}/newplant`, token, plant, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


export const getAllPlants = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/allplants`, token, params, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});


export const getPlantByName = (name, token) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/plantbyname`, token, name, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


export const getPlantByCategory = (category, token) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/plantbycategory`, token, category, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});

export const getPlantByClimate = (climate, token) => new Promise((resolve, reject) => {
    axios.get(`${apiEndpoint}/plantbyclimate`, token, climate, apiConfig)
    .then(x => resolve(x.data))
    .catch(x => {
        alert(x);
        reject(x);
    });
});


//plants owned

export const getOwnedPlants = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/allOwned`, token, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});


export const getOwnedPlantsByOwner = (params, token) => new Promise((resolve, reject) => {
    let _apiConfig = { ...apiConfig };
    if(params) {
        _apiConfig.params = params;
    }

    axios.get(`${apiEndpoint}/byOwner`, token, params, _apiConfig)
        .then(x => resolve(x.data))
        .catch(x => {
            alert(x);
            reject(x);
        });
});



