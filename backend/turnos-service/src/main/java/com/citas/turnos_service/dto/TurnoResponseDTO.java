package com.citas.turnos_service.dto;

public class TurnoResponseDTO {

    private Long idTurno;
    private String especialidad;
    private String doctor;
    private String fechaHora;
    private String estado;

    public TurnoResponseDTO(Long idTurno, String especialidad,
                             String doctor, String fechaHora, String estado) {
        this.idTurno = idTurno;
        this.especialidad = especialidad;
        this.doctor = doctor;
        this.fechaHora = fechaHora;
        this.estado = estado;
    }

    public Long getIdTurno() { return idTurno; }
    public String getEspecialidad() { return especialidad; }
    public String getDoctor() { return doctor; }
    public String getFechaHora() { return fechaHora; }
    public String getEstado() { return estado; }
}