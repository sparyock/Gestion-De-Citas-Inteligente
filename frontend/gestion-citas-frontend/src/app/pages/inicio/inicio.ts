import { Component, OnInit, ChangeDetectorRef, inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { UsuarioService, Usuario } from '../../services/usuario.service';
import { Turno, TurnoStoreService } from '../../services/turno-store';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  usuario: Usuario | null = null;
  fechaActual = '';
  proximos: Turno[] = [];
  recientes: Turno[] = [];
  cargandoTurnos = false;
  errorTurnos = '';

  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private turnoService: TurnoStoreService
  ) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe(() => {
        if (this.router.url === '/inicio' && isPlatformBrowser(this.platformId)) {
          this.usuario = this.usuarioService.obtenerSesion();
          this.cargarTurnos();
        }
      });
  }

  ngOnInit(): void {
    const hoy = new Date();
    this.fechaActual = hoy.toLocaleDateString('es-ES', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    this.usuario = this.usuarioService.obtenerSesion();
    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }

    if (isPlatformBrowser(this.platformId)) {
      this.cargarTurnos();
    }
  }

  cargarTurnos(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.usuario = this.usuarioService.obtenerSesion();
    if (!this.usuario?.id) {
      this.errorTurnos = 'Sesión inválida. Vuelve a iniciar sesión.';
      this.cargandoTurnos = false;
      this.cdr.detectChanges();
      return;
    }

    this.cargandoTurnos = true;
    this.errorTurnos = '';

    this.turnoService.obtenerTurnos(Number(this.usuario.id)).subscribe({
      next: (turnos) => {
        const ordenados = [...(turnos ?? [])].sort(
          (a, b) => new Date(b.fechaHora).getTime() - new Date(a.fechaHora).getTime()
        );

        this.proximos = ordenados.filter(
          (t) => t.estado === 'PENDIENTE' || t.estado === 'CONFIRMADO'
        );
        this.recientes = ordenados.slice(0, 5);
        this.cargandoTurnos = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error cargando turnos:', err);
        this.proximos = [];
        this.recientes = [];
        this.cargandoTurnos = false;
        this.errorTurnos = 'No se pudieron cargar los turnos. Verifica que el API Gateway esté activo.';
        this.cdr.detectChanges();
      }
    });
  }

  irSolicitarTurno(): void {
    this.router.navigate(['/solicitar-turno']);
  }

  claseEstado(estado: string): string {
    const e = estado?.toLowerCase();
    if (e === 'confirmado') return 'confirmado';
    if (e === 'cancelado') return 'cancelado';
    return 'pendiente';
  }
}
