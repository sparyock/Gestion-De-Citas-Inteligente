import { Routes } from '@angular/router';

import { Inicio } from './pages/inicio/inicio';
import { MisTurnos } from './pages/mis-turnos/mis-turnos';
import { SolicitarTurno } from './pages/solicitar-turno/solicitar-turno';
import { Perfil } from './pages/perfil/perfil';

export const routes: Routes = [

  { path: 'inicio', component: Inicio },
  { path: 'mis-turnos', component: MisTurnos },
  { path: 'solicitar-turno', component: SolicitarTurno },
  { path: 'perfil', component: Perfil },

  { path: '', redirectTo: 'inicio', pathMatch: 'full' }

];