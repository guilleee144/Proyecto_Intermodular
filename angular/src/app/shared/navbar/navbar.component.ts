import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common'; // ✅ Importamos CommonModule para *ngIf
import { RouterModule } from '@angular/router'; // ✅ Importamos RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // ✅ Agregar CommonModule para que *ngIf funcione
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public mostrarNavbar: boolean = true; // ✅ Controla si el navbar se muestra

  constructor(private router: Router) {}

  ngOnInit(): void {
    // ✅ Detecta cambios en la URL y oculta el navbar en /login y /register
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const rutasOcultas = ['/login', '/register'];
        this.mostrarNavbar = !rutasOcultas.includes(event.url);
      }
    });
  }

  cerrarSesion(): void {
    console.log("✅ Sesión cerrada, redirigiendo...");
    this.router.navigate(['/login']); // 🔥 Redirige al login sin autenticación
  }
}
