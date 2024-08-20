import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styleUrls: ['./autores.component.css']
})
export class AutoresComponent implements OnInit{
  
  listadoLibros:Libro[] | undefined =[];
  listadoLibrosFiltrados:Libro[] =[];
  stockID:LibroStock[]|undefined=[];

  constructor (private route:ActivatedRoute,
    private LibrosService:LibrosService,
    private LibrosStockService:LibrosStockService){}
  
  
  ngOnInit(): void {
   this.mostrarLibrosPorAutores(); 
  }

  mostrarLibrosPorAutores(){
    this.route.params.subscribe(async param =>{
      const author:string=param['authors']
      this.filtrarLibrosHttp(author);
    })
  }

  filtrarLibrosHttp(author: string){
    this.LibrosService.getLibrosHttp()
    .subscribe(
      {
        next:(todosLosLibros)=>{
          if (todosLosLibros === undefined) {
            console.log('No se pudieron obtener los libros.');
            return;
          }
          this.listadoLibrosFiltrados = todosLosLibros.filter(libro => {
            return libro.authors.trim() === author.trim();
          });
          this.stockID = [];

          this.mostrarPrecioIDstockHttp(this.listadoLibrosFiltrados);
        },
        error: (error)=>{
          console.log(error);
        }
      }
    )
  }


  mostrarPrecioIDstockHttp(librosFiltrados:Libro[]){
    this.LibrosStockService.getStockHttp()
    .subscribe(
      {
        next:(resultado)=>{
          if(resultado === undefined){
            console.log("No se obtuvo nada");
            return;
          }
          let j=0;
          for(let i=0;i<resultado.length;i++){
            if(librosFiltrados[j].id===resultado[i].id){
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
