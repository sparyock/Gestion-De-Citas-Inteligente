import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TurnoStoreService } from '../../services/turno-store';
import { UsuarioService } from '../../services/usuario.service';
import { NotificacionesService } from '../../services/notificaciones';
import { AuditService } from '../../services/audit.service';

interface DiaOpcion {
  label: string;
  fecha: string;
}

@Component({
  selector: 'app-solicitar-turno',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './solicitar-turno.html',
  styleUrls: ['./solicitar-turno.css']
})
export class SolicitarTurno implements OnInit {
  paso = 1;
  turnoConfirmado = false;
  error = '';

  especialidadSeleccionada = '';
  doctorSeleccionado = '';
  fechaSeleccionada = '';
  horaSeleccionada = '';

  especialidades: string[] = [];
  doctoresLista: string[] = [];
  dias: DiaOpcion[] = [];
  horarios: string[] = [];

  constructor(
    private turnoStore: TurnoStoreService,
    private usuarioService: UsuarioService,
    private notificacionesService: NotificacionesService,
    private auditService: AuditService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.usuarioService.obtenerSesion()) {
      this.router.navigate(['/login']);
      return;
    }

    this.turnoStore.obtenerEspecialidades().subscribe({
      next: (lista) => (this.especialidades = lista),
      error: () =>
        (this.especialidades = [
          'Medicina General',
          'Cardiologia',
          'Dermatologia',
          'Pediatria'
        ])
    });

    this.generarDias();
  }

  get nombrePaciente(): string {
    return this.usuarioService.obtenerSesion()?.nombre ?? 'Paciente';
  }

  generarDias(): void {
    this.dias = [];
    const hoy = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(hoy);
      d.setDate(hoy.getDate() + i);
      this.dias.push({
        label: d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }),
        fecha: this.formatLocalDate(d)
      });
    }
  }

  private formatLocalDate(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private extraerMensajeError(err: unknown): string {
    const e = err as { error?: Record<string, string> | string; message?: string };
    if (e?.error && typeof e.error === 'object') {
      if (typeof e.error['error'] === 'string') return e.error['error'];
      const valores = Object.values(e.error);
      if (valores.length) return valores.join('. ');
    }
    if (typeof e?.error === 'string') return e.error;
    return e?.message ?? 'No se pudo confirmar la cita.';
  }

  iconoEspecialidad(esp: string): string {
    const key = esp.toLowerCase();
    if (key.includes('medicina')) return '🩺';
    if (key.includes('cardio')) return '❤️';
    if (key.includes('dermato')) return '🧴';
    if (key.includes('pediat')) return '👶';
    return '🏥';
  }

  seleccionarEspecialidad(nombre: string): void {
    this.especialidadSeleccionada = nombre;
    this.doctorSeleccionado = '';
    this.horarios = [];
    this.turnoStore.obtenerDoctoresPorEspecialidad(nombre).subscribe({
      next: (docs) => (this.doctoresLista = docs),
      error: () => (this.doctoresLista = [])
    });
  }

  seleccionarDoctor(nombre: string): void {
    this.doctorSeleccionado = nombre;
    this.turnoStore.obtenerHorarios(nombre).subscribe({
      next: (h) => (this.horarios = h),
      error: () => (this.horarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'])
    });
  }

  seleccionarFecha(dia: DiaOpcion): void {
    this.fechaSeleccionada = dia.fecha;
  }

  seleccionarHora(h: string): void {
    this.horaSeleccionada = h;
  }

  siguiente(): void {
    if (this.paso === 1 && this.especialidadSeleccionada) this.paso = 2;
    else if (this.paso === 2 && this.doctorSeleccionado) this.paso = 3;
    else if (this.paso === 3 && this.fechaSeleccionada && this.horaSeleccionada) this.paso = 4;
  }

  volver(): void {
    if (this.paso > 1) this.paso--;
  }

  confirmarTurno(): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario?.id) {
      this.error = 'Sesión inválida. Cierra sesión e inicia de nuevo.';
      return;
    }

    if (!this.fechaSeleccionada || !this.horaSeleccionada) {
      this.error = 'Selecciona fecha y hora antes de confirmar.';
      return;
    }

    this.error = '';
    const fechaHora = `${this.fechaSeleccionada}T${this.horaSeleccionada}:00`;

    this.turnoStore
      .crearTurno({
        idUsuario: Number(usuario.id),
        especialidad: this.especialidadSeleccionada,
        doctor: this.doctorSeleccionado,
        fechaHora
      })
      .subscribe({
        next: (turno) => {
          if (!turno?.idTurno) {
            this.error = 'El servidor no devolvió el turno creado. Revisa los logs del backend.';
            return;
          }

          this.turnoConfirmado = true;

          this.notificacionesService
            .crear({
              idUsuario: usuario.id,
              titulo: 'Turno confirmado',
              mensaje: `${turno.doctor} · ${turno.especialidad} · ${fechaHora}`,
              tipo: 'confirmado'
            })
            .subscribe();

          this.auditService
            .registrar({
              idUsuario: usuario.id,
              accion: 'CREAR_TURNO',
              descripcion: `Turno creado con ${turno.doctor}`,
              servicioOrigen: 'frontend',
              recurso: 'turnos',
              idRecurso: String(turno.idTurno)
            })
            .subscribe();
        },
        error: (err) => {
          console.error('Error crear turno:', err);
          const status = err?.status;
          if (status === 409) {
            this.error = 'Ese horario ya está ocupado. Selecciona otro horario.';
          } else if (status === 500) {
            this.error = 'Ese horario puede estar ocupado o hubo un problema al guardar el turno. Intenta con otro horario.';
          } else {
            this.error = this.extraerMensajeError(err);
          }
        }
      });
  }

  volverInicio(): void {
    this.router.navigate(['/inicio']);
  }

  resetFormulario(): void {
    this.paso = 1;
    this.especialidadSeleccionada = '';
    this.doctorSeleccionado = '';
    this.fechaSeleccionada = '';
    this.horaSeleccionada = '';
    this.turnoConfirmado = false;
    this.error = '';
  }
}
