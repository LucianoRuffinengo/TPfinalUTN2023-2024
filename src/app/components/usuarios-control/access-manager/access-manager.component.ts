import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-access-manager',
  templateUrl: './access-manager.component.html',
  styleUrls: ['./access-manager.component.css']
})
export class AccessManagerComponent{
  flag : boolean=true
  constructor(private loginService:LoginService){
  }

  cambiar(valor:boolean){
    this.flag=valor;
  }



  
}
