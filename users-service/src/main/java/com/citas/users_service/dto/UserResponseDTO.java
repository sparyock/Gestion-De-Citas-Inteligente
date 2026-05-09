package com.citas.users_service.dto;

import com.citas.users_service.model.Role;

public class UserResponseDTO {

    private Long id;
    private String nombre;
    private String email;
    private Role rol;

    public UserResponseDTO(Long id, String nombre, String email, Role rol) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.rol = rol;
    }

    public Long getId() {
        return id;
    }

    public String getNombre() {
        return nombre;
    }

    public String getEmail() {
        return email;
    }

    public Role getRol() {
        return rol;
    }
}