import { LibrosService } from './../../services/libros.service';
import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { Libro } from 'src/app/interfaces/libros';

@Component({
  selector: 'app-mostrar-libro',
  templateUrl: './mostrar-libro.component.html',
  styleUrls: ['./mostrar-libro.component.css']
})
export class MostrarLibroComponent implements OnInit {

  libro: Libro | undefined;
  stock: LibroStock | undefined;

  formulario:FormGroup = this.formsBuilder.group({
    title: [''],
    authors: [''],
    edition: ['-'],
    id:[0],
    precio: [0.00, [Validators.required]],
    stock: [0, [Validators.required]],
  })

  constructor(private formsBuilder: FormBuilder,
    private route: ActivatedRoute,
    private LibrosStockService: LibrosStockService,
    private LibrosService: LibrosService,
    private Router:Router) { }

  ngOnInit(): void {
    this.mostrarLibroHttp();
  }

  mostrarLibroHttp() {
    this.route.params.subscribe(async param => {
      const id = param['id'];
  
      this.LibrosService.getLibroHttp(id).subscribe({
        next: (libro) => {
          this.libro = libro;
          this.formulario.patchValue({
            title: this.libro?.title,
            authors: this.libro?.authors,
            edition: this.libro?.edition,
          });
        }
      });
  
      this.LibrosStockService.getLibroStockHttp(id).subscribe({
        next: (stock) => {
          this.stock = stock;
          this.formulario.patchValue({
            id: this.stock?.id,
            precio: this.stock?.precio,
            stock: this.stock?.stock,
          });
        }
      });
    });
  }
  

  editarStock(){
    if(this.formulario.invalid) return console.log("no se puede");

    const libro:LibroStock={
      id:this.formulario.controls["id"].value,
      precio:this.formulario.controls["precio"].value,
      stock:this.formulario.controls["stock"].value,
    }
    this.LibrosStockService.putLibroHttp(libro) 
    .subscribe(
      {
        next:()=>{
        this.Router.navigate(['/admin']);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    );
    console.log(libro);
  }
}
