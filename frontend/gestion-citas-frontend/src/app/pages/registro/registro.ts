import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UsuarioService, RolUsuario } from '../../services/usuario.service';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  nombre: string = '';
  email: string = '';
  password: string = '';
  rol: RolUsuario = 'CLIENTE';
  error: string = '';
  mensaje: string = '';
  cargando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private auditService: AuditService,
    private router: Router
  ) {}

  registrarse(): void {
    if (this.cargando) return;

    this.error = '';
    this.mensaje = '';

    const nombre = this.nombre.trim();
    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!nombre || !email || !password) {
      this.error = 'Debes completar todos los campos';
      return;
    }

    this.cargando = true;

    this.usuarioService.registrar({
      nombre,
      email,
      password,
      rol: 'CLIENTE'
    }).subscribe({
      next: (usuario) => {
        this.usuarioService.guardarSesion(usuario);
        this.auditService
          .registrar({
            idUsuario: usuario.id,
            accion: 'REGISTRO',
            descripcion: `Usuario registrado: ${usuario.email}`,
            servicioOrigen: 'frontend',
            recurso: 'users'
          })
          .subscribe();
        this.cargando = false;
        this.router.navigate(['/inicio']);
      },
      error: (err) => {
        console.error('Error al registrar:', err);
        this.error = err?.error?.error || err?.error?.message || 'No se pudo registrar el usuario';
        this.cargando = false;
      }
    });
  }
}