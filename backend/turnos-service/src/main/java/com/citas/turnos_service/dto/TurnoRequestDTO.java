package com.citas.turnos_service.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class TurnoRequestDTO {

    private Long idUsuario;
    private String especialidad;
    private String doctor;
    private LocalDateTime fechaHora;

}