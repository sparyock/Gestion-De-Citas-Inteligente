package com.citas.audit_service.service;

import com.citas.audit_service.dto.AuditRequestDTO;
import com.citas.audit_service.model.AuditLog;
import com.citas.audit_service.repository.AuditLogRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AuditLogService {

    private final AuditLogRepository auditLogRepository;

    public AuditLogService(AuditLogRepository auditLogRepository) {
        this.auditLogRepository = auditLogRepository;
    }

    public AuditLog crearRegistro(AuditRequestDTO dto) {
        AuditLog auditLog = new AuditLog();

        auditLog.setIdUsuario(dto.getIdUsuario());
        auditLog.setAccion(dto.getAccion());
        auditLog.setDescripcion(dto.getDescripcion());
        auditLog.setServicioOrigen(dto.getServicioOrigen());
        auditLog.setRecurso(dto.getRecurso());
        auditLog.setIdRecurso(dto.getIdRecurso());
        auditLog.setMetadata(dto.getMetadata());
        auditLog.setFechaCreacion(LocalDateTime.now());

        return auditLogRepository.save(auditLog);
    }

    public List<AuditLog> obtenerTodos() {
        return auditLogRepository.findAll()
                .stream()
                .sorted((a, b) -> b.getFechaCreacion().compareTo(a.getFechaCreacion()))
                .toList();
    }

    public List<AuditLog> obtenerPorUsuario(Long idUsuario) {
        return auditLogRepository.findByIdUsuarioOrderByFechaCreacionDesc(idUsuario);
    }

    public List<AuditLog> obtenerPorAccion(String accion) {
        return auditLogRepository.findByAccionOrderByFechaCreacionDesc(accion);
    }

    public List<AuditLog> obtenerPorServicio(String servicioOrigen) {
        return auditLogRepository.findByServicioOrigenOrderByFechaCreacionDesc(servicioOrigen);
    }

    public long contarRegistros() {
        return auditLogRepository.count();
    }

    public void eliminarRegistro(String id) {
        auditLogRepository.deleteById(id);
    }
}
