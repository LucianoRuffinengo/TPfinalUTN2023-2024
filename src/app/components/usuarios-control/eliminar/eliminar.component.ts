import { Component, Output, EventEmitter } from '@angular/core';
import {LoginService} from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-eliminar',
  templateUrl: './eliminar.component.html',
  styleUrls: ['./eliminar.component.css']
})
export class EliminarComponent {

  @Output() newOpcion=new EventEmitter<number>();
  constructor(private loginService:LoginService){}


  opcion(valor: number){
    this.newOpcion.emit(valor)
  }

  borrar(){
   
    this.loginService.borrarUsuarioHTTP(this.loginService.usuarioActual.id).subscribe(
      {
        next:()=>{},
        error:(err)=>{console.log(err)}
      }
    );
    }
}
