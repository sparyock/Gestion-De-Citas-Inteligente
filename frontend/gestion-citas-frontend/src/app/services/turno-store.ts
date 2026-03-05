import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TurnoStoreService {

  turnos:any[] = [];

  agregarTurno(turno:any){
    this.turnos.push(turno);
  }

  obtenerTurnos(){
    return this.turnos;
  }

}