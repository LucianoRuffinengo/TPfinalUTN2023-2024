import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Libro } from '../../interfaces/libros';
import { LoginService } from '../../services/usuario.service';
import { LibrosService } from '../../services/libros.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrls: ['./favoritos.component.css']
})
export class FavoritosComponent implements OnInit {
  flag1:boolean=false;
  flag2:boolean=false;
  listaLibros:Libro[]=[]
  listaFav:number[]=[]
  @Output()newReinicio=new EventEmitter<any>();
  constructor(private loginSrvice:LoginService,private librosService:LibrosService){}
  
  async ngOnInit() {
    
     
    if(this.loginSrvice.usuarioActual.id!=0){
    this.flag1=true
    if(this.loginSrvice.usuarioActual.favoritos.length!=0){
      this.flag2=true
      if(this.librosService.listadoLibros.length==0){
        await this.librosService.getLibros()
      }
      this.listaFav=this.loginSrvice.usuarioActual.favoritos
      this.igualarFavLibros()
      
     
    }
  }
  }

  igualarFavLibros(){
    for (var j=0;j<this.listaFav.length;j++){
      for(var i=0;i<this.librosService.listadoLibros.length;i++){
        
        if(this.librosService.listadoLibros[i].id==this.listaFav[j]){
          
          this.listaLibros.push(this.librosService.listadoLibros[i])
        }
        
      }
    }  
  }

  eliminarFav(id:number){
   
    this.loginSrvice.eliminarFav(id)
    this.newReinicio.emit()
  }
}
