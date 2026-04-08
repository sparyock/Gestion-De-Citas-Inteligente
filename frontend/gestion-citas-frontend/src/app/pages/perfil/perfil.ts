import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usuario = this.usuarioService.obtenerSesion();

    if (!this.usuario) {
      this.router.navigate(['/login']);
      return;
    }
  }

  irAEditarPerfil(): void {
    this.router.navigate(['/editar-perfil']);
  }

  obtenerIniciales(nombre?: string): string {
    if (!nombre) return 'US';

    return nombre
      .split(' ')
      .map(parte => parte.charAt(0))
      .join('')
      .substring(0, 2)
      .toUpperCase();
  }
}