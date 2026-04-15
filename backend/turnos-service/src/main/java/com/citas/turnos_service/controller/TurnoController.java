package com.citas.turnos_service.controller;

import com.citas.turnos_service.dto.TurnoRequestDTO;
import com.citas.turnos_service.model.Turno;
import com.citas.turnos_service.service.TurnoService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
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
public ResponseEntity<Turno> crearTurno(
        @Valid @RequestBody TurnoRequestDTO dto) {

    Turno turno = turnoService.crearTurno(dto);

    return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(turno);
}
    // Obtener todos los turnos
     @GetMapping
public ResponseEntity<List<Turno>> obtenerTodosTurnos(
        @RequestParam(required = false) Long idUsuario) {

    List<Turno> turnos;

    if (idUsuario != null) {
        turnos = turnoService.obtenerTurnosUsuario(idUsuario);
    } else {
        turnos = turnoService.obtenerTodosTurnos();
    }

    return ResponseEntity.ok(turnos);
}

    // Obtener turno por ID
    @GetMapping("/{id}")
    public ResponseEntity<Turno> obtenerTurnoPorId(@PathVariable Long id) {

    Turno turno = turnoService.obtenerTurnoPorId(id);
     if (turno == null) {
    return ResponseEntity.notFound().build();
    }
    return ResponseEntity.ok(turno);
    }

    // Obtener turnos por usuario
    @GetMapping("/usuario/{idUsuario}")
    public List<Turno> obtenerTurnosUsuario(@PathVariable Long idUsuario) {
        return turnoService.obtenerTurnosUsuario(idUsuario);
    }

    // Actualizar turno
    @PutMapping("/{idTurno}")
    public Turno actualizarTurno(@PathVariable Long idTurno, @RequestBody TurnoRequestDTO dto) {
        return turnoService.actualizarTurno(idTurno, dto);
    }

    // Cancelar turno (cambia estado a CANCELADO)
    @PutMapping("/cancelar/{idTurno}")
    public Turno cancelarTurno(@PathVariable Long idTurno) {
        return turnoService.cancelarTurno(idTurno);
    }

    // Eliminar turno
    @DeleteMapping("/{idTurno}")
    public void eliminarTurno(@PathVariable Long idTurno) {
        turnoService.eliminarTurno(idTurno);
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