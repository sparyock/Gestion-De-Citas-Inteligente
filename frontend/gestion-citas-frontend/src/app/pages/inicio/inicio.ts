import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  nombreUsuario = "Carlos Rojas";
 fechaActual: string = '';
  turnos: any[] = [];


  ngOnInit() {

    const hoy = new Date();

    this.fechaActual = hoy.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

  }



  constructor(private router: Router){}

  irSolicitarTurno(){
    this.router.navigate(['/solicitar-turno']);
  }

}