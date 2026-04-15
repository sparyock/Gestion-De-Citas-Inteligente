import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService, Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-editar-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editar-perfil.html',
  styleUrl: './editar-perfil.css'
})
export class EditarPerfil implements OnInit {
  usuario: Usuario | null = null;

  nombre: string = '';
  email: string = '';
  rol: string = '';
  telefono: string = '';
  fechaNacimiento: string = '';
  documento: string = '';
  ciudad: string = '';

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

    this.nombre = this.usuario.nombre || '';
    this.email = this.usuario.email || '';
    this.rol = this.usuario.rol || '';
    this.telefono = this.usuario.telefono || '';
    this.fechaNacimiento = this.usuario.fechaNacimiento || '';
    this.documento = this.usuario.documento || '';
    this.ciudad = this.usuario.ciudad || '';
  }

  guardarCambios(): void {
    if (!this.usuario) return;

    const usuarioActualizado: Usuario = {
      ...this.usuario,
      nombre: this.nombre,
      email: this.email,
      telefono: this.telefono,
      fechaNacimiento: this.fechaNacimiento,
      documento: this.documento,
      ciudad: this.ciudad
    };

    this.usuarioService.guardarSesion(usuarioActualizado);
    this.router.navigate(['/perfil']);
  }

  cancelar(): void {
    this.router.navigate(['/perfil']);
  }
}