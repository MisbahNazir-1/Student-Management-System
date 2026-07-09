import axios from 'axios';

const api = axios.create({
    baseURL: 'https://student-management-system-lplu.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Naya account banane ka function
export const registerUser = async (userData) => {
    return (await api.post('/api/auth/register', userData)).data;
};

// Login karne ka function
export const loginUser = async (credentials) => {
    return (await api.post('/api/auth/login', credentials)).data;
};
