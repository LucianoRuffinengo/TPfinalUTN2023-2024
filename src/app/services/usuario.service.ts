import { Tarjeta } from './../interfaces/tarjeta';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../interfaces/usuarios';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url: string = "http://localhost:2000/usuarios"
  listaUsuarios: Usuario[] | undefined = [];
  usuarioLogueado: Usuario | undefined;
  tarjeta: Tarjeta = {
    numeroTarjeta: 0,
    codigoSeguridad: 0,
    nombreTarjeta: '',
    dni: 0,
    fechaCaducidad: ''
  }
  //usuarioVacio:Usuario = {id:10,nombre:'John',apellido:'Doe',mail:'mimail@gmail.com',contra:'1',documento:'0',tarjetaCredito:this.tarjeta,favoritos:[1,7],historial:[]}
  usuarioVacio: Usuario = { id: 0, nombre: '', apellido: '', mail: '', contra: '', documento: '0', tarjetaCredito: this.tarjeta, favoritos: [], historial:[] }
  usuarioActual: Usuario = this.usuarioVacio
  usuarioIniciado:Usuario|null= this.usuarioVacio

  constructor(private router: Router, private http: HttpClient) {
    this.cargarUsuario()
   }


  cargarUsuario(){
   this.usuarioIniciado=JSON.parse(sessionStorage.getItem('usuarioIniciado')||JSON.stringify(this.usuarioVacio))
   if(this.usuarioIniciado){
     this.usuarioActual= this.usuarioIniciado
     
   }
  }


  getUsuarioActual(): Usuario {
    return this.usuarioActual
  }

  setUsuarioActual(user: Usuario) {
    this.usuarioActual = user;
  }

  async leerJson() {
    try {
      const respuesta = await fetch(this.url)
      const usuarios = await respuesta.json()
      if (usuarios) {
        console.log(usuarios)
        this.listaUsuarios = JSON.parse(JSON.stringify(usuarios))
        if (this.listaUsuarios) {
          this.listaUsuarios.sort(function (a, b) { return a.id - b.id })
        }
      } else {
        console.log("No se pudo acceder a los usuarios")
      }
    } catch (error) {
      console.log(error)
    }
  }

  async leerUsuario(id: number): Promise<Usuario | undefined> {

    try {
      const respuesta = await fetch(this.url + "/" + id,
        {
          method: 'GET'
        })

      const rta = await respuesta.json()
      const user: Usuario = JSON.parse(JSON.stringify(rta))
      console.log(user)
      return user
    } catch (error) {
      console.log(error)

    }
    return undefined
  }

  async escribirJson(nuevo: Usuario) {
    try {
      await fetch(this.url,
        {
          method: 'POST',
          body: JSON.stringify(nuevo),
          headers: { 'Content-type': 'application/json' }
        })
      this.router.navigate(['home'])
      sessionStorage.setItem('usuarioIniciado',JSON.stringify(nuevo));
    } catch (error) {
      console.log(error)
    }
  }

  async modifJson(cambio: Usuario) {
    try {
      await fetch(this.url + "/" + cambio.id,
        {
          method: 'PUT',
          body: JSON.stringify(cambio),
          headers: { 'Content-type': 'application/json' }
        })
      this.usuarioActual = cambio;
      sessionStorage.setItem('usuarioIniciado',JSON.stringify(this.usuarioActual));
      this.cargarUsuario()
    } catch (error) {
      console.log(error)
    }
  }



  agregarUsuarioLista(nuevo: Usuario) {
    if (this.listaUsuarios) {
      this.listaUsuarios.push(nuevo)
      this.listaUsuarios.sort(function (a, b) { return a.id - b.id })
      this.escribirJsonHTTP(nuevo).subscribe(
        {
          next:()=>{
            sessionStorage.setItem('usuarioIniciado',JSON.stringify(nuevo));
            this.router.navigate(['home'])
          },
          error: (err) => {
            console.log(err);
          }
        }
      );

    }
  }

  idDisponible() {
    var disp: number = 0;
    if (this.listaUsuarios) {
      disp++
      var flag: boolean = true;


      for (var i: number = 0; i < this.listaUsuarios.length && flag; i++) {
        if (disp == this.listaUsuarios[i].id) {
          disp++;
        } else {
          flag = false;
        }
      }
    }
    return disp;

  }

  
  async borrarUsuarioActual() {
    try {
      await fetch(this.url + "/" + this.usuarioActual.id,
        {
          method: 'DELETE',
          headers: { 'Content-type': 'application/json' }
        })
      this.usuarioActual = this.usuarioVacio
      this.router.navigate(['home'])
    } catch (error) {
      console.log(error)
    }
  }

  async inicioSesion(mail: string, contra: string) {

    var flag: boolean = false
    if (this.listaUsuarios) {
      for (var i: number = 0; i < this.listaUsuarios.length && !flag; i++) {
        if (this.listaUsuarios[i].mail == mail && this.listaUsuarios[i].contra == contra) {
          
          this.leerUsuarioHTTP(this.listaUsuarios[i].id).subscribe(
            {
              next:(user)=>{
                this.usuarioActual=user
                localStorage.setItem('tokenUser',JSON.stringify(user))
                sessionStorage.setItem('usuarioIniciado', JSON.stringify(this.usuarioActual))
                this.router.navigate(['home'])
              },
              error:(err)=>{
                console.log(err)
              }
            }
          )
          flag = false;
        }
      }
      if(flag){
        alert ("Correo electronico o contraseña incorrectos")
      }
    }
  }

  verificarMail(user: Usuario) {
    var flag: boolean = false;
    if (this.listaUsuarios) {
      for (var i: number = 0; i < this.listaUsuarios.length && !flag; i++) {
        if (user.mail == this.listaUsuarios[i].mail) {
          flag = true
        }
      }
    }
    return flag
  }

  modifFav(id: number): boolean {

    if (this.usuarioActual.favoritos.indexOf(id) > -1) {
      this.eliminarFav(id)
      return false
    } else {
      this.usuarioActual.favoritos.push(id)
      this.modifJsonHTTP(this.usuarioActual).subscribe(
        {
          next:()=>{},
          error:(err)=>{console.log(err)}
        }
      )
      return true
    }
  }

  eliminarFav(id: number) {
    this.usuarioActual.favoritos.splice(this.usuarioActual.favoritos.indexOf(id), 1)
    this.modifJsonHTTP(this.usuarioActual).subscribe(
      {
        next:()=>{},
        error:(err)=>{console.log(err)}
      }
    )
  }

  async putTarjeta(usuario: Usuario | null){
    try {
      await fetch(`${this.url}/${usuario?.id}`,
        {
          method: 'PUT',
          body: JSON.stringify(usuario),
          headers: { 'Content-type': 'application/json' }
        }
      )
    } catch (error) {
      console.log(error)
    }
  }

