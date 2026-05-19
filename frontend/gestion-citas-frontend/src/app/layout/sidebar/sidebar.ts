import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuditService } from '../../services/audit.service';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  constructor(
    private usuarioService: UsuarioService,
    private auditService: AuditService,
    private router: Router
  ) {}

  cerrarSesion(): void {
    const usuario = this.usuarioService.obtenerSesion();
    this.usuarioService.cerrarSesion();

    if (usuario?.id) {
      this.auditService
        .registrar({
          idUsuario: usuario.id,
          accion: 'SESION_CERRADA',
          descripcion: 'El usuario cerró sesión',
          servicioOrigen: 'frontend',
          recurso: 'users'
        })
        .subscribe();
    }

    this.router.navigate(['/login']);
  }
}
