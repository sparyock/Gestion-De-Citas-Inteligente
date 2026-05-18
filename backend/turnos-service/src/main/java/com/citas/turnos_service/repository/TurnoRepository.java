package com.citas.turnos_service.repository;

import com.citas.turnos_service.model.EstadoTurno;
import com.citas.turnos_service.model.Turno;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TurnoRepository extends JpaRepository<Turno, Long> {

    List<Turno> findByIdUsuario(Long idUsuario);

    boolean existsByDoctorAndFechaHoraAndEstadoNot(
            String doctor,
            LocalDateTime fechaHora,
            EstadoTurno estado
    );
}