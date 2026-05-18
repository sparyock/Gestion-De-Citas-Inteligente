import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Turno, TurnoStoreService } from '../../services/turno-store';
import { UsuarioService } from '../../services/usuario.service';
import { NotificacionesService } from '../../services/notificaciones';
import { AuditService } from '../../services/audit.service';

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
      error: (err) => {
        console.error('ERROR:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
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

  claseEstado(estado: string): string {
    const e = estado?.toLowerCase();
    if (e === 'confirmado') return 'confirmado';
    if (e === 'cancelado') return 'cancelado';
    return 'pendiente';
  }
}
