package com.studentmanagement.app.repository;

import com.studentmanagement.app.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    
    Optional<Student> findByEmail(String email);
    
    List<Student> findByFirstNameContainingIgnoreCase(String firstName);
    
    List<Student> findByLastNameContainingIgnoreCase(String lastName);
    
    List<Student> findByMajorIgnoreCase(String major);
    
    boolean existsByEmail(String email);
}