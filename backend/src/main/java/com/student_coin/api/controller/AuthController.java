package com.student_coin.api.controller;

import com.student_coin.api.dto.LoginDTO;
import com.student_coin.api.dto.RegisterEnterpriseDTO;
import com.student_coin.api.dto.RegisterStudentDTO;
import com.student_coin.api.dto.TokenDTO;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.entity.Student;
import com.student_coin.api.service.EnterpriseService;
import com.student_coin.api.service.PersonService;
import com.student_coin.api.service.StudentService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private StudentService studentService;

    @Autowired
    private EnterpriseService enterpriseService;

    @Autowired
    private PersonService personService;

    @PostMapping("/students")
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody RegisterStudentDTO userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.register(userData));
    }

    @PostMapping("/enterprises")
    public ResponseEntity<Enterprise> registerEnterprise(@Valid @RequestBody RegisterEnterpriseDTO userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enterpriseService.register(userData));
    }


    @PostMapping("/login")
    public ResponseEntity<TokenDTO> login(@Valid @RequestBody LoginDTO loginData) {
        return ResponseEntity.status(HttpStatus.OK).body(personService.login(loginData));
    }
}
