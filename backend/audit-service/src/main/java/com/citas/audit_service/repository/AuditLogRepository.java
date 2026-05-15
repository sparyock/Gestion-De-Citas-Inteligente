package com.citas.audit_service.repository;

import com.citas.audit_service.model.AuditLog;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AuditLogRepository extends MongoRepository<AuditLog, String> {

    List<AuditLog> findByIdUsuarioOrderByFechaCreacionDesc(Long idUsuario);

    List<AuditLog> findByAccionOrderByFechaCreacionDesc(String accion);

    List<AuditLog> findByServicioOrigenOrderByFechaCreacionDesc(String servicioOrigen);
}
