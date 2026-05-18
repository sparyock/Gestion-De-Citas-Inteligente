import { Component } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Sidebar } from './layout/sidebar/sidebar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  mostrarSidebar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const rutaActual = this.router.url;
        this.mostrarSidebar = rutaActual !== '/login' && rutaActual !== '/registro';
      });

    const rutaInicial = this.router.url;
    this.mostrarSidebar = rutaInicial !== '/login' && rutaInicial !== '/registro';
  }
}