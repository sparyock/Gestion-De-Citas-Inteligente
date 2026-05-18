import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Notificacion, NotificacionesService } from '../../services/notificaciones';
import { UsuarioService } from '../../services/usuario.service';
import { AuditService } from '../../services/audit.service';

type FiltroNotificacion = 'Todas' | 'Sin leer' | 'Confirmados' | 'Cancelados';

@Component({
  selector: 'app-notificaciones',
  imports: [CommonModule],
  templateUrl: './notificaciones.html',
  styleUrl: './notificaciones.css'
})
export class Notificaciones implements OnInit {
  filtroActivo: FiltroNotificacion = 'Todas';
  lista: Notificacion[] = [];
  cargando = false;
  usuarioNombre = 'Usuario';

  constructor(
    private notificacionesService: NotificacionesService,
    private usuarioService: UsuarioService,
    private auditService: AuditService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario) {
      this.router.navigate(['/login']);
      return;
    }
    this.usuarioNombre = usuario.nombre;
    this.cargarNotificaciones(usuario.id);
  }

  cargarNotificaciones(idUsuario: number): void {
    this.cargando = true;
    this.notificacionesService.obtenerPorUsuario(idUsuario).subscribe({
      next: (data) => {
        this.lista = data;
        this.cargando = false;
      },
      error: () => {
        this.lista = [];
        this.cargando = false;
      }
    });
  }

  get total(): number {
    return this.lista.length;
  }

  get sinLeer(): number {
    return this.lista.filter((n) => !n.leida).length;
  }

  get confirmados(): number {
    return this.lista.filter((n) => n.tipo === 'confirmado').length;
  }

  get cancelados(): number {
    return this.lista.filter((n) => n.tipo === 'cancelado').length;
  }

  get notificacionesFiltradas(): Notificacion[] {
    if (this.filtroActivo === 'Confirmados') {
      return this.lista.filter((n) => n.tipo === 'confirmado');
    }
    if (this.filtroActivo === 'Cancelados') {
      return this.lista.filter((n) => n.tipo === 'cancelado');
    }
    if (this.filtroActivo === 'Sin leer') {
      return this.lista.filter((n) => !n.leida);
    }
    return this.lista;
  }

  cambiarFiltro(filtro: FiltroNotificacion): void {
    this.filtroActivo = filtro;
  }

  marcarTodasLeidas(): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario) return;

    const sinLeer = this.lista.filter((n) => !n.leida && n.id != null);
    if (sinLeer.length === 0) return;

    sinLeer.forEach((n) => {
      this.notificacionesService.marcarComoLeida(n.id!).subscribe({
        next: (actualizada) => {
          const idx = this.lista.findIndex((x) => x.id === actualizada.id);
          if (idx >= 0) this.lista[idx] = actualizada;
        }
      });
    });
  }

  crearEvento(tipo: 'confirmado' | 'cancelado' | 'reprogramado' | 'recordatorio'): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario) return;

    const payloads: Record<string, { titulo: string; mensaje: string }> = {
      confirmado: {
        titulo: 'Turno confirmado',
        mensaje: 'Tu cita fue registrada correctamente'
      },
      cancelado: {
        titulo: 'Turno cancelado',
        mensaje: 'Tu cita fue cancelada'
      },
      reprogramado: {
        titulo: 'Turno reprogramado',
        mensaje: 'Tu cita fue reprogramada'
      },
      recordatorio: {
        titulo: 'Recordatorio de turno',
        mensaje: 'Tienes una cita próxima'
      }
    };

    const payload = payloads[tipo];
    this.notificacionesService
      .crear({
        idUsuario: usuario.id,
        titulo: payload.titulo,
        mensaje: payload.mensaje,
        tipo
      })
      .subscribe({
        next: (n) => {
          this.lista = [n, ...this.lista];
          this.auditService
            .registrar({
              idUsuario: usuario.id,
              accion: 'CREAR_NOTIFICACION',
              descripcion: payload.titulo,
              servicioOrigen: 'frontend',
              recurso: 'notifications'
            })
            .subscribe();
        }
      });
  }
}
