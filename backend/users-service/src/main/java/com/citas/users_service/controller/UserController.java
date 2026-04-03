package com.citas.users_service.controller;

import com.citas.users_service.dto.UserRequestDTO;
import com.citas.users_service.dto.UserResponseDTO;
import com.citas.users_service.service.UserService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    // Endpoint de prueba
    @GetMapping("/test")
    public String test() {
        return "Backend funcionando correctamente";
    }

    // 🔹 CREATE
    @PostMapping
    public ResponseEntity<UserResponseDTO> createUser(
            @Valid @RequestBody UserRequestDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(userService.create(request));
    }

    // 🔹 GET ALL
    @GetMapping
    public ResponseEntity<List<UserResponseDTO>> getAllUsers(){
        return ResponseEntity.ok(userService.findAll());
    }

    // 🔹 GET BY ID
    @GetMapping("/{id}")
    public ResponseEntity<UserResponseDTO> getUser(@PathVariable Long id){
        return ResponseEntity.ok(userService.findById(id));
    }

    // 🔹 UPDATE
    @PutMapping("/{id}")
    public ResponseEntity<UserResponseDTO> updateUser(
            @PathVariable Long id,
            @Valid @RequestBody UserRequestDTO request){

        return ResponseEntity.ok(userService.update(id, request));
    }

    // 🔹 DELETE
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.delete(id);
        return ResponseEntity.noContent().build();
    }

    // ADR-003: login movido a AuthController (/auth/login)
}