package com.student_coin.api.mapper;

import com.student_coin.api.dto.request.StudentRequest;
import com.student_coin.api.entity.Student;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-10-27T16:41:18+0000",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.8 (Eclipse Adoptium)"
)
@Component
public class UpdateStudentMapperImpl implements UpdateStudentMapper {

    @Override
    public void updateStudentFromRequest(StudentRequest request, Student student) {
        if ( request == null ) {
            return;
        }

        if ( request.name() != null ) {
            student.setName( request.name() );
        }
        if ( request.password() != null ) {
            student.setPassword( request.password() );
        }
        if ( request.email() != null ) {
            student.setEmail( request.email() );
        }
        if ( request.cpf() != null ) {
            student.setCpf( request.cpf() );
        }
        if ( request.educationalInstitute() != null ) {
            student.setEducationalInstitute( request.educationalInstitute() );
        }
        if ( request.rg() != null ) {
            student.setRg( request.rg() );
        }
        if ( request.course() != null ) {
            student.setCourse( request.course() );
        }
        if ( request.address() != null ) {
            student.setAddress( request.address() );
        }
    }
}
