package com.zooflix.be_zooflix.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsMvcConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry corsRegistry) {

        // 모든 컨트롤러 경로에 대해 3000 포트 허용.
        corsRegistry.addMapping("/**")
                .allowedOrigins("*");
//        .allowedOrigins("http://localhost:3000");
    }
}
