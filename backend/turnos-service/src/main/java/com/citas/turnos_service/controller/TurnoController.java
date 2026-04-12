package com.citas.turnos_service.controller;

import com.citas.turnos_service.dto.TurnoRequestDTO;
import com.citas.turnos_service.model.Turno;
import com.citas.turnos_service.service.TurnoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/turnos")
public class TurnoController {

    private final TurnoService turnoService;

    public TurnoController(TurnoService turnoService) {
        this.turnoService = turnoService;
    }

    @GetMapping
    public ResponseEntity<List<Turno>> listarTurnos() {
        return ResponseEntity.ok(turnoService.listarTurnos());
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<Turno>> listarTurnosPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(turnoService.listarTurnosPorUsuario(idUsuario));
    }

    @PostMapping
    public ResponseEntity<Turno> crearTurno(@Valid @RequestBody TurnoRequestDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(turnoService.crearTurno(dto));
    }

    @PutMapping("/{id}/cancelar")
    public ResponseEntity<Turno> cancelarTurno(@PathVariable Long id) {
        return ResponseEntity.ok(turnoService.cancelarTurno(id));
    }
}