import axios from 'axios';

const REST_API_BASE_URL = 'http://localhost:8080/api/students';

// GET ALL
export const listStudents = () => axios.get(REST_API_BASE_URL);

// CREATE
export const createStudent = (student) => axios.post(REST_API_BASE_URL, student);

// GET SINGLE (Used to pre-fill the Update form)
export const getStudent = (studentId) => axios.get(REST_API_BASE_URL + '/' + studentId);

// UPDATE
export const updateStudent = (studentId, student) => axios.put(REST_API_BASE_URL + '/' + studentId, student);

// DELETE
export const deleteStudent = (studentId) => axios.delete(REST_API_BASE_URL + '/' + studentId);