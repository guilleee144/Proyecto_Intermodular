import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule,RouterModule], // Asegura que se importan los módulos necesarios
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Asegura que el archivo SCSS está aquí
})

export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string | null = null; // Variable para el mensaje de error

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        console.log("✅ Inicio de sesión exitoso");
        this.errorMessage = null; // Limpia el mensaje de error si el login es exitoso
        this.router.navigate(['/proyectos-view']);
      })
      .catch(error => {
        console.error("❌ Error al iniciar sesión:", error);
        this.errorMessage = error.message; // Asigna el mensaje de error
      });
  }
}
