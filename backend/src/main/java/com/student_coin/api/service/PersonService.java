package com.student_coin.api.service;

import com.student_coin.api.dto.request.LoginRequest;
import com.student_coin.api.dto.response.TokenResponse;
import com.student_coin.api.entity.Person;
import com.student_coin.api.entity.Student;
import com.student_coin.api.entity.Teacher;
import com.student_coin.api.repository.EnterpriseRepository;
import com.student_coin.api.repository.StudentRepository;
import com.student_coin.api.repository.TeacherRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class PersonService implements UserDetailsService {


    @Autowired
    @Lazy
    private AuthenticationManager authManager;

    @Autowired
    @Lazy
    private JWTService jwtService;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private EnterpriseRepository enterpriseRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    @Override
    public UserDetails loadUserByUsername(String name) throws UsernameNotFoundException {
        Optional<Student> student = studentRepository.findStudentByEmail(name);
        if (student.isPresent()) {
            return student.get();
        }
        Optional<Teacher> teacher = teacherRepository.findTeacherByEmail(name);
        if (teacher.isPresent()) {
            return teacher.get();
        }
        Optional<? extends UserDetails> enterprise = enterpriseRepository.findEnterpriseByEmail(name);
        if (enterprise.isPresent()) {
            return enterprise.get();
        }
        throw new UsernameNotFoundException("Usuário não encontrado com o nome: " + name);
    }

    public TokenResponse login(@Valid LoginRequest login) {
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(login.email(), login.password()));
        Map<String, Object> claims = new HashMap<>();
        Person person = (Person) authentication.getPrincipal();
        claims.put("name", person.getName());
        claims.put("email", person.getEmail());
        claims.put("roles", person.getRole());

        return new TokenResponse(jwtService.generateToken(login.email(), claims));
    }
}
