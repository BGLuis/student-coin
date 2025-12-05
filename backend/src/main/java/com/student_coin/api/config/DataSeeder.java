package com.student_coin.api.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.student_coin.api.entity.Account;
import com.student_coin.api.entity.Enterprise;
import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.enums.Roles;
import com.student_coin.api.repository.AccountRepository;
import com.student_coin.api.repository.EnterpriseRepository;
import com.student_coin.api.repository.StudentRepository;
import com.student_coin.api.repository.TeacherRepository;

import lombok.AllArgsConstructor;

@Component
@Profile("development")
@AllArgsConstructor
public class DataSeeder implements CommandLineRunner {
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final EnterpriseRepository enterpriseRepository;
    private final AccountRepository accountRepository;
    private final PasswordEncoder passwordEncoder;

    private final String mockStudentEmail = "student@mock.com";
    private final String mockTeacherEmail = "teacher@mock.com";
    private final String mockEnterpriseEmail = "
    @mock.com";

    private void mockStudent() {
        Account account = new Account();
        Student student = new Student();
        student.setName("Mock Aluno");
        student.setEmail(mockStudentEmail);
        student.setPassword(passwordEncoder.encode("12345678"));
        student.setCpf("12345678901");
        student.setRg("1234567");
        student.setCourse("Engenharia de Software");
        student.setAddress("Rua Fictícia, 123");
        student.setEducationalInstitute("PUC Minas");
        student.setRole(Roles.ROLE_STUDENT);
        student.setAccount(account);
        studentRepository.save(student);
    }

    private void mockTeacher() {
        Account account = new Account();
        account.setBalance(1000);

        Teacher teacher = new Teacher();
        teacher.setName("Mock Professor");
        teacher.setEmail(mockTeacherEmail);
        teacher.setPassword(passwordEncoder.encode("12345678"));
        teacher.setRole(Roles.ROLE_TEACHER);
        teacher.setAccount(account);
        teacherRepository.save(teacher);
    }

    private void mockEnterprise() {
        Account account = new Account();
        Enterprise enterprise = new Enterprise();
        enterprise.setName("Mock Empresa");
        enterprise.setEmail(mockEnterpriseEmail);
        enterprise.setPassword(passwordEncoder.encode("12345678"));
        enterprise.setCnpj("12345678000199");
        enterprise.setRole(Roles.ROLE_ENTERPRISE);
        enterprise.setAccount(account);
        enterpriseRepository.save(enterprise);
    }

    @Override
    public void run(String... args) throws Exception {
        if (this.enterpriseRepository.findByEmail(mockEnterpriseEmail).isEmpty())
            this.mockEnterprise();
        if (this.teacherRepository.findByEmail(mockTeacherEmail).isEmpty())
            this.mockTeacher();
        if (this.studentRepository.findByEmail(mockStudentEmail).isEmpty())
            this.mockStudent();
    }
}
