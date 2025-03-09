import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service'; // ✅ Asegurar que el AuthService está bien importado
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService); // ✅ Inyectamos AuthService
  const router = inject(Router); // ✅ Inyectamos Router

  return authService.isAuthenticated().pipe(
    map(isAuth => {
      if (isAuth) {
        return true; // ✅ Permitir el acceso
      } else {
        router.navigate(['/login']); // 🚨 Redirigir al login si no está autenticado
        return false;
      }
    })
  ) as Observable<boolean>; // ✅ Retornamos un observable booleano
};
