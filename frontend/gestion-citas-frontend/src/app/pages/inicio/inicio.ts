import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio implements OnInit {
  usuario: Usuario | null = null;
  fechaActual: string = '';
  turnos: any[] = [];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

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
  }

  irSolicitarTurno(): void {
    this.router.navigate(['/solicitar-turno']);
  }
}