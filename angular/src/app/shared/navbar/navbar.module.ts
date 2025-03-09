import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // ✅ Importamos RouterModule
import { NavbarComponent } from './navbar.component'; // ✅ Importamos el componente Navbar
import { AuthService } from '../../auth/auth.service'; // ✅ Importamos el servicio de autenticación

@NgModule({
  declarations: [], // ✅ Declaramos el NavbarComponent
  imports: [
    CommonModule, // 📌 Importamos CommonModule para directivas como *ngIf y *ngFor
    RouterModule, // 📌 Importamos RouterModule para usar [routerLink]
    NavbarComponent // 📌 Importamos NavbarComponent para poder exportarlo
  ],
  exports: [NavbarComponent], // ✅ Exportamos el NavbarComponent para usarlo en otros módulos
  providers: [AuthService] // 🔥 Agregamos el servicio de autenticación para que funcione en el Navbar
})
export class NavbarModule {}
