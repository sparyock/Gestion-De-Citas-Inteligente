import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'registro',
    renderMode: RenderMode.Client
  },
  {
    path: 'inicio',
    renderMode: RenderMode.Client
  },
  {
    path: 'mis-turnos',
    renderMode: RenderMode.Client
  },
  {
    path: 'solicitar-turno',
    renderMode: RenderMode.Client
  },
  {
    path: 'perfil',
    renderMode: RenderMode.Client
  },
  {
    path: 'notificaciones',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];