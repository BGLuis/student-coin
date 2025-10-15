package com.student_coin.api.controller;

import com.student_coin.api.dto.request.LoginRequest;
import com.student_coin.api.dto.request.RegisterEnterpriseRequest;
import com.student_coin.api.dto.request.RegisterStudentRequest;
import com.student_coin.api.dto.response.EnterpriseResponse;
import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.dto.response.TokenResponse;
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
    public ResponseEntity<StudentResponse> registerStudent(@Valid @RequestBody RegisterStudentRequest userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.register(userData));
    }

    @PostMapping("/enterprises")
    public ResponseEntity<EnterpriseResponse> registerEnterprise(@Valid @RequestBody RegisterEnterpriseRequest userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enterpriseService.register(userData));
    }


    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest loginData) {
        return ResponseEntity.status(HttpStatus.OK).body(personService.login(loginData));
    }
}
