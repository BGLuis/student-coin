package com.student_coin.api.controller;

import com.student_coin.api.dto.request.StudentRequest;
import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Student;
import com.student_coin.api.mapper.StudentMapper;
import com.student_coin.api.service.StudentService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.function.EntityResponse;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private StudentMapper studentMapper;

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> findStudentByID(@PathVariable("id") Long id) {
        try {
            return ResponseEntity.ok(studentMapper.toStudentResponse(studentService.findById(id)));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAll() {
        return ResponseEntity.ok(studentService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StudentResponse> update(@PathVariable("id") Long id, @RequestBody StudentRequest data) {
        try {
        Student student = studentService.findById(id);
        return ResponseEntity.ok().body(studentService.update(student, data));
        }
        catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> delete() {
        studentService.delete();
        return ResponseEntity.noContent().build();
    }
}
