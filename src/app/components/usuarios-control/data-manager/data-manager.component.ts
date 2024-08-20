import { Component,OnInit } from '@angular/core';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LoginService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-data-manager',
  templateUrl: './data-manager.component.html',
  styleUrls: ['./data-manager.component.css']
})
export class DataManagerComponent implements OnInit{
  flag1 : boolean=true;
  flag2: boolean=true;
  tarjeta: Tarjeta = {
    numeroTarjeta: 0,
    codigoSeguridad: 0,
    nombreTarjeta: '',
    dni: 0,
    fechaCaducidad: ''
  }
  usuarioActual:Usuario= {id:0,nombre:'',apellido:'',mail:'',contra:'',documento:'0',tarjetaCredito:this.tarjeta,favoritos:[],historial:[]}
  
  constructor(private loginService:LoginService){
  }

  ngOnInit(): void {
    this.usuarioActual = this.loginService.usuarioActual
  }

  informacion(){
    let escritura:string=this.loginService.usuarioActual.nombre+this.loginService.usuarioActual.apellido
    console.log(escritura)
    document.getElementById("nombreCompleto")
  }

  mostrar(valor: number){
    if (valor==0){
      this.flag1=true;
    }else{
      this.flag1=false;
      if(valor==1){
        this.flag2=true;
      }else{
          this.flag2=false;
        }
      }
    }

    cerrarSesion(){
      this.loginService.logout()
      sessionStorage.clear()
    }

  }

