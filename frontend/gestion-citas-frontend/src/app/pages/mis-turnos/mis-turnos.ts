import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoStoreService } from '../../services/turno-store';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css']
})
export class MisTurnos implements OnInit {

  turnos:any[] = [];
  proximos:any[] = [];
  historial:any[] = [];

  constructor(
    private turnoService: TurnoStoreService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ){}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos(){

    console.log("Cargando turnos...");

    this.turnoService.obtenerTurnos().subscribe({

      next:(data:any)=>{

        console.log("TURNOS:",data);

        this.turnos = data || [];

        this.proximos = this.turnos.filter(
          (t:any)=> t.estado === 'PENDIENTE'
        );

        this.historial = this.turnos.filter(
          (t:any)=> t.estado !== 'PENDIENTE'
        );

        console.log("PROXIMOS:",this.proximos);
        console.log("HISTORIAL:",this.historial);

        
        this.cdr.detectChanges();

      },

      error:(err)=>{
        console.error("ERROR:",err);
      }

    });

  }

}