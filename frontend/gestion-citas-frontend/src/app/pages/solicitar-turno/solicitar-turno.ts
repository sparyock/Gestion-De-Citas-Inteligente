import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoStoreService } from '../../services/turno-store';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitar-turno.html',
  styleUrls: ['./solicitar-turno.css']
})
export class SolicitarTurno {

 constructor(
  private turnoStore: TurnoStoreService,
  private router: Router
){}

  paso = 1;

  turnoConfirmado = false;
  especialidadSeleccionada = '';
  doctorSeleccionado = '';
  fechaSeleccionada = '';
  horaSeleccionada = '';

  dias = ["MIE 4","JUE 5","VIE 6","LUN 9","MAR 10","MIE 11","JUE 12"];

  horarios = ["08:00","09:00","10:00","11:00","12:00","14:00","15:00","16:00"];

  doctores:any = {

    "Medicina General":[
      {nombre:"Dr. Andrés Muñoz", experiencia:12, rating:4.9},
      {nombre:"Dra. Laura Soto", experiencia:8, rating:4.7},
      
    ],

    "Cardiología":[
      {nombre:"Dr. Felipe Ruiz", experiencia:10, rating:4.8},
      {nombre:"Dra. Laura Soto", experiencia:9, rating:4.6},
      
     
    ],

    "Dermatología":[
      {nombre:"Dr. Felipe Ruiz", experiencia:12, rating:4.5},
     
    ],

    "Pediatría":[
      {nombre:"Dra. Camila Torres", experiencia:7, rating:4.9},
      
    ]

  }

  seleccionarEspecialidad(nombre:string){
    this.especialidadSeleccionada = nombre;
  }

  seleccionarDoctor(nombre:string){
    this.doctorSeleccionado = nombre;
  }

  seleccionarFecha(d:string){
    this.fechaSeleccionada = d;
  }

  seleccionarHora(h:string){
    this.horaSeleccionada = h;
  }

  siguiente(){

    if(this.paso === 1 && this.especialidadSeleccionada){
      this.paso = 2;
    }

    else if(this.paso === 2 && this.doctorSeleccionado){
      this.paso = 3;
    }

    else if(this.paso === 3 && this.horaSeleccionada){
      this.paso = 4;
    }

  }

  volver(){

    if(this.paso === 2){
      this.paso = 1;
    }

    else if(this.paso === 3){
      this.paso = 2;
    }

    else if(this.paso === 4){
      this.paso = 3;
    }

  }

 confirmarTurno(){

  const nuevoTurno = {

    especialidad: this.especialidadSeleccionada,
    doctor: this.doctorSeleccionado,
    fecha: this.fechaSeleccionada,
    hora: this.horaSeleccionada,
    estado: "Confirmado"

  };

  this.turnoStore.crearTurno(nuevoTurno).subscribe();

  this.turnoConfirmado = true;

}
volverInicio(){
  this.router.navigate(['/inicio']);
}

resetFormulario(){

  this.paso = 1;
  this.especialidadSeleccionada = '';
  this.doctorSeleccionado = '';
  this.fechaSeleccionada = '';
  this.horaSeleccionada = '';

}
}