import { Usuario } from './../interfaces/usuarios';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../interfaces/admins';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environments } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class AdminService {
  url:string="http://localhost:2000/usuarios";
  url2:string="http://localhost:4000/admin";

  urlUsers:string=environments.usuariosUrl;
  urlAdmin:string=environments.adminUrl;
  usuarios:string='usuarios';
  admins:string='admin';


  constructor(private router:Router, private http: HttpClient) { }

  getUsuariosHttp(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.urlUsers}/${this.usuarios}`);
  }

  getUsuarioHttp(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlUsers}/${this.usuarios}/${id}`)
  }

  putUsuarioHttp(Usuario: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(
      `${this.urlUsers}/${this.usuarios}/${Usuario.id}`,
      Usuario,
      {headers: { 'Content-type': 'application/json' }}
    )
  }

  deleteUsuarioHttp(id: number):Observable<Usuario>{
    return this.http.delete<Usuario>(`${this.urlUsers}/${this.usuarios}/${id}`);
  }

  getAdminsHttp():Observable<Admin[]>{//revisar
    return this.http.get<Admin[]>(`${this.urlAdmin}/${this.admins}`);
  }

  getAdminHttp(id:number):Observable<Admin>{
    return this.http.get<Admin>(`${this.urlAdmin}/${this.admins}/${id}`);
  }

  putAdminHttp(admin:Admin):Observable<Admin>{
    return this.http.put<Admin>(
      `${this.urlAdmin}/${this.admins}/${admin.id}`,
      admin,
      {headers: {'Content-type': 'application/json'}}
    )
  }

  deleteAdminsHttp(id:number):Observable<Admin>{
    return this.http.delete<Admin>(`${this.urlAdmin}/${this.admins}/${id}`);
  }

  postAdminHttp(admin:Admin):Observable<Admin>{//revisar
    return this.http.post<Admin>(
      `${this.urlAdmin}/${this.admins}`,
      admin,
      {headers:{'Content-Type': 'application/json'}}
    )
  }

  verificarUsuarioExistente(usuario: string): Observable<boolean> {//revisar
    return this.http.get<Admin[]>(`${this.urlAdmin}/${this.admins}?usuario=${usuario}`)
      .pipe(
        map(admins => admins.length > 0)
      );
  }
}
