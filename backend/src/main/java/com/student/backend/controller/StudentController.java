package com.student.backend.controller;

import com.student.backend.model.Student;
import com.student.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*") //This allows your React app to access the API
@RestController
@RequestMapping("/api/v1")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    // GET all students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
    
    // NEW: Check if email already exists
    @GetMapping("/students/check-email")
    public boolean checkEmailExists(@RequestParam String email) {
        return studentRepository.existsByEmail(email);
    }

    // POST (Create) a new student
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
}
