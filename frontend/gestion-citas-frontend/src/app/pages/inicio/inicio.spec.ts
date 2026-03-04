import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {

  constructor(private router: Router){}

  irSolicitarTurno(){
    this.router.navigate(['/solicitar-turno']);
  }

}
