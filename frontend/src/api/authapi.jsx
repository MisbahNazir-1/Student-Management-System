import axios from 'axios';

// Automatically switches between your local machine and your live Vercel URL
const baseURL = process.env.NODE_ENV === 'production'
    ? 'https://student-management-system-lplu.vercel.app'
    : 'http://localhost:5000'; // Change 5000 to your local backend port if different

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Automatically inject JWT Token into headers for every request if it exists in localStorage
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Assumes you save your token as 'token'
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Naya account banane ka function
export const registerUser = async (userData) => {
    return (await api.post('/api/auth/register', userData)).data;
};

// Login karne ka function
export const loginUser = async (credentials) => {
    return (await api.post('/api/auth/login', credentials)).data;
};

export default api;
