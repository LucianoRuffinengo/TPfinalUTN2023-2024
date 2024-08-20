import { LibrosStockService } from './../../services/libro-stock.service';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  
  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] =[];
  stockID:LibroStock[]|undefined=[];


  constructor (private route:ActivatedRoute,
              private LibrosService:LibrosService,
              private LibrosStockService:LibrosStockService){}

  ngOnInit(): void {
    this.mostrarLibrosPorCategoria();
  }


   mostrarLibrosPorCategoria(){
    this.route.params.subscribe(async param=>{
      const genre:string=param['genre'];

      this.filtrarLibrosHttp(genre);
    })
  }

  filtrarLibrosHttp(genre: string) {
    this.LibrosService.getLibrosHttp()
      .subscribe(
        {
          next: (libros) => {
            const todosLosLibros = libros;

            if (todosLosLibros === undefined) {
              console.log('No se pudieron obtener los libros.');
              return;
            }
            this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
              const generosDelLibro = libro.genres.split(',').map(genero => genero.trim());
              return generosDelLibro.includes(genre);
            });
            this.stockID = [];
            this.mostrarPrecioIDstockHttp(this.listadoLibrosFiltrados)
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }

  mostrarPrecioIDstockHttp(librosFiltrados: Libro[]) {
    this.LibrosStockService.getStockHttp()
      .subscribe(
        {
          next: (resultado) => {
            let j = 0;
            for (let i = 0; i < resultado.length; i++) {
              if (librosFiltrados[j].id === resultado[i].id) {
                this.stockID?.push(resultado[i])
                j++;
              }
            }
          },
          error:(error)=>{
            console.log(error);
          }
        }
      )
  }
}
