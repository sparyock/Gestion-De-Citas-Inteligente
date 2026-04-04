import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificacionesService, Notificacion } from '../../services/notificaciones';

type FiltroNotificacion = 'Todas' | 'Sin leer' | 'Confirmados' | 'Cancelados';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css',
})
export class Notificaciones {
  filtroActivo: FiltroNotificacion = 'Todas';

  constructor(private notificacionesService: NotificacionesService) {}

  get notificaciones(): Notificacion[] {
    return this.notificacionesService.obtenerNotificaciones();
  }

  get total(): number {
    return this.notificaciones.length;
  }

  get sinLeer(): number {
    return this.notificaciones.filter(n => !n.leida).length;
  }

  get confirmados(): number {
    return this.notificaciones.filter(n => n.tipo === 'confirmado').length;
  }

  get cancelados(): number {
    return this.notificaciones.filter(n => n.tipo === 'cancelado').length;
  }

  get notificacionesFiltradas(): Notificacion[] {
    if (this.filtroActivo === 'Confirmados') {
      return this.notificaciones.filter(n => n.tipo === 'confirmado');
    }

    if (this.filtroActivo === 'Cancelados') {
      return this.notificaciones.filter(n => n.tipo === 'cancelado');
    }

    if (this.filtroActivo === 'Sin leer') {
      return this.notificaciones.filter(n => !n.leida);
    }

    return this.notificaciones;
  }

  cambiarFiltro(filtro: FiltroNotificacion) {
    this.filtroActivo = filtro;
  }

  marcarTodasLeidas() {
    this.notificacionesService.marcarTodasLeidas();
    alert('Todas las notificaciones fueron marcadas como leídas');
  }

  simularEvento(tipo: 'confirmado' | 'cancelado' | 'reprogramado' | 'recordatorio') {
    let nuevaNotificacion: Notificacion;

    if (tipo === 'confirmado') {
      nuevaNotificacion = {
        titulo: 'Turno confirmado',
        descripcion: 'Dr. Juan Pérez · Medicina General · 25/03/2026 09:00',
        tiempo: 'Ahora',
        tipo: 'confirmado',
        leida: false
      };
    } else if (tipo === 'cancelado') {
      nuevaNotificacion = {
        titulo: 'Turno cancelado',
        descripcion: 'Dra. María López · Dermatología · 26/03/2026 11:00',
        tiempo: 'Ahora',
        tipo: 'cancelado',
        leida: false
      };
    } else if (tipo === 'reprogramado') {
      nuevaNotificacion = {
        titulo: 'Turno reprogramado',
        descripcion: 'Tu cita fue movida para el 27/03/2026 a las 03:00 PM',
        tiempo: 'Ahora',
        tipo: 'reprogramado',
        leida: false
      };
    } else {
      nuevaNotificacion = {
        titulo: 'Recordatorio de turno',
        descripcion: 'Tienes una cita mañana con Dra. Laura Soto · Cardiología',
        tiempo: 'Ahora',
        tipo: 'recordatorio',
        leida: false
      };
    }

    this.notificacionesService.agregarNotificacion(nuevaNotificacion);
    alert('Evento simulado correctamente en el frontend');
  }
}