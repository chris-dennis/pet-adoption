import axios from 'axios';

const API_URL = 'http://localhost:5000/api/animals';

const getToken = () => localStorage.getItem('token');

export const getAnimals = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const addAnimal = async (animalData) => {
    const token = getToken();
    const config = {
        headers: { 'x-auth-token': token }
    };
    const response = await axios.post(API_URL, animalData, config);
    return response.data;
};

export const deleteAnimal = async (id) => {
    const token = getToken();
    const config = {
        headers: { 'x-auth-token': token }
    };
    const response = await axios.delete(`${API_URL}/${id}`, config);
    return response.data;
};

export const updateAnimal = async (id, updatedData) => {
    const token = getToken();
    const config = {
        headers: { 'x-auth-token': token }
    };
    const response = await axios.put(`${API_URL}/${id}`, updatedData, config);
    return response.data;
};

