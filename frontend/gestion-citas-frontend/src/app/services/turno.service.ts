import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/turnos`;

  listarTurnos() {
    return this.http.get<any[]>(this.apiUrl);
  }

  crearTurno(turno: any) {
    return this.http.post<any>(this.apiUrl, turno);
  }

  cancelarTurno(id: number) {
    return this.http.put<any>(`${this.apiUrl}/${id}/cancelar`, {});
  }
}