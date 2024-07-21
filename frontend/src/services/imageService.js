import axios from 'axios';

const API_URL = 'http://13.59.42.81:5000/api/upload';

export const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axios.post(`${API_URL}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        }
    });

    return response.data;
};
