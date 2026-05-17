import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { AuditService } from '../../services/audit.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  error: string = '';
  cargando: boolean = false;

  constructor(
    private usuarioService: UsuarioService,
    private auditService: AuditService,
    private router: Router
  ) {}

  async iniciarSesion(): Promise<void> {
    if (this.cargando) return;

    this.error = '';

    const email = this.email.trim().toLowerCase();
    const password = this.password.trim();

    if (!email || !password) {
      this.error = 'Debes completar el correo y la contraseña';
      return;
    }

    this.cargando = true;

    try {
      const usuario = await firstValueFrom(
        this.usuarioService.login({ email, password })
      );

      this.usuarioService.guardarSesion(usuario);
      this.auditService
        .registrar({
          idUsuario: usuario.id,
          accion: 'LOGIN',
          descripcion: `Inicio de sesión: ${usuario.email}`,
          servicioOrigen: 'frontend',
          recurso: 'users'
        })
        .subscribe();
      this.cargando = false;

      await this.router.navigate(['/inicio']);
    } catch (err) {
      console.error('Error en login:', err);
      this.error = 'Correo o contraseña incorrectos';
      this.cargando = false;
    }
  }
}