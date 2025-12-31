package com.student.backend.controller;

import com.student.backend.model.Student;
import com.student.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000") // This allows your React app to talk to the backend
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;

    // GET all students
    @GetMapping("/students")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // POST (Create) a new student
    @PostMapping("/students")
    public Student createStudent(@RequestBody Student student) {
        return studentRepository.save(student);
    }
}
