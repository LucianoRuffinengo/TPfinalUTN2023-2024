import { CarritoService } from './../../services/carrito.service';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from './../../interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCarrito } from 'src/app/interfaces/itemCarrito';
import { LoginService } from 'src/app/services/usuario.service';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  libro: Libro | undefined;
  libro2: Libro | undefined;
  libroStock: LibroStock | undefined;
  list: Libro[] = []

  isClicked: boolean = false;
  mensaje: string = '';

  constructor(private LibrosService: LibrosService,
    private LibroStock: LibrosStockService,
    private route: ActivatedRoute,
    private CarritoService: CarritoService,
    private loginService: LoginService,
    private location:Location) { }

  ngOnInit(): void {
    this.mostrarLibro2();
    this.mostrarPrecio2();
  }


  irAtras(){
    this.location.back();
  }

  mostrarLibro2() {
    this.route.params.subscribe(async param => {
      const id = param['id'];
      this.LibrosService.getLibroHttp(id).subscribe({
        next:(libro) =>{
          this.libro2 = libro
        }
      });
    })
  }

  async mostrarPrecio2() {
    this.route.params.subscribe(async param => {
      const id = param['id'];
      this.libroStock = await this.LibroStock.getLibroStock(id);
    })
  }

  agregarCarrito(item: Libro, precio: number) {

    let iCarrito: ItemCarrito = {
      id: item.id,
      titulo: item.title,
      edicion: item.edition,
      image_url: item.image_url,
      cantidad: 1,
      precio: precio,
    }
    iCarrito.subtotal = iCarrito.precio * iCarrito.cantidad

    this.LibroStock.getLibroStockHttp(item.id).subscribe({
      next: (stock) => {
        if (stock.stock != 0) {
          if (localStorage.getItem("carrito") === null) {
            let carrito: ItemCarrito[] = []
            carrito.push(iCarrito)
            localStorage.setItem("carrito", JSON.stringify(carrito))
          }
          else {
            let carritoStorage = localStorage.getItem("carrito") as string
            let carrito = JSON.parse(carritoStorage)
            let index = -1

            for (let i = 0; i < carrito.length; i++) {
              let itemC: ItemCarrito = carrito[i]
              if (iCarrito.id === itemC.id) {
                index = i
                break
              }
            }

            if (index === -1) {
              carrito.push(iCarrito)
              localStorage.setItem("carrito", JSON.stringify(carrito))
            }
            else {
              let itemCarrito: ItemCarrito = carrito[index]
              itemCarrito.cantidad!++
              itemCarrito.subtotal = itemCarrito.precio! * itemCarrito.cantidad!
              carrito[index] = itemCarrito
              localStorage.setItem("carrito", JSON.stringify(carrito))
            }
          }
        } else {
          this.mensaje = ("No hay stock de este producto de momento")
          setTimeout(() => {
            this.mensaje = '';
          }, 2000);
          return
        }

      },
      error: (error) => {
        console.log('No se pudo acceder al stock de los libros', error);
      }
    }
    )
    this.mensaje = ("Se agregó el producto al carrito")
    setTimeout(() => {
      this.mensaje = '';
    }, 2000);
  }



  

  cambiarColor() {

    if (this.loginService.usuarioActual.id != 0) {
      if (this.libro2) {
        this.isClicked = this.loginService.modifFav(this.libro2.id)

        if (this.isClicked) {
          this.mensaje = ("Se agregó el producto a favoritos")
        }
        else {
          this.mensaje = ("Se ha quitado el producto de favoritos")
        }

      }
    } else {
      this.mensaje = ("Debe iniciar sesion para tener una lista de favoritos")
    }
    setTimeout(() => {
      this.mensaje = '';
    }, 1000);
  }


}
