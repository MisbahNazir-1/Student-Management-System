import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Content-Type':'application/json'
    }
})

//creating a function that is getting all students API
export const getAllStudents = async() => ( await api.get('/api/students/showstudents')).data;

export const getStudentsById = async(id) => (await api.get(`/api/students/student/${id}`)).data


export const addStudent = async(data) => (await api.post(`/api/students/addstudent`, data)).data

export const updateStudent = async(id,data) => (await api.post(`/api/students/updatestudent/${id}`, data)).data

export const deleteStudent = async(id) => (await api.delete(`/api/students/addstudent/${id}`)).data

export default (getAllStudents,getStudentsById,addStudent,updateStudent,deleteStudent)