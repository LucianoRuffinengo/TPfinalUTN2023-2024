import { LibrosStockService } from 'src/app/services/libro-stock.service';
import { LibrosService } from './../../services/libros.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuarios';
import { Libro } from 'src/app/interfaces/libros';
import { LibroStock } from 'src/app/interfaces/libroStock';
import { AutenticacionService } from 'src/app/services/autenticacion.service';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admins';

@Component({
  selector: 'app-administracion',
  templateUrl: './administracion.component.html',
  styleUrls: ['./administracion.component.css']
})
export class AdministracionComponent implements OnInit {

  constructor(private AdminService: AdminService,
    private LibrosService: LibrosService,
    private LibrosStockService: LibrosStockService,
    private AutenticacionService: AutenticacionService,
    private router: Router) { }

  listadoUsuarios: Usuario[] | undefined = [];
  listadoLibros: Libro[] | undefined = [];
  listadoStock: LibroStock[] | undefined = [];

  ngOnInit(): void {
    this.mostrarUsuariosHttp();
    this.mostrarLibrosHttp();
    this.mostrarStockHttp();
  }

  get getAdmin(): Admin | undefined {
    return this.AutenticacionService.currentUser2;
  }

  logout2() {
    this.AutenticacionService.logout2();
    alert("Se ha cerrado sesion");
    this.router.navigate(['/login-admin']);
  }

  mostrarUsuariosHttp() {
    this.AdminService.getUsuariosHttp()
      .subscribe(
        {
          next: (users) => {
            this.listadoUsuarios = users;
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }
  eliminarClienteHttp(id: number) {
    const ok = confirm("Desea eliminar el cliente?")
    if (!ok) return;
    this.AdminService.deleteUsuarioHttp(id)
      .subscribe(
        {
          next: () => {
            this.reloadCurrentRoute();
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }

  reloadCurrentRoute() {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }


  mostrarLibrosHttp() {
    this.LibrosService.getLibrosHttp()
      .subscribe(
        {
          next: (libros) => {
            this.listadoLibros = libros;
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }

  mostrarStockHttp() {
    this.LibrosStockService.getStockHttp()
      .subscribe(
        {
          next: (stock) => {
            this.listadoStock = stock;
          },
          error: (error) => {
            console.log(error);
          }
        }
      )
  }
}