leerJsonHTTP(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(this.url);
}

leerUsuarioHTTP(id:number):Observable<Usuario>{
  return this.http.get<Usuario>(`${this.url}/${id}`)
}

escribirJsonHTTP(nuevo:Usuario):Observable<Usuario>{
    return this.http.post<Usuario>(
      this.url,
      nuevo,
      {headers: { 'Content-type': 'application/json' }}
    )
}

modifJsonHTTP(cambio:Usuario):Observable<Usuario>{
  
    sessionStorage.setItem('usuarioIniciado',JSON.stringify(this.usuarioActual));
    this.cargarUsuario()
    return this.http.put<Usuario>(
    `${this.url}/${cambio.id}`,
    cambio,
    {headers: { 'Content-type': 'application/json' }}
  )
}

borrarUsuarioHTTP(id:number):Observable<Usuario>{
  this.usuarioActual = this.usuarioVacio
  this.router.navigate(['home'])
  return this.http.delete<Usuario>(`${this.url}/${id}`);
}

checkStatusAutenticacion(): Observable<boolean> {
  const token = localStorage.getItem('tokenUser')
  if (!token) {
    return of(false)
  }
  return of(true)
} 

logout() {
  this.usuarioActual = this.usuarioVacio;
  localStorage.removeItem('tokenUser')
}
}