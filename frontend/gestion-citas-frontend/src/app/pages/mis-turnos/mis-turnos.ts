import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoService } from '../../services/turno.service';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css']
})
export class MisTurnos implements OnInit {

  turnos: any[] = [];
  cargando = true;
  error = '';

  constructor(
    private turnoService: TurnoService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarTurnos();
  }

  cargarTurnos() {
    this.cargando = true;
    this.error = '';
    this.cdr.detectChanges();

    this.turnoService.listarTurnos().subscribe({
      next: (data: any[]) => {
        console.log('Turnos cargados:', data);
        this.turnos = data;
        this.cargando = false;
        this.error = '';
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al cargar turnos:', err);
        this.error = 'No se pudieron cargar los turnos';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  nuevoTurno() {
    this.router.navigate(['/solicitar-turno']);
  }

  cancelarTurno(id: number) {
    if (!confirm('¿Seguro que quieres cancelar este turno?')) {
      return;
    }

    this.turnoService.cancelarTurno(id).subscribe({
      next: (response: any) => {
        console.log('Turno cancelado correctamente:', response);
        alert('Turno cancelado correctamente');
        this.cargarTurnos();
      },
      error: (err: any) => {
        console.error('Error al cancelar turno:', err);
        alert('No se pudo cancelar el turno');
      }
    });
  }

  formatearFecha(fechaHora: string): string {
    if (!fechaHora) return '';

    const fecha = new Date(fechaHora);

    return fecha.toLocaleString('es-CO', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  esPendiente(estado: string): boolean {
    return estado === 'PENDIENTE';
  }

  esCancelado(estado: string): boolean {
    return estado === 'CANCELADO';
  }

  esConfirmado(estado: string): boolean {
    return estado === 'CONFIRMADO';
  }
}