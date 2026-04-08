import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable, timeout } from 'rxjs';

export type RolUsuario = 'CLIENTE' | 'ADMIN';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  rol: RolUsuario;
  telefono?: string;
  fechaNacimiento?: string;
  documento?: string;
  ciudad?: string;
}

export interface RegistroUsuarioRequest {
  nombre: string;
  email: string;
  password: string;
  rol: RolUsuario;
  telefono?: string;
  fechaNacimiento?: string;
  documento?: string;
  ciudad?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8081/users';
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl).pipe(timeout(8000));
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`).pipe(timeout(8000));
  }

  registrar(usuario: RegistroUsuarioRequest): Observable<Usuario> {
    const body: RegistroUsuarioRequest = {
      nombre: usuario.nombre.trim(),
      email: usuario.email.trim().toLowerCase(),
      password: usuario.password.trim(),
      rol: usuario.rol,
      telefono: usuario.telefono ?? '',
      fechaNacimiento: usuario.fechaNacimiento ?? '',
      documento: usuario.documento ?? '',
      ciudad: usuario.ciudad ?? ''
    };

    return this.http.post<Usuario>(this.apiUrl, body).pipe(timeout(8000));
  }

  actualizarUsuario(id: number, usuario: RegistroUsuarioRequest): Observable<Usuario> {
    const body: RegistroUsuarioRequest = {
      nombre: usuario.nombre.trim(),
      email: usuario.email.trim().toLowerCase(),
      password: usuario.password.trim(),
      rol: usuario.rol,
      telefono: usuario.telefono ?? '',
      fechaNacimiento: usuario.fechaNacimiento ?? '',
      documento: usuario.documento ?? '',
      ciudad: usuario.ciudad ?? ''
    };

    return this.http.put<Usuario>(`${this.apiUrl}/${id}`, body).pipe(timeout(8000));
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(timeout(8000));
  }

  login(data: LoginRequest): Observable<Usuario> {
    const body: LoginRequest = {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim()
    };

    return this.http.post<Usuario>(`${this.apiUrl}/login`, body).pipe(timeout(8000));
  }

  guardarSesion(usuario: Usuario): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('usuario', JSON.stringify(usuario));
    }
  }

  obtenerSesion(): Usuario | null {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('usuario');
      return data ? JSON.parse(data) as Usuario : null;
    }
    return null;
  }

  cerrarSesion(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('usuario');
    }
  }

  estaLogueado(): boolean {
    return this.obtenerSesion() !== null;
  }
}