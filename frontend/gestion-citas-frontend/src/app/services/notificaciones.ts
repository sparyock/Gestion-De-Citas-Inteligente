import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { API_GATEWAY_URL } from '../config/api.config';

export type TipoNotificacion = 'confirmado' | 'cancelado' | 'reprogramado' | 'recordatorio';

export interface Notificacion {
  id?: number;
  titulo: string;
  descripcion: string;
  tiempo: string;
  tipo: TipoNotificacion;
  leida: boolean;
}

export interface NotificacionRequest {
  idUsuario: number;
  titulo: string;
  mensaje: string;
  tipo: string;
}

interface NotificacionApi {
  id: number;
  idUsuario: number;
  titulo: string;
  mensaje: string;
  tipo: string;
  leida: boolean;
  fechaCreacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = `${API_GATEWAY_URL}/notifications`;

  constructor(private http: HttpClient) {}

  obtenerPorUsuario(idUsuario: number): Observable<Notificacion[]> {
    return this.http
      .get<NotificacionApi[]>(`${this.apiUrl}/usuario/${idUsuario}`)
      .pipe(timeout(8000), map((lista) => lista.map((n) => this.mapFromApi(n))));
  }

  crear(dto: NotificacionRequest): Observable<Notificacion> {
    return this.http
      .post<NotificacionApi>(this.apiUrl, dto)
      .pipe(timeout(8000), map((n) => this.mapFromApi(n)));
  }

  marcarComoLeida(id: number): Observable<Notificacion> {
    return this.http
      .put<NotificacionApi>(`${this.apiUrl}/${id}/leida`, {})
      .pipe(timeout(8000), map((n) => this.mapFromApi(n)));
  }

  private mapFromApi(n: NotificacionApi): Notificacion {
    return {
      id: n.id,
      titulo: n.titulo,
      descripcion: n.mensaje,
      tiempo: this.formatearTiempo(n.fechaCreacion),
      tipo: this.normalizarTipo(n.tipo),
      leida: n.leida
    };
  }

  private normalizarTipo(tipo: string): TipoNotificacion {
    const t = tipo.toLowerCase();
    if (t === 'confirmado' || t === 'cancelado' || t === 'reprogramado' || t === 'recordatorio') {
      return t;
    }
    return 'recordatorio';
  }

  private formatearTiempo(fechaCreacion: string): string {
    const fecha = new Date(fechaCreacion);
    const diffMs = Date.now() - fecha.getTime();
    const minutos = Math.floor(diffMs / 60000);
    if (minutos < 1) return 'Ahora';
    if (minutos < 60) return `Hace ${minutos} min`;
    const horas = Math.floor(minutos / 60);
    if (horas < 24) return `Hace ${horas} h`;
    return fecha.toLocaleDateString('es-ES');
  }
}
