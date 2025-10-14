package com.student_coin.api.service;

import com.student_coin.api.dto.LoginDTO;
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
        Optional<Student> student = studentRepository.findStudentByName(name);
        if (student.isPresent()) {
            return student.get();
        }
        Optional<Teacher> teacher = teacherRepository.findTeacherByName(name);
        if (teacher.isPresent()) {
            return teacher.get();
        }
        Optional<? extends UserDetails> enterprise = enterpriseRepository.findEnterpriseByName(name);
        if (enterprise.isPresent()) {
            return enterprise.get();
        }
        throw new UsernameNotFoundException("Usuário não encontrado com o nome: " + name);
    }

    public String login(@Valid LoginDTO login) {
        System.out.println("Service.");
        Person person = (Person) loadUserByUsername(login.name());
        System.out.println(person.getName());
        Map<String, Object> claims = new HashMap<>();
        claims.put("name", person.getName());
        System.out.println("tralalalala");
        Authentication authentication = authManager.authenticate(new UsernamePasswordAuthenticationToken(login.name(), login.password()));
        System.out.println("tralalalala2");
        System.out.println(authentication.isAuthenticated());
        System.out.println("tralalalala3");
        if(authentication.isAuthenticated()) {
            System.out.println("If do Service.");
            return jwtService.generateToken(login.name(), claims);
        }
        return "Failed";
    }
}
