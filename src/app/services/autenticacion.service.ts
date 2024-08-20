import { Injectable } from '@angular/core';
import { Admin } from '../interfaces/admins';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private url:string="http://localhost:4000/admin";
  private Admin?: Admin;



  constructor(private http: HttpClient, private router: Router) { }

  private readonly USER_KEY = 'current_user';

  public get currentUser(): any {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }

  public set currentUser(user: any) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  public get isUserLoggedIn(): boolean {
    return !!this.currentUser;
  }

  public logout(): void {
    localStorage.removeItem(this.USER_KEY);
  }
  

  ////////////////////////////

  get currentUser2(): Admin | undefined {
    if (!this.Admin) return undefined
    //structuredClone(this.user)
    return { ...this.Admin };
  }

  getUsers(): Observable<Admin[]> {
    return this.http.get<Admin[]>(this.url)
  }

  verificarUserAndPass(user: string, pass: string) {

    this.getUsers().subscribe(users => {
      users.find(u => {
        if (u.contraseña === pass && u.usuario === user) {
          this.Admin = u;
          localStorage.setItem('token', u.id.toString())
          this.router.navigate(['/admin'])
        }
      });
    });
  }


  checkStatusAutenticacion(): Observable<boolean> {
    const token = localStorage.getItem('token')
    if (!token) {
      return of(false)
    }
    return this.http.get<Admin>(`${this.url}/${token}`)
      .pipe(
        tap(u => this.Admin = u),
        map(u => !!u),
        catchError(err => of(false))
      )
  } 

  logout2() {
    this.Admin = undefined;
    localStorage.removeItem('token')
  }

  
}
