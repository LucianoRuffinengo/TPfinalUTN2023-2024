import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from 'src/app/services/carrito.service';

@Component({
  selector: 'app-agradecimiento-page',
  templateUrl: './agradecimiento-page.component.html',
  styleUrls: ['./agradecimiento-page.component.css']
})
export class AgradecimientoPageComponent{


  constructor(private router:Router){

  }

  volverAlHome(){
    this.router.navigate(['home'])
  }

}
