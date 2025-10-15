package com.student_coin.api.service;

import com.student_coin.api.dto.request.RegisterStudentRequest;
import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Student;
import com.student_coin.api.mapper.StudentMapper;
import com.student_coin.api.repository.StudentRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    @Lazy
    private PasswordEncoder encoder;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentMapper studentMapper;

    public StudentResponse register(@Valid RegisterStudentRequest register) {
        Student student = new Student();
        student.setName(register.name());
        student.setRg(register.rg());
        student.setCourse(register.course());
        student.setAddress(register.address());
        student.setEmail(register.email());
        student.setCpf(register.cpf());
        student.setEducationalInstitute(register.educationalInstitute());
        student.setPassword(encoder.encode(register.password()));
        Student data = studentRepository.save(student);
        return studentMapper.toStudentResponse(data);
    }
}
