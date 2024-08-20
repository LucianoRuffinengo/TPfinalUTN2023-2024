import { BehaviorSubject, Observable } from 'rxjs';
import { ItemCarrito } from './../interfaces/itemCarrito';
import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  ItemsCarrito: ItemCarrito[] = []
  items: BehaviorSubject<ItemCarrito[]> = new BehaviorSubject<ItemCarrito[]>([]);

  constructor() {
  }

  getLibros(): Observable<ItemCarrito[]>{
    return this.items.asObservable();
  }

  agregarAlCarrito(libro: Libro, precio: number){
    let iCarrito: ItemCarrito = {
      id: libro.id,
      titulo: libro.title,
      edicion: libro.edition,
      image_url: libro.image_url,
      cantidad: 1,
      precio: precio,
    }

    this.ItemsCarrito.push(iCarrito)
    this.items.next(this.ItemsCarrito)
  }
}
