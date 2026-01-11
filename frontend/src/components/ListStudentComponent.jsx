import React, { useEffect, useState } from 'react';
import { listStudents, deleteStudent } from '../services/StudentService';
import { useNavigate } from 'react-router-dom';

const ListStudentComponent = () => {
    // State to store the array of students fetched from the backend
    const [students, setStudents] = useState([]);
    const navigator = useNavigate();

    // useEffect runs once when the component loads to fetch initial data
    useEffect(() => {
        getAllStudents();
    }, []);

    // Function to call the service and update the 'students' state
    function getAllStudents() {
        listStudents().then((response) => {
            setStudents(response.data);
        }).catch(error => { console.error(error); });
    }

    // Redirects user to the "Add Student" form
    function addNewStudent() {
        navigator('/add-student');
    }

    // Redirects user to the "Edit Student" form with the specific ID in the URL
    function updateStudent(id) {
        navigator(`/edit-student/${id}`);
    }

    // Handles the delete action with a confirmation popup
    function removeStudent(id) {
        if (window.confirm("Are you sure you want to delete this student?")) {
            deleteStudent(id).then((response) => {
                // After successful deletion, refresh the list to show updated data
                getAllStudents(); 
            }).catch(error => { console.error(error); });
        }
    }

    

    return (
        <div className='container'>
            <h2 className='text-center mt-3'>List of Students</h2>
            <button className='btn btn-primary mb-2' onClick={addNewStudent}>Add Student</button>
            <table className='table table-striped table-bordered shadow'>
                <thead className='table-dark'>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {/* Map through the students array to create table rows dynamically */}
                    {students.map(student => (
                        <tr key={student.id}>
                            <td>{student.name}</td>
                            <td>{student.email}</td>
                            <td>{student.department}</td>
                            <td>
                                <button className='btn btn-info' onClick={() => updateStudent(student.id)}>Update</button>
                                <button className='btn btn-danger' onClick={() => removeStudent(student.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ListStudentComponent;