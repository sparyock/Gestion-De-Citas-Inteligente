import { ServerRoute, RenderMode } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: 'inicio',
    renderMode: RenderMode.Server
  },

  {
    path: 'mis-turnos',
    renderMode: RenderMode.Server
  },

  {
    path: 'solicitar-turno',
    renderMode: RenderMode.Server
  },

  {
    path: 'perfil',
    renderMode: RenderMode.Server
  },

  {
    path: '',
    renderMode: RenderMode.Server
  }

];