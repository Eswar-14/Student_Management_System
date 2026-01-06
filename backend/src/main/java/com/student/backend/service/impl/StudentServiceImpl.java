package com.student.backend.service.impl;

import com.student.backend.dto.StudentDto;
import com.student.backend.model.Student;
import com.student.backend.repository.StudentRepository;
import com.student.backend.service.StudentService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        // Validation: Check for duplicate email
        if(studentRepository.existsByEmail(studentDto.getEmail())){
            throw new RuntimeException("Email already exists! Please use a different one.");
        }

        Student student = new Student(null, studentDto.getName(), studentDto.getEmail(), studentDto.getDepartment());
        Student saved = studentRepository.save(student);
        return new StudentDto(saved.getId(), saved.getName(), saved.getEmail(), saved.getDepartment());
    }

    @Override
    public StudentDto getStudentById(Long studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));
        return new StudentDto(student.getId(), student.getName(), student.getEmail(), student.getDepartment());
    }

    @Override
    public List<StudentDto> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(s -> new StudentDto(s.getId(), s.getName(), s.getEmail(), s.getDepartment()))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(Long id, StudentDto dto) {
        Student student = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Validation: If email is changed, check if new email is already taken
        if(!student.getEmail().equals(dto.getEmail()) && studentRepository.existsByEmail(dto.getEmail())){
            throw new RuntimeException("Email already exists! Cannot update.");
        }

        student.setName(dto.getName());
        student.setEmail(dto.getEmail());
        student.setDepartment(dto.getDepartment());

        Student updated = studentRepository.save(student);
        return new StudentDto(updated.getId(), updated.getName(), updated.getEmail(), updated.getDepartment());
    }

    @Override
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}