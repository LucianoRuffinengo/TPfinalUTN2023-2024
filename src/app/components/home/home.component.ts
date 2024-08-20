import { LibrosStockService } from './../../services/libro-stock.service';
import { Libro } from 'src/app/interfaces/libros';
import { LibrosService } from './../../services/libros.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/usuario.service';
import { LibroStock } from 'src/app/interfaces/libroStock';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    constructor(private LibrosService: LibrosService,
        private loginService: LoginService,
        private LibroStock: LibrosStockService) { }

    listadoLibros: Libro[] | undefined = [];
    listadoStock: LibroStock[] | undefined = [];

    ngOnInit(): void {
        this.mostrarLibrosHttp();
    }


    mostrarLibrosHttp() {
        this.LibrosService.getLibrosHttp()
            .subscribe(
                {
                    next: (libros: Libro[]) => {
                        const indicesAleatorios: number[] = [];
                        while (indicesAleatorios.length < 3) {
                            const indiceAleatorio: number = Math.floor(Math.random() * libros.length);
                            if (!indicesAleatorios.includes(indiceAleatorio)) {
                                indicesAleatorios.push(indiceAleatorio);
                            }
                        }
                        this.listadoLibros = indicesAleatorios.map((indice: number) => libros[indice]);
                        this.buscarCoincidenciasEnStock(this.listadoLibros);
                    },
                    error: (error) => {
                        console.log('No se pudo acceder a los libros', error);
                    }
                }
            );
    }

    buscarCoincidenciasEnStock(listado:Libro[]){
        for (let i=0; i<listado.length;i++){
            this.LibroStock.getLibroStockHttp(listado[i].id)
            .subscribe(
                {
                    next:(stock)=>{
                        this.listadoStock?.push(stock);
                    },
                    error:(error)=>{
                        console.log(error);
                    }
                }
            )
        }
    }


}
