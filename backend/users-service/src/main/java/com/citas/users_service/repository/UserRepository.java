package com.citas.users_service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import com.citas.users_service.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}