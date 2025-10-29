package com.student_coin.api.service;

import com.student_coin.api.dto.request.StudentRequest;
import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Account;
import com.student_coin.api.entity.Student;
import com.student_coin.api.enums.Roles;
import com.student_coin.api.mapper.StudentMapper;
import com.student_coin.api.mapper.UpdateStudentMapper;
import com.student_coin.api.repository.AccountRepository;
import com.student_coin.api.repository.StudentRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class StudentService {
    @Lazy
    private PasswordEncoder encoder;

    private StudentRepository studentRepository;
    private AccountRepository accountRepository;
    private StudentMapper studentMapper;
    private UpdateStudentMapper updateStudentMapper;

    @Transactional
    public StudentResponse register(@Valid StudentRequest register) {
        Student student = new Student();
        student.setName(register.name());
        student.setRg(register.rg());
        student.setCourse(register.course());
        student.setAddress(register.address());
        student.setEmail(register.email());
        student.setCpf(register.cpf());
        student.setEducationalInstitute(register.educationalInstitute());
        student.setPassword(encoder.encode(register.password()));
        student.setRole(Roles.ROLE_STUDENT);

        Account account = this.accountRepository.save(new Account());
        student.setAccount(account);

        Student data = studentRepository.save(student);
        return studentMapper.toStudentResponse(data);
    }

    public Student findById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found"));
    }

    public List<StudentResponse> findAll() {
        return studentMapper.toStudentResponse(studentRepository.findAll());
    }

    public void delete() {
        studentRepository.delete((Student) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
    }

    public StudentResponse update(Student student, StudentRequest data) {
        updateStudentMapper.updateStudentFromRequest(data, student);
        if(data.password() != null) {
            student.setPassword(encoder.encode(data.password()));
        }
        studentRepository.save(student);
        return studentMapper.toStudentResponse(student);
    }
}
