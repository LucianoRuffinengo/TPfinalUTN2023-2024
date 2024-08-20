import { Router } from '@angular/router';
import { LibrosService } from './../../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  flag: boolean=false;
  tituloLibro: string = '';


  constructor (private loginService: LoginService,
    private LibrosService:LibrosService,
    private Router:Router){}

  ngOnInit(){
    if (this.loginService.usuarioActual.id!=0){
      this.flag=true
    }
  }


  buscarLibros() {
    // Utiliza el método navigate del servicio Router para navegar a la ruta de búsqueda
    this.Router.navigate(['/busqueda', this.tituloLibro]);
  }

}
