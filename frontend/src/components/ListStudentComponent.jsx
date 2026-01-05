import React, { useState, useEffect } from 'react';
import StudentService from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

const ListStudentComponent = () => {
    // 1. Initialize an empty array for students
    const [students, setStudents] = useState([]);

    // 2. Call the API when the component "mounts" (loads)
    useEffect(() => {
        getAllStudents();
    }, []);

    const getAllStudents = () => {
        StudentService.getStudents().then((response) => {
            setStudents(response.data); // Put the MySQL data into our state
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        });
    };

    const navigator = useNavigate(); //for navigation

    function addNewStudent() {
        navigator('/add-student')
    }

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Live Student Records</h2>
            <button className="btn btn-primary mb-2" onClick={addNewStudent}>Add Student</button>
            <div className="card shadow">
                <div className="card-body">
                    <table className="table table-striped table-bordered">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Department</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                students.map(student => (
                                    <tr key={student.id}>
                                        <td>{student.id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.email}</td>
                                        <td>{student.department}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ListStudentComponent;