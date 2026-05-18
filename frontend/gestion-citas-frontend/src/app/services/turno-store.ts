import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';
import { API_GATEWAY_URL } from '../config/api.config';

export type EstadoTurno = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';

export interface Turno {
  idTurno: number;
  idUsuario: number;
  especialidad: string;
  doctor: string;
  fechaHora: string;
  estado: EstadoTurno;
  fechaCreacion?: string;
}

export interface TurnoRequest {
  idUsuario: number;
  especialidad: string;
  doctor: string;
  fechaHora: string;
}

@Injectable({
  providedIn: 'root'
})
export class TurnoStoreService {
  private apiUrl = `${API_GATEWAY_URL}/turnos`;

  constructor(private http: HttpClient) {}

  obtenerTurnos(idUsuario?: number): Observable<Turno[]> {
    const params = idUsuario != null ? new HttpParams().set('idUsuario', idUsuario) : undefined;
    return this.http.get<Turno[]>(this.apiUrl, { params }).pipe(timeout(8000));
  }

  crearTurno(turno: TurnoRequest): Observable<Turno> {
    return this.http.post<Turno>(this.apiUrl, turno).pipe(timeout(8000));
  }

  cancelarTurno(idTurno: number): Observable<Turno> {
    return this.http.put<Turno>(`${this.apiUrl}/cancelar/${idTurno}`, {}).pipe(timeout(8000));
  }

  obtenerEspecialidades(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/especialidades`).pipe(timeout(8000));
  }

  obtenerDoctoresPorEspecialidad(especialidad: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/doctores/${encodeURIComponent(especialidad)}`)
      .pipe(timeout(8000));
  }

  obtenerHorarios(doctor: string): Observable<string[]> {
    return this.http
      .get<string[]>(`${this.apiUrl}/horarios/${encodeURIComponent(doctor)}`)
      .pipe(timeout(8000));
  }
}
