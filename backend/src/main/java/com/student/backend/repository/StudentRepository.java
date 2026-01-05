package com.student.backend.repository;

import com.student.backend.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // JpaRepository gives us save(), findAll(), findById(), etc.
    boolean existsByEmail(String email);
}
