package com.student.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "students")
@Data // This generates getters and setters automatically
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    private String department;
}
