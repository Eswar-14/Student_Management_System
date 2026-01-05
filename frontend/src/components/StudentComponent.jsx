import React, { useState } from 'react'
import StudentService from '../services/StudentService'
import { useNavigate } from 'react-router-dom'

const StudentComponent = () => {
    // 1. State variables to hold form data
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [department, setDepartment] = useState('')

    //for error state
    const [errors, setErrors] = useState({
    email: '',
    name: '',
    department: ''
    });

    // List of allowed branches
    const branches = ["CSE", "ECE", "EEE", "Mechanical", "Civil", "IT"];
    
    const navigator = useNavigate();

    //For Email handling
    const handleEmailChange = async (value) => {
        setEmail(value);
        let errorMsg = '';

        // 1. Check Format (Using your existing Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            errorMsg = "Invalid email format (e.g., name@test.com)";
        } else {
            // 2. Check Database for Duplicate (New Step)
            try {
                const response = await StudentService.checkEmail(value);
                if (response.data === true) {
                    errorMsg = "This email is already registered!";
                }
            } catch (err) {
                console.error("Database check failed", err);
            }
        }

        setErrors(prev => ({ ...prev, email: errorMsg }));
    };
    // Function to handle the Save button click
    const saveStudent = (e) => {
        e.preventDefault();

        // Block submission if there are any errors or empty fields
        if (errors.email || !name || !email || !department) {
            alert("Please fix the errors and fill all fields before submitting.");
            return;
        }

        const student = { name, email, department };
        StudentService.createStudent(student).then((response) => {
            navigator('/students');
        });
    }
    //Function to handle the cancel button
    const cancelForm = () => {
    setName('');
    setEmail('');
    setDepartment('');
    navigator('/students'); // Optional: sends them back to the list
    }

    return (
        <div className='container mt-5'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    <h2 className='text-center mt-2'>Add Student</h2>
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Name:</label>
                                <input type='text' placeholder='Enter Name' className='form-control'
                                    value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Email:</label>
                                <input 
                                    type='email' 
                                    placeholder='Enter Email' 
                                    className={`form-control ${errors.email ? 'is-invalid' : ''}`} // Turns border red
                                    value={email} 
                                    onChange={(e) => handleEmailChange(e.target.value)} 
                                />
                                {/* This shows the red text error message */}
                                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                            </div>
                            <div className='form-group mb-2'>
                                <label className='form-label'>Department:</label>
                                <select 
                                    className='form-control' 
                                    value={department} 
                                    onChange={(e) => setDepartment(e.target.value)}
                                >
                                    <option value="">Select Branch</option>
                                    {branches.map(branch => <option key={branch} value={branch}>{branch}</option>)}
                                </select>
                            </div>
                            <button className='btn btn-success' onClick={saveStudent}>Submit</button>
                            <button className='btn btn-danger' onClick={cancelForm} style={{marginLeft: "10px"}}>Cancel</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StudentComponent