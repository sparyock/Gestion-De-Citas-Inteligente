package com.citas.turnos_service.controller;

<<<<<<< Updated upstream
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
=======
import com.citas.turnos_service.dto.TurnoRequestDTO;
import com.citas.turnos_service.dto.TurnoResponseDTO;
import com.citas.turnos_service.model.Turno;
import com.citas.turnos_service.service.TurnoService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
>>>>>>> Stashed changes

@RestController
@RequestMapping("/turnos")
public class TurnoController {

    @GetMapping("/test")
    public String test() {
        return "Turnos service funcionando";

    }
    @GetMapping("/")
public String home() {
    return "API Turnos funcionando";
}

<<<<<<< Updated upstream
}

=======
    // Crear turno — ADR-004: retorna TurnoResponseDTO
    @PostMapping
    public ResponseEntity<TurnoResponseDTO> crearTurno(@RequestBody TurnoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(turnoService.crearTurno(dto));
    }

    // Obtener todos los turnos
    @GetMapping
    public List<Turno> obtenerTodosTurnos() {
        return turnoService.obtenerTodosTurnos();
    }

    // Obtener turno por ID
    @GetMapping("/{idTurno}")
    public Turno obtenerTurno(@PathVariable Long idTurno) {
        return turnoService.obtenerTurnoPorId(idTurno);
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

    // Cancelar turno
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
>>>>>>> Stashed changes
