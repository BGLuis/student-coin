package com.student_coin.api.service;

import com.student_coin.api.dto.LoginDTO;
import com.student_coin.api.dto.TokenDTO;
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
import org.springframework.security.authentication.BadCredentialsException;
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

    public TokenDTO login(@Valid LoginDTO login) {
        Person person = (Person) loadUserByUsername(login.email());
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", person.getName());
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(login.email(), login.password()));
        if(!authentication.isAuthenticated()) {
            throw new BadCredentialsException("Invalid credentials");
        }
        return new TokenDTO(jwtService.generateToken(login.email(), claims));
    }
}
