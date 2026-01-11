import React, { useState, useEffect } from 'react';
import { createStudent, getStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';

const StudentComponent = () => {
    // 1. INPUT STATES: Store current values of the form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [department, setDepartment] = useState('');
    
    // 2. ERROR STATES: Store error messages to be displayed in the UI
    const [serverError, setServerError] = useState(''); 
    const [errors, setErrors] = useState({ name: '', email: '', department: '' });

    const { id } = useParams();
    const navigator = useNavigate();

    // REGEX PATTERNS: Defined once at the top for efficiency
    const alphaRegex = /^[A-Za-z\s]+$/; // Allows letters and spaces only
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format

    // Fetch student data if editing (id exists in URL)
    useEffect(() => {
        if (id) {
            getStudent(id).then((response) => {
                setName(response.data.name);
                setEmail(response.data.email);
                setDepartment(response.data.department);
            }).catch(error => { console.error(error); });
        }
    }, [id]);

    // 3. LIVE HANDLERS: These trigger every time a key is pressed (onKeyUp/onChange)
    
    // Validates name as user enters data
    const handleNameChange = (val) => {
        setName(val); // Update the value state
        if (!val.trim()) {
            // Update only the 'name' property in the errors object
            setErrors(prev => ({ ...prev, name: 'Name is required' }));
        } else if (!alphaRegex.test(val)) {
            setErrors(prev => ({ ...prev, name: 'Only alphabets are allowed' }));
        } else {
            setErrors(prev => ({ ...prev, name: '' })); // Clear error if valid
        }
    };

    // Validates email format as user enters data
    const handleEmailChange = (val) => {
        setEmail(val);
        if (!val.trim()) {
            setErrors(prev => ({ ...prev, email: 'Email is required' }));
        } else if (!emailRegex.test(val)) {
            setErrors(prev => ({ ...prev, email: 'Invalid email (e.g. user@gmail.com)' }));
        } else {
            setErrors(prev => ({ ...prev, email: '' }));
        }
    };

    // Validates department as user enters data
    const handleDeptChange = (val) => {
        setDepartment(val);
        if (!val.trim()) {
            setErrors(prev => ({ ...prev, department: 'Department is required' }));
        } else if (!alphaRegex.test(val)) {
            setErrors(prev => ({ ...prev, department: 'Only alphabets are allowed' }));
        } else {
            setErrors(prev => ({ ...prev, department: '' }));
        }
    };

    // 4. SUBMIT FUNCTION: Final check before hitting the backend
    const saveOrUpdateStudent = (e) => {
        e.preventDefault();

        // Check if any errors exist or if any fields are empty
        if (errors.name || errors.email || errors.department || !name || !email || !department) {
            setServerError("Please fix all errors and fill all fields before submitting.");
            return;
        }

        const student = { name, email, department };
        setServerError(''); 

        if (id) {
            updateStudent(id, student).then(() => navigator('/students'))
                .catch(error => setServerError(error.response?.data?.message));
        } else {
            createStudent(student).then(() => navigator('/students'))
                .catch(error => setServerError(error.response?.data?.message));
        }
    };

    return (
        <div className='container mt-5'>
            <div className='card col-md-6 offset-md-3 shadow'>
                <h2 className='text-center mt-2'>{id ? 'Update Student' : 'Add Student'}</h2>
                <div className='card-body'>
                    {/* Backend specific errors (e.g. Unique Email violation) */}
                    {serverError && <div className='alert alert-danger'>{serverError}</div>}
                    
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Name:</label>
                            <input 
                                type='text' 
                                className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                value={name} 
                                onChange={(e) => handleNameChange(e.target.value)} 
                            />
                            {/* Shows red text under input if error exists */}
                            {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input 
                                type='text' 
                                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                value={email} 
                                onChange={(e) => handleEmailChange(e.target.value)} 
                            />
                            {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                        </div>

                        <div className='form-group mb-2'>
                            <label className='form-label'>Department:</label>
                            <input 
                                type='text' 
                                className={`form-control ${errors.department ? 'is-invalid' : ''}`} 
                                value={department} 
                                onChange={(e) => handleDeptChange(e.target.value)} 
                            />
                            {errors.department && <div className='invalid-feedback'>{errors.department}</div>}
                        </div>

                        <button className='btn btn-success' onClick={saveOrUpdateStudent}>Submit</button>
                        <button className='btn btn-danger' onClick={() => navigator('/students')} style={{marginLeft: "10px"}}>Cancel</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StudentComponent;