package com.contour;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.contour.*"})
public class BackendcontourApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendcontourApplication.class, args);
    }

}
