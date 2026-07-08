import axios from 'axios';

const api = axios.create({
    baseURL: 'https://student-management-system-lplu.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
});

// 1. Get All Students
export const getAllStudents = async () => {
    return await api.get('/api/students/all');
};

// 2. Get Student By ID
export const getStudentsById = async (id) => {
    return await api.get(`/api/students/${id}`);
};

// 3. Add Student
export const addStudent = async (data) => {
    return await api.post('/api/students/add', data);
};

// 4. Update Student 
export const updateStudent = async (id, data) => {
    return await api.put(`/api/students/${id}`, data);
};

// 5. Delete Student 
export const deleteStudent = async (id) => {
    return await api.delete(`/api/students/${id}`);
};
