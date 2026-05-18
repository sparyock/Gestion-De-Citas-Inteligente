import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, timeout } from 'rxjs';
import { API_GATEWAY_URL } from '../config/api.config';

export interface AuditRequest {
  idUsuario?: number;
  accion: string;
  descripcion: string;
  servicioOrigen: string;
  recurso?: string;
  idRecurso?: string;
}

export interface AuditLog {
  id?: string;
  idUsuario: number;
  accion: string;
  descripcion: string;
  servicioOrigen: string;
  recurso: string;
  idRecurso?: string;
  fechaCreacion?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = `${API_GATEWAY_URL}/audit`;

  constructor(private http: HttpClient) {}

  registrar(evento: AuditRequest): Observable<unknown> {
    return this.http.post(this.apiUrl, evento).pipe(
      timeout(5000),
      catchError((err) => {
        console.warn('Audit no registrado:', err);
        return of(null);
      })
    );
  }

  obtenerPorUsuario(idUsuario: number): Observable<AuditLog[]> {
    return this.http.get<AuditLog[]>(`${this.apiUrl}/usuario/${idUsuario}`).pipe(timeout(8000));
  }
}
