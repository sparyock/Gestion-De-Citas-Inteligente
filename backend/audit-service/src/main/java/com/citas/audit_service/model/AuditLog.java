package com.citas.audit_service.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.Map;

@Document(collection = "audit_logs")
public class AuditLog {

    @Id
    private String id;

    private Long idUsuario;

    private String accion;

    private String descripcion;

    private String servicioOrigen;

    private String recurso;

    private String idRecurso;

    private LocalDateTime fechaCreacion;

    private Map<String, Object> metadata;

    public AuditLog() {
    }

    public String getId() {
        return id;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }

    public String getAccion() {
        return accion;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public String getServicioOrigen() {
        return servicioOrigen;
    }

    public String getRecurso() {
        return recurso;
    }

    public String getIdRecurso() {
        return idRecurso;
    }

    public LocalDateTime getFechaCreacion() {
        return fechaCreacion;
    }

    public Map<String, Object> getMetadata() {
        return metadata;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setIdUsuario(Long idUsuario) {
        this.idUsuario = idUsuario;
    }

    public void setAccion(String accion) {
        this.accion = accion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public void setServicioOrigen(String servicioOrigen) {
        this.servicioOrigen = servicioOrigen;
    }

    public void setRecurso(String recurso) {
        this.recurso = recurso;
    }

    public void setIdRecurso(String idRecurso) {
        this.idRecurso = idRecurso;
    }

    public void setFechaCreacion(LocalDateTime fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
