import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Turno, TurnoStoreService } from '../../services/turno-store';
import { UsuarioService } from '../../services/usuario.service';
import { NotificacionesService } from '../../services/notificaciones';
import { AuditService } from '../../services/audit.service';
import { formatDateTime } from '../../utils/date.util';

@Component({
  selector: 'app-mis-turnos',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './mis-turnos.html',
  styleUrls: ['./mis-turnos.css']
})
export class MisTurnos implements OnInit {
  turnos: Turno[] = [];
  proximos: Turno[] = [];
  historial: Turno[] = [];
  cargando = false;
  errorMensaje = '';
  editingId: number | null = null;
  operacionMensaje = '';
  operacionError = '';
  formatDateTime = formatDateTime;
  // Reprogramación
  reprogramDias: Array<{ label: string; fecha: string }> = [];
  reprogramHorarios: string[] = [];
  reprogramFechaSeleccionada = '';
  reprogramHoraSeleccionada = '';

  private cdr = inject(ChangeDetectorRef);

  constructor(
    private turnoService: TurnoStoreService,
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
    this.cargarTurnos();
  }

  cargarTurnos(): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario?.id) {
      this.router.navigate(['/login']);
      return;
    }

    this.cargando = true;
    this.turnoService.obtenerTurnos(Number(usuario.id)).subscribe({
      next: (data) => {
        this.turnos = data || [];
        this.proximos = this.turnos.filter(
          (t) => t.estado === 'PENDIENTE' || t.estado === 'CONFIRMADO'
        );
        this.historial = this.turnos.filter((t) => t.estado === 'CANCELADO');
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('ERROR:', err);
        this.errorMensaje = 'No se pudieron cargar tus turnos. Intenta actualizar.';
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

  actualizar(): void {
    this.errorMensaje = '';
    this.cargarTurnos();
  }

  cancelarTurno(turno: Turno): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario || !turno.idTurno) return;

    this.turnoService.cancelarTurno(turno.idTurno).subscribe({
      next: () => {
        this.notificacionesService
          .crear({
            idUsuario: usuario.id,
            titulo: 'Turno cancelado',
            mensaje: `${turno.doctor} · ${turno.especialidad}`,
            tipo: 'cancelado'
          })
          .subscribe();

        this.auditService
          .registrar({
            idUsuario: usuario.id,
            accion: 'CANCELAR_TURNO',
            descripcion: `Turno ${turno.idTurno} cancelado`,
            servicioOrigen: 'frontend',
            recurso: 'turnos',
            idRecurso: String(turno.idTurno)
          })
          .subscribe();

        this.cargarTurnos();
      },
      error: (err) => console.error('Error al cancelar:', err)
    });
  }

  iniciarReprogramar(turno: Turno): void {
    this.editingId = turno.idTurno;
    this.operacionMensaje = '';
    this.operacionError = '';
    this.reprogramFechaSeleccionada = '';
    this.reprogramHoraSeleccionada = '';
    this.reprogramHorarios = [];
    this.generarDiasReprogram();
    // Obtener horarios disponibles para el doctor
    this.turnoService.obtenerHorarios(turno.doctor).subscribe({
      next: (h) => (this.reprogramHorarios = h),
      error: () => (this.reprogramHorarios = ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00'])
    });
  }

  cancelarReprogramar(): void {
    this.editingId = null;
    this.operacionMensaje = '';
    this.operacionError = '';
  }

  guardarReprogramacion(turno: Turno): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario || !turno.idTurno) return;
    const fecha = this.reprogramFechaSeleccionada;
    const hora = this.reprogramHoraSeleccionada;
    if (!fecha) {
      this.operacionError = 'Selecciona una fecha.';
      return;
    }
    if (!hora) {
      this.operacionError = 'Selecciona un horario.';
      return;
    }

    const fechaHora = `${fecha}T${hora}:00`;
    const fechaObj = new Date(fechaHora);
    if (isNaN(fechaObj.getTime()) || fechaObj.getTime() < Date.now()) {
      this.operacionError = 'No puedes seleccionar una fecha pasada.';
      return;
    }

    const dto = {
      idUsuario: Number(usuario.id),
      especialidad: turno.especialidad,
      doctor: turno.doctor,
      fechaHora
    };

    this.turnoService.updateTurno(turno.idTurno, dto).subscribe({
      next: (actualizado) => {
        this.auditService.registrar({
          idUsuario: usuario.id,
          accion: 'TURNO_REPROGRAMADO',
          descripcion: `Turno ${turno.idTurno} reprogramado a ${fechaHora}`,
          servicioOrigen: 'frontend',
          recurso: 'turnos',
          idRecurso: String(turno.idTurno)
        }).subscribe();

        this.notificacionesService.crear({
          idUsuario: usuario.id,
          titulo: 'Turno reprogramado',
          mensaje: 'Tu turno fue reprogramado correctamente',
          tipo: 'REPROGRAMACION_TURNO'
        }).subscribe();

        this.operacionMensaje = 'Turno reprogramado correctamente.';
        this.editingId = null;
        this.reprogramFechaSeleccionada = '';
        this.reprogramHoraSeleccionada = '';
        this.cargarTurnos();
      },
      error: (err: any) => {
        console.error('Error reprogramando:', err);
        const status = err?.status;
        if (status === 409) {
          this.operacionError = 'Ese horario ya está ocupado. Selecciona otro horario.';
        } else if (status === 500) {
          this.operacionError = 'Ese horario puede estar ocupado o hubo un problema al guardar el turno. Intenta con otro horario.';
        } else {
          // fallback a mensaje detallado si existe
          const msg = (err?.error && typeof err.error === 'string' ? err.error : err?.message ?? '');
          this.operacionError = this.operacionError || msg || 'No se pudo reprogramar el turno. Intenta nuevamente.';
        }
      }
    });
  }

  private generarDiasReprogram(): void {
    this.reprogramDias = [];
    const hoy = new Date();
    for (let i = 1; i <= 7; i++) {
      const d = new Date(hoy);
      d.setDate(hoy.getDate() + i);
      const label = d.toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' });
      const fecha = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
      this.reprogramDias.push({ label, fecha });
    }
  }

  seleccionarFechaReprogram(fecha: string): void {
    this.reprogramFechaSeleccionada = fecha;
  }

  seleccionarHoraReprogram(h: string): void {
    this.reprogramHoraSeleccionada = h;
  }

  claseEstado(estado: string): string {
    const e = estado?.toLowerCase();
    if (e === 'confirmado') return 'confirmado';
    if (e === 'cancelado') return 'cancelado';
    return 'pendiente';
  }
}
