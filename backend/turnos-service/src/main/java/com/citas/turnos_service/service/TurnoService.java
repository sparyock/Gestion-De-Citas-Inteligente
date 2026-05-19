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

        boolean horarioOcupado = turnoRepository.existsByDoctorAndFechaHoraAndEstadoNot(
                dto.getDoctor(),
                dto.getFechaHora(),
                EstadoTurno.CANCELADO
        );

        if (horarioOcupado) {
            throw new RuntimeException("Este horario ya está ocupado para el doctor seleccionado.");
        }

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

    // Actualizar turno
    public Turno actualizarTurno(Long idTurno, TurnoRequestDTO dto) {

        Turno turno = turnoRepository.findById(idTurno)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado"));

        boolean cambioDoctorOFecha =
                !turno.getDoctor().equals(dto.getDoctor())
                        || !turno.getFechaHora().equals(dto.getFechaHora());

        if (cambioDoctorOFecha) {
            boolean horarioOcupado = turnoRepository.existsByDoctorAndFechaHoraAndEstadoNot(
                    dto.getDoctor(),
                    dto.getFechaHora(),
                    EstadoTurno.CANCELADO
            );

            if (horarioOcupado) {
                throw new RuntimeException("Este horario ya está ocupado para el doctor seleccionado.");
            }
        }

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

    // Eliminar turno
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
                "Dr. Andres Muñoz",
                "Dra. Laura Soto",
                "Dr. Felipe Ruiz",
                "Dra. Camila Torres",
                "Dr. Ricardo Salazar",
                "Dra. Valentina Castro"
        );
    }

    // Doctores por especialidad
    public List<String> obtenerDoctoresPorEspecialidad(String especialidad) {

        if (especialidad == null || especialidad.isBlank()) {
            return List.of();
        }

        return switch (especialidad.toLowerCase()) {

            case "medicina general" -> List.of(
                    "Dr. Andres Muñoz",
                    "Dra. Laura Soto"
            );

            case "cardiologia" -> List.of(
                    "Dr. Felipe Ruiz",
                    "Dra. Laura Soto"
            );

            case "dermatologia" -> List.of(
                    "Dr. Felipe Ruiz"
            );

            case "pediatria" -> List.of(
                    "Dra. Camila Torres"
            );

            case "traumatologia" -> List.of(
                    "Dr. Ricardo Salazar"
            );

            case "oftalmologia" -> List.of(
                    "Dra. Valentina Castro"
            );

            default -> List.of();
        };
    }

    // Horarios disponibles por doctor
    public List<String> obtenerHorariosDisponibles(String doctor) {

        if (doctor == null || doctor.isBlank()) {
            return List.of();
        }

        return switch (doctor.toLowerCase()) {

            case "dr. andres muñoz" -> List.of(
                    "08:00",
                    "09:00",
                    "10:00",
                    "14:00"
            );

            case "dra. laura soto" -> List.of(
                    "09:00",
                    "10:00",
                    "11:00",
                    "15:00"
            );

            case "dr. felipe ruiz" -> List.of(
                    "08:00",
                    "11:00",
                    "14:00",
                    "16:00"
            );

            case "dra. camila torres" -> List.of(
                    "10:00",
                    "11:00",
                    "15:00",
                    "16:00"
            );

            case "dr. ricardo salazar" -> List.of(
                    "08:00",
                    "09:00",
                    "14:00",
                    "15:00"
            );

            case "dra. valentina castro" -> List.of(
                    "09:00",
                    "10:00",
                    "15:00",
                    "16:00"
            );

            default -> List.of(
                    "08:00",
                    "09:00",
                    "10:00",
                    "11:00",
                    "14:00",
                    "15:00",
                    "16:00"
            );
        };
    }
}