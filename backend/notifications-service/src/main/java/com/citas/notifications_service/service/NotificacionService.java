package com.citas.notifications_service.service;

import com.citas.notifications_service.dto.NotificacionRequestDTO;
import com.citas.notifications_service.model.Notificacion;
import com.citas.notifications_service.repository.NotificacionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class NotificacionService {

    private final NotificacionRepository notificacionRepository;

    public NotificacionService(NotificacionRepository notificacionRepository) {
        this.notificacionRepository = notificacionRepository;
    }

    public Notificacion crearNotificacion(NotificacionRequestDTO dto) {
        Notificacion notificacion = new Notificacion();
        notificacion.setIdUsuario(dto.getIdUsuario());
        notificacion.setTitulo(dto.getTitulo());
        notificacion.setMensaje(dto.getMensaje());
        notificacion.setTipo(dto.getTipo());
        notificacion.setLeida(false);

        return notificacionRepository.save(notificacion);
    }

    public List<Notificacion> obtenerTodas() {
        return notificacionRepository.findAll();
    }

    public List<Notificacion> obtenerPorUsuario(Long idUsuario) {
        return notificacionRepository.findByIdUsuario(idUsuario);
    }

    public Notificacion marcarComoLeida(Long id) {
        Notificacion notificacion = notificacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Notificación no encontrada"));

        notificacion.setLeida(true);

        return notificacionRepository.save(notificacion);
    }

    public void eliminarNotificacion(Long id) {
        notificacionRepository.deleteById(id);
    }
}