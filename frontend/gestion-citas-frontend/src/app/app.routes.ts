import { Routes } from '@angular/router';

import { Login } from './pages/login/login';
import { Registro } from './pages/registro/registro';
import { Inicio } from './pages/inicio/inicio';
import { MisTurnos } from './pages/mis-turnos/mis-turnos';
import { SolicitarTurno } from './pages/solicitar-turno/solicitar-turno';
import { Perfil } from './pages/perfil/perfil';
import { Notificaciones } from './pages/notificaciones/notificaciones';
import { EditarPerfil } from './pages/editar-perfil/editar-perfil';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'registro', component: Registro },

  { path: 'inicio', component: Inicio },
  { path: 'mis-turnos', component: MisTurnos },
  { path: 'solicitar-turno', component: SolicitarTurno },
  { path: 'perfil', component: Perfil },
  { path: 'editar-perfil', component: EditarPerfil },
  { path: 'notificaciones', component: Notificaciones },

  { path: '**', redirectTo: 'login' }
];