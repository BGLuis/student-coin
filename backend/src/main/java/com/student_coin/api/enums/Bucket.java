package com.student_coin.api.enums;

import lombok.Getter;

@Getter
public enum Bucket {
    ADVANTAGE_IMAGE("advantage-image");

    private final String name;

    Bucket(String name) {
        this.name = name;
    }
}
