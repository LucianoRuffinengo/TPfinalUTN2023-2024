import { Component, Output, EventEmitter } from '@angular/core';
import {LoginService} from 'src/app/services/usuario.service'
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-modificacion',
  templateUrl: './modificacion.component.html',
  styleUrls: ['./modificacion.component.css']
})

export class ModificacionComponent {
  @Output()newOpcion=new EventEmitter<number>();
  constructor(private loginService:LoginService){}

  opcion(valor: number){
    
    this.newOpcion.emit(valor)
  }

   
  modificar(e:Event){
    e.preventDefault()

    let actual : Usuario=this.loginService.getUsuarioActual()

    let nombre : string =(<HTMLInputElement>document.getElementById("nombre")).value
    let apellido : string =(<HTMLInputElement>document.getElementById("apellido")).value
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value
    let dni : string =(<HTMLInputElement>document.getElementById("dni")).value

    if(nombre!=""){
    actual.nombre=nombre
    }

    if(apellido!=""){
      actual.apellido=apellido
      }

    if(mail!=""){
      let check: Usuario=this.loginService.usuarioVacio;
      check.mail=mail;
      if(this.loginService.verificarMail(check)){
        alert ("Ya existe una cuenta registrada con este correo electronico, por lo que se conservará el existente")
      }else{
        actual.mail=mail
      }
    }
    
    if(contra!=""){
        actual.contra=contra
      }

    if(dni!=""){
        actual.documento=dni
      }

      this.loginService.modifJsonHTTP(actual).subscribe(
        {
          next:()=>{  
            this.loginService.usuarioActual=actual
            this.newOpcion.emit(0)
          },
          error:(err)=>{
            console.log(err)
          }
        }
      )
  
  }

  soloNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }

  soloLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }


}
