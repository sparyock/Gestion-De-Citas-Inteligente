package com.citas.turnos_service.service;

import com.citas.turnos_service.dto.TurnoRequestDTO;
import com.citas.turnos_service.model.EstadoTurno;
import com.citas.turnos_service.model.Turno;
import com.citas.turnos_service.repository.TurnoRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TurnoService {

    private final TurnoRepository turnoRepository;

    public TurnoService(TurnoRepository turnoRepository) {
        this.turnoRepository = turnoRepository;
    }

    // Crear turno desde DTO
    public Turno crearTurno(TurnoRequestDTO dto) {

        Turno turno = new Turno();

        turno.setIdUsuario(dto.getIdUsuario());
        turno.setEspecialidad(dto.getEspecialidad());
        turno.setDoctor(dto.getDoctor());
        turno.setFechaHora(dto.getFechaHora());

        turno.setEstado(EstadoTurno.PENDIENTE);
        turno.setFechaCreacion(LocalDateTime.now());

        return turnoRepository.save(turno);
    }

    // Ver todos los turnos
    public List<Turno> obtenerTodosTurnos() {
        return turnoRepository.findAll();
    }

    // Ver turno por ID
    public Turno obtenerTurnoPorId(Long id) {
    return turnoRepository.findById(id).orElse(null);
}

    // Ver turnos por usuario
    public List<Turno> obtenerTurnosUsuario(Long idUsuario) {
        return turnoRepository.findByIdUsuario(idUsuario);
    }

    // ACTUALIZAR turno
    public Turno actualizarTurno(Long idTurno, TurnoRequestDTO dto) {

        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        turno.setIdUsuario(dto.getIdUsuario());
        turno.setEspecialidad(dto.getEspecialidad());
        turno.setDoctor(dto.getDoctor());
        turno.setFechaHora(dto.getFechaHora());

        return turnoRepository.save(turno);
    }

    // Cancelar turno
    public Turno cancelarTurno(Long idTurno) {

        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        turno.setEstado(EstadoTurno.CANCELADO);

        return turnoRepository.save(turno);
    }

    // ELIMINAR turno
    public void eliminarTurno(Long idTurno) {

        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        turnoRepository.delete(turno);
    }

    // Especialidades disponibles
    public List<String> obtenerEspecialidades() {
        return List.of(
                "Medicina General",
                "Cardiologia",
                "Dermatologia",
                "Pediatria",
                "Traumatologia",
                "Oftalmologia"
        );
    }

    // Todos los doctores disponibles
    public List<String> obtenerDoctores() {
        return List.of(
                "Dr. Andrés Muñoz",
                "Dra. Laura Soto",
                "Dr. Felipe Ruiz",
                "Dra. Camila Torres"
        );
    }

    // Doctores por especialidad
    public List<String> obtenerDoctoresPorEspecialidad(String especialidad) {

        switch (especialidad.toLowerCase()) {

            case "medicina general":
                return List.of("Dr. Andrés Muñoz", "Dra. Laura Soto");

            case "cardiologia":
                return List.of("Dr. Felipe Ruiz", "Dra. Laura Soto");

            case "dermatologia":
                return List.of("Dr. Felipe Ruiz");

            case "pediatria":
                return List.of("Dra. Camila Torres");

            default:
                return List.of();
        }
    }

    // Horarios disponibles
    public List<String> obtenerHorariosDisponibles(String doctor) {

        return List.of(
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "14:00",
                "15:00",
                "16:00"
        );
    }
}