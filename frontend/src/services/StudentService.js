import axios from 'axios';

// This is the URL of your Spring Boot GET endpoint
const STUDENT_API_BASE_URL = "http://localhost:8080/api/v1/students";

class StudentService {
    // Method to fetch all students
    getStudents() {
        return axios.get(STUDENT_API_BASE_URL);
    }
}

export default new StudentService();