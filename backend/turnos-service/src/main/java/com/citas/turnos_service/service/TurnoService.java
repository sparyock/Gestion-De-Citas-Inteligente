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

    public List<Turno> listarTurnos() {
        return turnoRepository.findAll();
    }

    public List<Turno> listarTurnosPorUsuario(Long idUsuario) {
        return turnoRepository.findByIdUsuario(idUsuario);
    }

    public Turno crearTurno(TurnoRequestDTO dto) {
        Turno turno = new Turno();
        turno.setIdUsuario(dto.getIdUsuario());
        turno.setEspecialidad(dto.getEspecialidad());
        turno.setDoctor(dto.getDoctor());
        turno.setFechaHora(dto.getFechaHora());
        turno.setFechaCreacion(LocalDateTime.now());
        turno.setEstado(EstadoTurno.PENDIENTE);

        return turnoRepository.save(turno);
    }

    public Turno cancelarTurno(Long id) {
        Turno turno = turnoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Turno no encontrado con id: " + id));

        turno.setEstado(EstadoTurno.CANCELADO);

        return turnoRepository.save(turno);
    }
}