package com.citas.users_service.service;

import com.citas.users_service.dto.UserRequestDTO;
import com.citas.users_service.dto.UserResponseDTO;
import com.citas.users_service.model.User;
import com.citas.users_service.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // 🔹 CREATE
    public UserResponseDTO create(UserRequestDTO request) {

        User user = new User();
        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User saved = userRepository.save(user);

        return new UserResponseDTO(
                saved.getId(),
                saved.getNombre(),
                saved.getEmail()
        );
    }

    // 🔹 GET ALL
    public List<UserResponseDTO> findAll() {

        return userRepository.findAll()
                .stream()
                .map(user -> new UserResponseDTO(
                        user.getId(),
                        user.getNombre(),
                        user.getEmail()))
                .toList();
    }

    // 🔹 GET BY ID
    public UserResponseDTO findById(Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        return new UserResponseDTO(
                user.getId(),
                user.getNombre(),
                user.getEmail()
        );
    }

    // 🔹 UPDATE
    public UserResponseDTO update(Long id, UserRequestDTO request) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        user.setNombre(request.getNombre());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());

        User updated = userRepository.save(user);

        return new UserResponseDTO(
                updated.getId(),
                updated.getNombre(),
                updated.getEmail()
        );
    }

    // 🔹 DELETE
    public void delete(Long id) {

        if (!userRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }

        userRepository.deleteById(id);
    }

    // 🔹 LOGIN
    public UserResponseDTO login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Credenciales inválidas"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Credenciales inválidas");
        }

        return new UserResponseDTO(
                user.getId(),
                user.getNombre(),
                user.getEmail()
        );
    }
}