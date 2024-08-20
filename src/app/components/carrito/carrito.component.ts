import { LoginService } from './../../services/usuario.service';
import { CarritoService } from './../../services/carrito.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  listaItemsCarrito: ItemCarrito[] = []
  user: Usuario | undefined


  constructor(private router: Router,
    private CarritoService: CarritoService,
    private LoginService: LoginService) {

  }

  ngOnInit(): void {
    let carritoStorage = localStorage.getItem("carrito") as string
    let carrito = JSON.parse(carritoStorage)
    this.listaItemsCarrito = carrito

  }

  verificarLogin() {
    this.user = this.LoginService.getUsuarioActual()
    if (this.listaItemsCarrito.length != 0) {
      if (this.user.id === 0) {
        this.router.navigate(['alerta-login'])
      }
      else {
        this.router.navigate(['compra'])
      }
    }
    else {
      alert("No hay ningun producto en el carrito")
      this.router.navigate(['home'])
    }
  }

  vaciarCarrito() {
    localStorage.removeItem('carrito')
    this.listaItemsCarrito = []
  }

  eliminarUnElemento(id: number) {
    let carritoStorage = localStorage.getItem("carrito") as string
    let carrito = JSON.parse(carritoStorage)
    let index = 0
    let cant = 0

    for (let i = 0; i < carrito.length; i++) {
      let itemC: ItemCarrito = carrito[i]
      if (id === itemC.id) {
        console.log(itemC.cantidad);
        index = i
        cant = itemC.cantidad
        break
      }
    }
    if (cant === 1) {
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    else {
      let itemCarrito: ItemCarrito = carrito[index]
      itemCarrito.cantidad!--
      itemCarrito.subtotal = itemCarrito.cantidad * itemCarrito.precio
      carrito[index] = itemCarrito
      localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    this.ngOnInit()
  }
}
