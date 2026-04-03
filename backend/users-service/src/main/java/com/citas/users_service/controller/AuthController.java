package com.citas.users_service.controller;

import com.citas.users_service.dto.UserRequestDTO;
import com.citas.users_service.dto.UserResponseDTO;
import com.citas.users_service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    // ADR-003: login separado del CRUD de usuarios
    @PostMapping("/login")
    public ResponseEntity<UserResponseDTO> login(
            @Valid @RequestBody UserRequestDTO request) {

        return ResponseEntity.ok(
            userService.login(request.getEmail(), request.getPassword())
        );
    }
}