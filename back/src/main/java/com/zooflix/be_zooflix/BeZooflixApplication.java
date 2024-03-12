package com.zooflix.be_zooflix;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class BeZooflixApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeZooflixApplication.class, args);
    }

}
