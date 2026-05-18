import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
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

  private mapTurnoApi(data: any): Turno {
    return {
      idTurno: Number(data?.idTurno ?? data?.id ?? data?.id_turno ?? 0),
      idUsuario: Number(data?.idUsuario ?? data?.idUsuario ?? data?.id_usuario ?? 0),
      especialidad: data?.especialidad ?? data?.especialidad ?? '',
      doctor: data?.doctor ?? data?.doctor ?? '',
      fechaHora: data?.fechaHora ?? data?.fecha_hora ?? '',
      estado: (data?.estado ?? 'PENDIENTE').toString().toUpperCase() as EstadoTurno,
      fechaCreacion: data?.fechaCreacion ?? data?.fecha_creacion ?? ''
    };
  }

  private mapTurnosApi(data: any[]): Turno[] {
    return (data ?? []).map((item) => this.mapTurnoApi(item));
  }

  obtenerTurnos(idUsuario?: number): Observable<Turno[]> {
    const url = idUsuario != null ? `${this.apiUrl}/usuario/${idUsuario}` : this.apiUrl;
    return this.http.get<any[]>(url).pipe(timeout(8000), map((lista) => this.mapTurnosApi(lista)));
  }

  crearTurno(turno: TurnoRequest): Observable<Turno> {
    return this.http.post<any>(this.apiUrl, turno).pipe(timeout(8000), map((turno) => this.mapTurnoApi(turno)));
  }

  cancelarTurno(idTurno: number): Observable<Turno> {
    return this.http
      .put<any>(`${this.apiUrl}/cancelar/${idTurno}`, {})
      .pipe(timeout(8000), map((turno) => this.mapTurnoApi(turno)));
  }

  updateTurno(idTurno: number, dto: TurnoRequest): Observable<Turno> {
    return this.http
      .put<any>(`${this.apiUrl}/${idTurno}`, dto)
      .pipe(timeout(8000), map((turno) => this.mapTurnoApi(turno)));
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
