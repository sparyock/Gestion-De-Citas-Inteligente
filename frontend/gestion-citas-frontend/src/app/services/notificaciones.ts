import { Injectable } from '@angular/core';

export interface Notificacion {
  titulo: string;
  descripcion: string;
  tiempo: string;
  tipo: 'confirmado' | 'cancelado' | 'reprogramado' | 'recordatorio';
  leida: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificaciones: Notificacion[] = [
    {
      titulo: 'Turno confirmado',
      descripcion: 'Dr. Andrés Muñoz · Medicina General · 16/01/2026 10:00',
      tiempo: 'Hace 5 min',
      tipo: 'confirmado',
      leida: false
    },
    {
      titulo: 'Recordatorio de turno',
      descripcion: 'Mañana a las 10:00 con Dra. Laura Soto · Cardiología',
      tiempo: 'Hace 1 hora',
      tipo: 'recordatorio',
      leida: false
    },
    {
      titulo: 'Turno cancelado',
      descripcion: 'Dr. Felipe Ruiz · Dermatología · 05/10/2025 10:00',
      tiempo: 'Ayer',
      tipo: 'cancelado',
      leida: true
    }
  ];

  obtenerNotificaciones(): Notificacion[] {
    return this.notificaciones;
  }

  marcarTodasLeidas(): void {
    this.notificaciones = this.notificaciones.map(n => ({
      ...n,
      leida: true
    }));
  }

  agregarNotificacion(notificacion: Notificacion): void {
    this.notificaciones.unshift(notificacion);
  }
}