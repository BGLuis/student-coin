package com.student_coin.api.service;

import com.student_coin.api.dto.RegisterDTO;
import com.student_coin.api.entity.Student;
import com.student_coin.api.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    @Lazy
    private PasswordEncoder encoder;

    @Autowired
    private StudentRepository studentRepository;

    public Student register(@Valid RegisterDTO register) {
        Student student = new Student();
        student.setName(register.name());
        student.setPassword(encoder.encode(register.password()));
        return studentRepository.save(student);
    }
}
