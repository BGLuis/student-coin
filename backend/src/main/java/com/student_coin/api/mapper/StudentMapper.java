package com.student_coin.api.mapper;


import com.student_coin.api.dto.response.StudentResponse;
import com.student_coin.api.entity.Student;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface StudentMapper {

    StudentResponse toStudentResponse(Student student);
    List<StudentResponse> toStudentResponse(List<Student> students);

}
