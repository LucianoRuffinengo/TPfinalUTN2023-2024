import { LibrosService } from './../../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  listadoLibros:Libro[]|undefined=[];
  listadoGeneros:String[]=[];

  constructor(private router: Router,
              private LibrosService:LibrosService) {}
  ngOnInit(): void {
    this.getGenerosHttp();
  }

  navigateToCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    
    if (category) {
      this.router.navigate(['/categoria', category]);
    }
  }

  getGenerosHttp(){
    this.LibrosService.getLibrosHttp()
    .subscribe(
      {
        next:(libros)=>{
          this.listadoLibros=libros;
          if(this.listadoLibros){
            const generosSet = new Set<string>();
            this.listadoLibros.forEach(libros=>{
              const generosArray = libros.genres.split(',');
              generosArray.forEach(genero=>generosSet.add(genero.trim()))
            });
            this.listadoGeneros=Array.from(generosSet)
          }
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }
}
