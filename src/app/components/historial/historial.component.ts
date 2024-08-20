import { Component } from '@angular/core';
import { Ventas } from 'src/app/interfaces/ventas';
import { LibrosService } from 'src/app/services/libros.service';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent {
  flag:boolean=false;
  listaHisto:Ventas[]=[]
  constructor(private loginSrvice:LoginService,private librosService:LibrosService){}

  ngOnInit(): void {
    
      if(this.loginSrvice.usuarioActual.historial.length!=0){
        this.flag=true
        this.listaHisto=this.loginSrvice.usuarioActual.historial
      }
  }
}
