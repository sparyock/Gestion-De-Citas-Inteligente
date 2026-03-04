package com.citas.turnos_service.controller;

import com.citas.turnos_service.dto.TurnoRequestDTO;
import com.citas.turnos_service.model.Turno;
import com.citas.turnos_service.service.TurnoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turnos")
public class TurnoController {

    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    // Crear turno
    @PostMapping
    public Turno crearTurno(@RequestBody TurnoRequestDTO dto) {
        return turnoService.crearTurno(dto);
    }

    // Ver todos los turnos
    @GetMapping
    public List<Turno> obtenerTodosTurnos() {
        return turnoService.obtenerTodosTurnos();
    }

    // Ver turno por ID
    @GetMapping("/{idTurno}")
    public Turno obtenerTurno(@PathVariable Long idTurno) {
        return turnoService.obtenerTurnoPorId(idTurno);
    }

    // Ver turnos por usuario
    @GetMapping("/usuario/{idUsuario}")
    public List<Turno> obtenerTurnosUsuario(@PathVariable Long idUsuario) {
        return turnoService.obtenerTurnosUsuario(idUsuario);
    }

    // Cancelar turno
    @PutMapping("/cancelar/{idTurno}")
    public Turno cancelarTurno(@PathVariable Long idTurno) {
        return turnoService.cancelarTurno(idTurno);
    }

    // Especialidades disponibles
    @GetMapping("/especialidades")
    public List<String> obtenerEspecialidades() {
        return turnoService.obtenerEspecialidades();
    }

    // Doctores disponibles
    @GetMapping("/doctores")
    public List<String> obtenerDoctores() {
        return turnoService.obtenerDoctores();
    }

    // Doctores por especialidad
    @GetMapping("/doctores/{especialidad}")
    public List<String> obtenerDoctoresPorEspecialidad(@PathVariable String especialidad) {
        return turnoService.obtenerDoctoresPorEspecialidad(especialidad);
    }

    // Horarios disponibles
    @GetMapping("/horarios/{doctor}")
    public List<String> obtenerHorarios(@PathVariable String doctor) {
        return turnoService.obtenerHorariosDisponibles(doctor);
    }

}