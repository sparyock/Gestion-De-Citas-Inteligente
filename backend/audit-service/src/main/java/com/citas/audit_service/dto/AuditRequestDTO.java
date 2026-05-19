package com.citas.audit_service.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.Map;

public class AuditRequestDTO {

    private Long idUsuario;

    @NotBlank(message = "La acción es obligatoria")
    private String accion;

    @NotBlank(message = "La descripción es obligatoria")
    private String descripcion;

    @NotBlank(message = "El servicio de origen es obligatorio")
    private String servicioOrigen;

    private String recurso;

    private String idRecurso;

    private Map<String, Object> metadata;

    public AuditRequestDTO() {
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

    public Map<String, Object> getMetadata() {
        return metadata;
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

    public void setMetadata(Map<String, Object> metadata) {
        this.metadata = metadata;
    }
}
