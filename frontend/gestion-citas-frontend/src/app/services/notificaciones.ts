import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { API_GATEWAY_URL } from '../config/api.config';
import { formatDateTime } from '../utils/date.util';

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
  id?: number;
  idUsuario?: number;
  id_usuario?: number;
  titulo: string;
  mensaje?: string;
  descripcion?: string;
  tipo: string;
  leida: boolean;
  fechaCreacion?: string;
  fecha_creacion?: string;
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

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(timeout(8000));
  }

  private mapFromApi(n: NotificacionApi): Notificacion {
    return {
      id: Number(n.id ?? n.idUsuario ?? n.id_usuario ?? 0),
      titulo: n.titulo ?? n.titulo ?? '',
      descripcion: n.mensaje ?? (n as any).descripcion ?? '',
      tiempo: formatDateTime(n.fechaCreacion ?? (n as any).fechaCreacion ?? (n as any).fecha_creacion ?? ''),
      tipo: this.normalizarTipo(n.tipo ?? ''),
      leida: Boolean(n.leida)
    };
  }

  private normalizarTipo(tipo: string): TipoNotificacion {
    const t = tipo.toLowerCase();
    if (t === 'confirmado' || t === 'cancelado' || t === 'reprogramado' || t === 'recordatorio') {
      return t;
    }
    return 'recordatorio';
  }

  // Usamos formatDateTime para consistencia. Si se requiere "hace X" se puede extender aquí.
}
