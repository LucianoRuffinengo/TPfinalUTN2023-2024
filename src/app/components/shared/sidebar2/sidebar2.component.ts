import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from 'src/app/services/libros.service';

@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.css']
})
export class Sidebar2Component {
  
  listadoLibros:Libro[]|undefined=[];
  listadoAutores:String[]=[];
  listadoGeneros:String[]=[];

  constructor(private router: Router,
    private LibrosService:LibrosService) {}

    ngOnInit(): void {
      this.getAutoresHttp();
    }
  


  navigateToCategory(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const category = target.value;
    
    if (category) {
      this.router.navigate(['/autores', category]);
    }
  }

  getAutoresHttp(){
    this.LibrosService.getLibrosHttp()
    .subscribe(
      {
        next: (libros)=>{
          this.listadoLibros=libros;
          if(this.listadoLibros){
            this.listadoAutores=this.listadoLibros.map(libro=>libro.authors.trim());
            this.listadoAutores=Array.from(new Set(this.listadoAutores))
          }
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }
}
