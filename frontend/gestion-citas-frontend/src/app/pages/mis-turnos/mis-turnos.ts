import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoStoreService } from '../../services/turno-store';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-turnos.html',
  styleUrl: './mis-turnos.css'
})
export class MisTurnos {

  turnos: any[] = [];

  constructor(
    private turnoStore: TurnoStoreService,
    private router: Router
  ) {
    this.turnos = this.turnoStore.obtenerTurnos();
  }

  volverInicio(){
    this.router.navigate(['/inicio']);
  }

  volverSolicitar(){
  this.router.navigate(['/solicitar-turno']);
}

}