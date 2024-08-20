import { LibrosStockService } from './../../services/libro-stock.service';
import { LoginService } from 'src/app/services/usuario.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Ventas } from 'src/app/interfaces/ventas';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {
  listaItemsCarrito: ItemCarrito[] = []
  user: Usuario | undefined
  selectedOption: string = '';
  tarjeta: number = 0;

  onChangeSelect() {
    switch (this.selectedOption) {
      case 'num':
        this.tarjeta = +this.selectedOption
        break;
      default:
        this.tarjeta = 0
        break;
    }
  }


  constructor(private router: Router,
    private loginService: LoginService,
    private LibrosStockService: LibrosStockService) {

  }

  ngOnInit(): void {
    let carritoStorage = localStorage.getItem("carrito") as string
    let carrito = JSON.parse(carritoStorage)
    this.listaItemsCarrito = carrito
    this.user = this.loginService.getUsuarioActual()
  }

  calcularTotalAPagar() {
    let result = 0
    for (let i = 0; this.listaItemsCarrito.length > i; i++) {
      result += this.listaItemsCarrito[i].subtotal!
    }
    return result
  }

  viajarATarjeta() {
    this.router.navigate(['agregar-tarjeta'])
  }

  verificarTarjeta() {
    let flag = 1
    let i = 0
    let stockLibro = 0
    if (this.user?.tarjetaCredito.numeroTarjeta != 0) {
      if(this.tarjeta != 0){
        this.LibrosStockService.getStockHttp().subscribe({
          next: (stock) => {
            let j = 0
            for (let i = 0; i < stock.length; i++) {
              if (j < this.listaItemsCarrito.length) {
                if (stock[i].id === this.listaItemsCarrito[j].id) {
                  if (this.listaItemsCarrito[j].cantidad > stock[i].stock) {
                    stockLibro = stock[i].stock
                    flag = 0
                  }
                  j++;
                }
  
              }
            }
            if (flag === 1) {
              j = 0
              for (let i = 0; i < stock.length; i++) {
                if (j < this.listaItemsCarrito.length) {
                  if (stock[i].id === this.listaItemsCarrito[j].id) {
                    stock[i].stock = stock[i].stock - this.listaItemsCarrito[j].cantidad
                    this.LibrosStockService.putLibroHttp(stock[i]).subscribe()
                    j++
                  }
                }
              }
              this.agregarHistorial()
              localStorage.removeItem('carrito')
              this.listaItemsCarrito = []
              this.router.navigate(['felicidades'])
            } else {
              alert(`No hay stock suficiente para el producto: "${this.listaItemsCarrito[i].titulo}", solo hay: "${stockLibro}" libros en stock del producto mencionado`)
            }
          },
          error: (error) => {
            console.log('No se pudo acceder al stock de los libros', error);
          }
        })
      }else{
        alert("Por favor seleccione una tarjeta")
      }

    }
    else {
      alert("El usuario no tiene ninguna tarjeta agregada")
      this.router.navigate(['agregar-tarjeta'])
    }
  }

  agregarHistorial() {
    let cambio: Usuario = this.loginService.usuarioActual
    let nuevo: Ventas = { fecha: new Date(), pedidos: this.listaItemsCarrito, total: this.calcularTotalAPagar() }

    cambio.historial.push(nuevo)
    this.loginService.modifJsonHTTP(cambio).subscribe(
      {
        next:()=>{},
        error:(err)=>{console.log(err)}
      }
    )

  }

  volverACarrito() {
    this.router.navigate(['carrito'])
  }
}
