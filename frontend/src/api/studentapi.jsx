import axios from 'axios';

const api = axios.create({
    baseURL: 'https://student-management-system-lplu.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
});


export const getAllStudents = async () => (await api.get('/api/students/all')).data;


export const getStudentsById = async (id) => (await api.get(`/api/students/${id}`)).data;

export const addStudent = async (data) => (await api.post('/api/students/add', data)).data;

export const updateStudent = async (id, data) => (await api.put(`/api/students/${id}`, data)).data;

export const deleteStudent = async (id) => (await api.delete(`/api/students/${id}`)).data;

export default { getAllStudents, getStudentsById, addStudent, updateStudent, deleteStudent };
