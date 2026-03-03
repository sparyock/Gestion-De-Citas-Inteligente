package com.citas.users_service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable()) // 🔥 Desactiva CSRF (necesario para Postman)
            .authorizeHttpRequests(auth -> auth
                .anyRequest().permitAll() // Permite todas las rutas
            );

        return http.build();
    }
}