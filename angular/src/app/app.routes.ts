import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component'; // ✅ Importar el componente de registro
import { ProyectosViewComponent } from './proyectos-view/proyectos-view';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ProyectosComponent } from './proyecto/proyecto.component';
import { authGuard } from './auth/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, 
  { path: 'login', component: LoginComponent }, 
  { path: 'register', component: RegisterComponent }, // ✅ Ruta de registro corregida
  { path: 'proyectos-view', component: ProyectosViewComponent, canActivate: [authGuard] }, 
  { path: 'proyectos', component: ProyectosComponent, canActivate: [authGuard] }, 
  { path: 'navbar', component: NavbarComponent }, 
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', redirectTo: 'login' }
];
