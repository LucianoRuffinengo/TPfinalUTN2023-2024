import { inject } from '@angular/core';
import { Router} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LoginService } from 'src/app/services/usuario.service';

function checkAuthStatus(): boolean | Observable<boolean>{
  const authService = inject(LoginService);
  const  router = inject(Router);

  const user:Usuario | undefined = authService.usuarioActual

  return authService.checkStatusAutenticacion()
                    .pipe(
                      tap( estaAutenticado => {
                        if(!estaAutenticado) router.navigate(['/usuario-menu'])
                      } )
                    )
}

export const AuthGuardUser = () => {
  return checkAuthStatus()
}