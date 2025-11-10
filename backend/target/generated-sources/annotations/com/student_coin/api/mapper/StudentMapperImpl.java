package com.student_coin.api.mapper;

import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Student;
import com.student_coin.api.enums.Roles;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-27T16:41:18+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class StudentMapperImpl implements StudentMapper {

    @Override
    public StudentResponse toStudentResponse(Student student) {
        if ( student == null ) {
            return null;
        }

        Long id = null;
        String name = null;
        String cpf = null;
        String rg = null;
        String course = null;
        String address = null;
        String email = null;
        String educationalInstitute = null;

        id = student.getId();
        name = student.getName();
        cpf = student.getCpf();
        rg = student.getRg();
        course = student.getCourse();
        address = student.getAddress();
        email = student.getEmail();
        educationalInstitute = student.getEducationalInstitute();

        Roles roles = null;

        StudentResponse studentResponse = new StudentResponse( id, name, cpf, rg, course, address, email, educationalInstitute, roles );

        return studentResponse;
    }

    @Override
    public List<StudentResponse> toStudentResponse(List<Student> students) {
        if ( students == null ) {
            return null;
        }

        List<StudentResponse> list = new ArrayList<StudentResponse>( students.size() );
        for ( Student student : students ) {
            list.add( toStudentResponse( student ) );
        }

        return list;
    }
}
