import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { map, Observable, timeout } from 'rxjs';
import { API_GATEWAY_URL } from '../config/api.config';

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
  private apiUrl = `${API_GATEWAY_URL}/users`;
  private platformId = inject(PLATFORM_ID);

  constructor(private http: HttpClient) {}

  private mapUsuarioApi(data: any): Usuario {
    const rolRaw = (data?.rol ?? data?.role ?? 'CLIENTE').toString().toUpperCase();
    const rol = rolRaw === 'ADMIN' ? 'ADMIN' : 'CLIENTE';

    return {
      id: Number(data?.id ?? data?.idUsuario ?? data?.id_usuario ?? data?.ID ?? 0),
      nombre: data?.nombre ?? data?.name ?? '',
      email: data?.email ?? data?.correo ?? data?.correoElectronico ?? data?.correo_electronico ?? '',
      rol,
      telefono: data?.telefono ?? data?.phone ?? '',
      fechaNacimiento: data?.fechaNacimiento ?? data?.fecha_nacimiento ?? '',
      documento: data?.documento ?? data?.documento ?? '',
      ciudad: data?.ciudad ?? data?.city ?? ''
    };
  }

  private mapUsuariosApi(data: any[]): Usuario[] {
    return (data ?? []).map((item) => this.mapUsuarioApi(item));
  }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http
      .get<any[]>(this.apiUrl)
      .pipe(timeout(8000), map((lista) => this.mapUsuariosApi(lista)));
  }

  obtenerUsuarioPorId(id: number): Observable<Usuario> {
    return this.http
      .get<any>(`${this.apiUrl}/${id}`)
      .pipe(timeout(8000), map((usuario) => this.mapUsuarioApi(usuario)));
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

    return this.http
      .post<any>(this.apiUrl, body)
      .pipe(timeout(8000), map((usuario) => this.mapUsuarioApi(usuario)));
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

    return this.http
      .put<any>(`${this.apiUrl}/${id}`, body)
      .pipe(timeout(8000), map((usuario) => this.mapUsuarioApi(usuario)));
  }

  eliminarUsuario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(timeout(8000));
  }

  login(data: LoginRequest): Observable<Usuario> {
    const body: LoginRequest = {
      email: data.email.trim().toLowerCase(),
      password: data.password.trim()
    };

    return this.http
      .post<any>(`${this.apiUrl}/login`, body)
      .pipe(timeout(8000), map((usuario) => this.mapUsuarioApi(usuario)));
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