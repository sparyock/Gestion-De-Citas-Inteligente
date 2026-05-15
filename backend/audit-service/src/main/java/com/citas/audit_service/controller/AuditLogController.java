package com.citas.audit_service.controller;

import com.citas.audit_service.dto.AuditRequestDTO;
import com.citas.audit_service.model.AuditLog;
import com.citas.audit_service.service.AuditLogService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/audit")
public class AuditLogController {

    private final AuditLogService auditLogService;

    public AuditLogController(AuditLogService auditLogService) {
        this.auditLogService = auditLogService;
    }

    @PostMapping
    public ResponseEntity<AuditLog> crearRegistro(@Valid @RequestBody AuditRequestDTO dto) {
        AuditLog auditLog = auditLogService.crearRegistro(dto);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(auditLog);
    }

    @GetMapping
    public ResponseEntity<List<AuditLog>> obtenerTodos() {
        return ResponseEntity.ok(auditLogService.obtenerTodos());
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<AuditLog>> obtenerPorUsuario(@PathVariable Long idUsuario) {
        return ResponseEntity.ok(auditLogService.obtenerPorUsuario(idUsuario));
    }

    @GetMapping("/accion/{accion}")
    public ResponseEntity<List<AuditLog>> obtenerPorAccion(@PathVariable String accion) {
        return ResponseEntity.ok(auditLogService.obtenerPorAccion(accion));
    }

    @GetMapping("/servicio/{servicioOrigen}")
    public ResponseEntity<List<AuditLog>> obtenerPorServicio(@PathVariable String servicioOrigen) {
        return ResponseEntity.ok(auditLogService.obtenerPorServicio(servicioOrigen));
    }

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> obtenerEstadisticas() {
        Map<String, Object> respuesta = new LinkedHashMap<>();
        respuesta.put("totalRegistros", auditLogService.contarRegistros());
        respuesta.put("servicio", "audit-service");
        respuesta.put("baseDatos", "MongoDB");

        return ResponseEntity.ok(respuesta);
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> health() {
        Map<String, String> respuesta = new LinkedHashMap<>();
        respuesta.put("status", "OK");
        respuesta.put("service", "audit-service");
        respuesta.put("database", "MongoDB");

        return ResponseEntity.ok(respuesta);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarRegistro(@PathVariable String id) {
        auditLogService.eliminarRegistro(id);
        return ResponseEntity.noContent().build();
    }
}
