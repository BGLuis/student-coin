package com.student_coin.api.controller;


import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/enterprises")
public class EnterpriseController {

    @GetMapping("/{id}")
    public void findStudentByID(@PathVariable Long id) {

    }

    @GetMapping
    public void getAll() {

    }

    @PatchMapping("/{id}")
    public void update() {

    }

    @DeleteMapping()
    public void delete() {

    }
}
