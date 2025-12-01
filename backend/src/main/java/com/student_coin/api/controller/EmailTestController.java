package com.student_coin.api.controller;

import com.student_coin.api.service.EmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/test/email")
@AllArgsConstructor
public class EmailTestController {
    private final EmailService emailService;


    @GetMapping("/welcome")
    public ResponseEntity<String> testWelcomeEmail(
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String role) {

        emailService.sendWelcomeEmail(email, name, role);
        return ResponseEntity.ok("Email de boas-vindas enviado para: " + email);
    }

    @GetMapping("/coins-received")
    public ResponseEntity<String> testCoinsReceivedEmail(
            @RequestParam String email,
            @RequestParam String studentName,
            @RequestParam int amount,
            @RequestParam String teacherName,
            @RequestParam String reason,
            @RequestParam String category) {

        emailService.sendCoinsReceivedEmail(email, studentName, amount, teacherName, reason, category);
        return ResponseEntity.ok("Email de moedas recebidas enviado para: " + email);
    }

    @GetMapping("/coins-sent")
    public ResponseEntity<String> testCoinsSentEmail(
            @RequestParam String email,
            @RequestParam String teacherName,
            @RequestParam String studentName,
            @RequestParam int amount,
            @RequestParam int newBalance) {

        emailService.sendCoinsSentEmail(email, teacherName, studentName, amount, newBalance);
        return ResponseEntity.ok("Email de confirmação enviado para: " + email);
    }

    @GetMapping("/password-reset")
    public ResponseEntity<String> testPasswordResetEmail(
            @RequestParam String email,
            @RequestParam String name,
            @RequestParam String token) {

        emailService.sendPasswordResetEmail(email, name, token);
        return ResponseEntity.ok("Email de recuperação de senha enviado para: " + email);
    }

    @PostMapping("/send")
    public ResponseEntity<String> testGenericEmail(@RequestBody EmailTestRequest request) {
        emailService.sendEmailAsync(
                request.to(),
                request.subject(),
                request.templateName(),
                request.variables()
        );
        return ResponseEntity.ok("Email genérico enviado para: " + request.to());
    }

    private record EmailTestRequest(
            String to,
            String subject,
            String templateName,
            Map<String, Object> variables
    ) {}
}
