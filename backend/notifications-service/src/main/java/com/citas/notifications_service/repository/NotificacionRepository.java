package com.citas.notifications_service.repository;

import com.citas.notifications_service.model.Notificacion;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NotificacionRepository extends JpaRepository<Notificacion, Long> {

    List<Notificacion> findByIdUsuario(Long idUsuario);
}