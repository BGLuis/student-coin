package com.student_coin.api.entity;

import jakarta.persistence.Column;
import jakarta.persistence.MappedSuperclass;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public abstract class IndividualPerson extends Person {

    @NotNull
    @Column(unique = true)
    private String cpf;

    @NotNull
    @Column(unique = true)
    private String educationalInstitute;
}
