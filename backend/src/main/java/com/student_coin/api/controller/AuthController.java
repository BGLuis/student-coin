package com.student_coin.api.controller;

import com.student_coin.api.dto.LoginDTO;
import com.student_coin.api.dto.RegisterDTO;
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

    @PostMapping(value = "/students/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Student> registerStudent(@Valid @RequestBody RegisterDTO userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(studentService.register(userData));
    }

    @PostMapping(value = "/enterprises/register", consumes = "application/json", produces = "application/json")
    public ResponseEntity<Enterprise> registerEnterprise(@Valid @RequestBody RegisterDTO userData) {
        return ResponseEntity.status(HttpStatus.CREATED).body(enterpriseService.register(userData));
    }


    @PostMapping(value = "/login", consumes = "application/json", produces = "application/json")
    public ResponseEntity<TokenDTO> login(@Valid @RequestBody LoginDTO loginData) {
        return ResponseEntity.status(HttpStatus.OK).body(personService.login(loginData));
    }
}
