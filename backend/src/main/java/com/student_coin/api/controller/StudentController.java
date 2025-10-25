package com.student_coin.api.controller;

import com.student_coin.api.dto.request.StudentRequest;
import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Student;
import com.student_coin.api.mapper.StudentMapper;
import com.student_coin.api.service.StudentService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@RestController
@RequestMapping("/students")
@AllArgsConstructor
public class StudentController {
    private StudentService studentService;
    private StudentMapper studentMapper;

    @GetMapping("/{id}")
    public ResponseEntity<StudentResponse> findStudentByID(@PathVariable("id") Long id) {
            return ResponseEntity.ok(studentMapper.toStudentResponse(studentService.findById(id)));
    }

    @GetMapping
    public ResponseEntity<List<StudentResponse>> getAll() {
        return ResponseEntity.ok(studentService.findAll());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<StudentResponse> update(@PathVariable("id") Long id, @RequestBody StudentRequest data) {
        Student student = studentService.findById(id);
        return ResponseEntity.ok().body(studentService.update(student, data));
    }

    @DeleteMapping("/me")
    public ResponseEntity<String> delete() {
        studentService.delete();
        return ResponseEntity.noContent().build();
    }
}
