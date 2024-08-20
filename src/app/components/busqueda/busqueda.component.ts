import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.css']
})
export class BusquedaComponent implements OnInit{

  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] =[];
  stockID:LibroStock[]|undefined=[];

  constructor(private route:ActivatedRoute,
              private LibrosService:LibrosService,
              private LibrosStockService:LibrosStockService){}

  ngOnInit(): void {
    this.mostrarLibrosPorBusqueda();
  }

  mostrarLibrosPorBusqueda(){
    this.route.params.subscribe(async param=>{
      const search:string=param['search'];

      this.filtrarLibrosHttp(search);
    })
  }



  filtrarLibrosHttp(search: string){
    this.LibrosService.getLibrosHttp()
    .subscribe(
      {
        next:(todosLosLibros)=>{
          if (todosLosLibros === undefined) {
            console.log('No se pudieron obtener los libros.');
            return;
          }
          this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
            const tituloDelLibro = libro.title.toLowerCase();
            const busquedaEnMinusculas = search.toLowerCase();
            return tituloDelLibro.includes(busquedaEnMinusculas);
          });
          this.stockID = [];
          this.mostrarPrecioIDstockHttp(this.listadoLibrosFiltrados);
        }
      }
    )
  }

  mostrarPrecioIDstockHttp(librosFiltrados: Libro[]){
    this.LibrosStockService.getStockHttp()
    .subscribe(
      {
        next:(resultado)=>{
          if (resultado === undefined) {
            console.log("No se obtuvo nada");
            return;
          }
        
          let j = 0;
          for (let i = 0; i < resultado.length && j < librosFiltrados.length; i++) {
            if (librosFiltrados[j].id !== undefined && librosFiltrados[j].id === resultado[i].id) {
              this.stockID?.push(resultado[i]);
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
