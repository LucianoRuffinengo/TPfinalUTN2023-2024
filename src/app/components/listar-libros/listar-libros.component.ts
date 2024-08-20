import { LibrosStockService } from './../../services/libro-stock.service';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { LibroStock } from 'src/app/interfaces/libroStock';

@Component({
  selector: 'app-listar-libros',
  templateUrl: './listar-libros.component.html',
  styleUrls: ['./listar-libros.component.css']
})
export class ListarLibrosComponent implements OnInit {
  
   constructor (private LibrosService:LibrosService,
                private LibrosStockService:LibrosStockService) {}

   listadoLibros:Libro[] | undefined =[];
   listadoStock:LibroStock [] | undefined=[];
   listadoStock2:LibroStock [] = [];


   ngOnInit(): void {
    this.mostrarLibros2();
    this.mostrarStock2();
  }
  

  mostrarLibros2(){
    this.LibrosService.getLibrosHttp()
    .subscribe(
      {
        next: (libros)=>{
          this.listadoLibros=libros;
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )
  }
  
  mostrarStock2(){
    this.LibrosStockService.getStockHttp()
    .subscribe(
      {
        next:(stock)=>{
          this.listadoStock=stock;
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }


}
