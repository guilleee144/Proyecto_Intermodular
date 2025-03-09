import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth.service'; // ✅ Importamos el servicio de autenticación

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule], // ✅ Importamos FormsModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  nombre: string = ''; // ✅ Agregamos nombre de usuario
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async register() {
    // 📌 Validaciones previas antes de enviar el formulario
    if (!this.nombre.trim() || !this.email.trim() || !this.password.trim()) {
      this.errorMessage = '⚠️ Todos los campos son obligatorios.';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = '⚠️ Las contraseñas no coinciden.';
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = '⚠️ La contraseña debe tener al menos 6 caracteres.';
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.nombre);
      console.log('✅ Registro exitoso');
      this.router.navigate(['/proyectos-view']); // ✅ Redirigir al dashboard después del registro
    } catch (error: any) {
      this.errorMessage = '❌ Error al registrar: ' + error.message;
    }
  }
}
