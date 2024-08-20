import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Admin } from 'src/app/interfaces/admins';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(AutenticacionService);
  const  router = inject(Router);
  const user:Admin | undefined = authService.currentUser2

  return authService.checkStatusAutenticacion()
                    .pipe(
                      tap( estaAutenticado => {
                        if(!estaAutenticado) router.navigate(['/login-admin'])
                      } )
                    )
}

export const AuthGuard = () => {
  return checkAuthStatus()
}

