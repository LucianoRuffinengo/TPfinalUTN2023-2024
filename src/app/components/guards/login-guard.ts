import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(AutenticacionService);
  const  router = inject(Router);
  return authService.checkStatusAutenticacion()
                    .pipe(
                      tap( estaAutenticado => {
                        console.log(estaAutenticado);
                        if(estaAutenticado){
                          router.navigate(['admin'])

                        }
                      }),
                      map(estaAutenticado => !estaAutenticado)
                    )
}

export const LoginGuard = () => {
  return checkAuthStatus()
}
