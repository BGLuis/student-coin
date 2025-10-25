package com.student_coin.api.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.student_coin.api.dto.request.LoginRequest;
import com.student_coin.api.dto.request.EnterpriseRequest;
import com.student_coin.api.dto.request.StudentRequest;
import com.student_coin.api.dto.response.TokenResponse;
import com.student_coin.api.service.EnterpriseService;
import com.student_coin.api.service.PersonService;
import com.student_coin.api.service.StudentService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@AllArgsConstructor
public class AuthController {
    private StudentService studentService;
    private EnterpriseService enterpriseService;
    private PersonService personService;

    @PostMapping
    public ResponseEntity<?> registerEnterprise(@Valid @RequestBody JsonNode data) {
        ObjectMapper obj = new ObjectMapper();
        if(data.has("cpf")) {
            StudentRequest request = obj.convertValue(data, StudentRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(studentService.register(request));
        }
        else {
            EnterpriseRequest request = obj.convertValue(data, EnterpriseRequest.class);
            return ResponseEntity.status(HttpStatus.CREATED).body(enterpriseService.register(request));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> login(@Valid @RequestBody LoginRequest loginData) {
        return ResponseEntity.status(HttpStatus.OK).body(personService.login(loginData));
    }
}
