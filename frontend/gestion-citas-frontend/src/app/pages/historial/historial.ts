import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuditService, AuditLog } from '../../services/audit.service';
import { formatDateOnly } from '../../utils/date.util';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historial.html',
  styleUrl: './historial.css'
})
export class Historial implements OnInit {
  registros: AuditLog[] = [];
  cargando = false;
  error = '';
  usuarioNombre = '';

  constructor(
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
    this.cargarHistorial(usuario.id);
  }

  cargarHistorial(idUsuario: number): void {
    this.error = '';
    this.cargando = true;
    this.auditService.obtenerPorUsuario(idUsuario).subscribe({
      next: (data) => {
        this.registros = data || [];
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando historial:', err);
        this.registros = [];
        this.error = 'No se pudo cargar el historial de auditoría. Intenta nuevamente.';
        this.cargando = false;
      }
    });
  }

  actualizar(): void {
    const usuario = this.usuarioService.obtenerSesion();
    if (!usuario) return;
    this.cargarHistorial(usuario.id);
  }

  formatDateOnly = formatDateOnly;
}
