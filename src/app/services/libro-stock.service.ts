import { Injectable } from '@angular/core';
import { LibroStock } from '../interfaces/libroStock';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class LibrosStockService {

  urlStock:string = "http://localhost:3000/librosStock";
  urlLibrosStock:string=environments.librosUrl;
  stock:string='librosStock';
  ListadoStock:LibroStock [] |undefined=[];

  constructor(private router:Router, private http:HttpClient) { }


  async getLibroStock(id:number): Promise<LibroStock | undefined>{ 
    try {
      const resultado = await fetch(`${this.urlStock}/${id}`);
      const libro = await resultado.json();
      return libro;
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }



  async putStock(stock: LibroStock | null){
    try {
      await fetch(`${this.urlStock}/${stock?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(stock),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

  getStockHttp():Observable<LibroStock[]>{
    return this.http.get<LibroStock[]>(`${this.urlLibrosStock}/${this.stock}`)
  }

  getLibroStockHttp(id:number): Observable<LibroStock>{
    return this.http.get<LibroStock>(`${this.urlLibrosStock}/${this.stock}/${id}`)
  }

  putLibroHttp(libro:LibroStock):Observable<LibroStock>{
    return this.http.put<LibroStock>(
      `${this.urlLibrosStock}/${this.stock}/${libro.id}`,
      libro,
      {headers: {'Content-type': 'application/json'}}
    )
  }
}

