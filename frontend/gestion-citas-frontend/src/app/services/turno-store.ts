import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TurnoStoreService {

  private apiUrl = 'http://localhost:8080/turnos';

  constructor(private http: HttpClient) {}

  obtenerTurnos(): Observable<any> {
  return this.http.get(this.apiUrl);
}

  crearTurno(turno: any): Observable<any> {
    return this.http.post(this.apiUrl, turno);
  }

  cancelarTurno(idTurno:number): Observable<any>{
    return this.http.put(this.apiUrl + '/cancelar/' + idTurno, {});
  }

}