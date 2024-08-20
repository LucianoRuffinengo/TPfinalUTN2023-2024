import { Component, Output, EventEmitter } from '@angular/core';
import {LoginService} from 'src/app/services/usuario.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @Output()newCambio=new EventEmitter<boolean>();
  constructor(private loginService:LoginService,private formsBuilder:FormBuilder){}
  formulario:FormGroup = this.formsBuilder.group({
    mail:['',[Validators.required]],
    contra:['',[Validators.required]],
  })

  cambio(){
    this.newCambio.emit(false)
  }
  
  inicioSesion(e:Event){
    if(this.formulario.invalid)return;
    e.preventDefault()
    
    let mail : string =(<HTMLInputElement>document.getElementById("mail")).value
    let contra : string =(<HTMLInputElement>document.getElementById("contra")).value

    this.loginService.inicioSesion(mail,contra)
    
  }
}

