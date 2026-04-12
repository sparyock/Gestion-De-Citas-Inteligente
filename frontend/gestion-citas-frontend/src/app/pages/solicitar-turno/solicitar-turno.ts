import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitar-turno.html',
  styleUrls: ['./solicitar-turno.css']
})
export class SolicitarTurno {

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  paso = 1;
  guardando = false;
  turnoConfirmado = false;

  especialidadSeleccionada = '';
  doctorSeleccionado = '';
  fechaSeleccionada = '';
  horaSeleccionada = '';

  dias = [
    "2026-04-16",
    "2026-04-17",
    "2026-04-18",
    "2026-04-19",
    "2026-04-20",
    "2026-04-21",
    "2026-04-22"
  ];

  horarios = [
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "14:00",
    "15:00",
    "16:00"
  ];

  doctores: any = {
    "Medicina General": [
      { nombre: "Dr. Andrés Muñoz", experiencia: 12, rating: 4.9 },
      { nombre: "Dra. Laura Soto", experiencia: 8, rating: 4.7 }
    ],
    "Cardiología": [
      { nombre: "Dr. Felipe Ruiz", experiencia: 10, rating: 4.8 },
      { nombre: "Dra. Laura Soto", experiencia: 9, rating: 4.6 }
    ],
    "Dermatología": [
      { nombre: "Dr. Felipe Ruiz", experiencia: 12, rating: 4.5 }
    ],
    "Pediatría": [
      { nombre: "Dra. Camila Torres", experiencia: 7, rating: 4.9 }
    ]
  };

  seleccionarEspecialidad(nombre: string) {
    this.especialidadSeleccionada = nombre;
  }

  seleccionarDoctor(nombre: string) {
    this.doctorSeleccionado = nombre;
  }

  seleccionarFecha(d: string) {
    this.fechaSeleccionada = d;
  }

  seleccionarHora(h: string) {
    this.horaSeleccionada = h;
  }

  siguiente() {
    if (this.paso === 1 && this.especialidadSeleccionada) {
      this.paso = 2;
    } else if (this.paso === 2 && this.doctorSeleccionado) {
      this.paso = 3;
    } else if (this.paso === 3 && this.fechaSeleccionada && this.horaSeleccionada) {
      this.paso = 4;
    }
  }

  volver() {
    if (this.paso === 2) {
      this.paso = 1;
    } else if (this.paso === 3) {
      this.paso = 2;
    } else if (this.paso === 4) {
      this.paso = 3;
    }
  }

  confirmarTurno() {
    if (this.guardando) return;

    this.guardando = true;
    this.cdr.detectChanges();

    const nuevoTurno = {
      idUsuario: 1,
      especialidad: this.especialidadSeleccionada,
      doctor: this.doctorSeleccionado,
      fechaHora: `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`
    };

    console.log('Se ejecutó confirmarTurno');
    console.log('Turno a enviar:', nuevoTurno);

    this.turnoService.crearTurno(nuevoTurno).subscribe({
      next: (response: any) => {
        console.log('Turno guardado correctamente:', response);

        this.guardando = false;
        this.turnoConfirmado = true;
        this.cdr.detectChanges();

        alert('Cita confirmada correctamente');
        this.router.navigate(['/mis-turnos']);
      },
      error: (error: any) => {
        console.error('Error al guardar turno:', error);

        this.guardando = false;
        this.turnoConfirmado = false;
        this.cdr.detectChanges();

        alert('No se pudo guardar el turno');
      }
    });
  }

  volverInicio() {
    this.router.navigate(['/inicio']);
  }

  irAMisTurnos() {
    this.router.navigate(['/mis-turnos']);
  }

  resetFormulario() {
    this.paso = 1;
    this.guardando = false;
    this.turnoConfirmado = false;
    this.especialidadSeleccionada = '';
    this.doctorSeleccionado = '';
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.cdr.detectChanges();
  }
}