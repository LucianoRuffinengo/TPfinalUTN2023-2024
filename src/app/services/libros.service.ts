import { Injectable } from '@angular/core';
import { Libro } from '../interfaces/libros';
import { LibroStock } from '../interfaces/libroStock';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class LibrosService {

  urlLibros:string='https://example-data.draftbit.com/books?_limit=100'
  urlLibro:string="https://example-data.draftbit.com/books"

  listadoLibros:Libro[]=[]

  urlApi:string=environments.baseUrl;
  limit:string='books?_limit=100';
  books:string='books';


  constructor(private http:HttpClient) { }

  async getLibros(): Promise<Libro[] | undefined>{
    try {
      const resultado = await fetch (this.urlLibros);
      const libros = await resultado.json();
      this.listadoLibros=libros
      return libros;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  getLibrosHttp(): Observable<Libro[]> {
    return this.http.get<Libro[]>(`${this.urlApi}/${this.limit}`);
  }

  getLibroHttp(id:number): Observable<Libro>{
    return this.http.get<Libro>(`${this.urlApi}/${this.books}/${id}`)
  }


}
