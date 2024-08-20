import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/interfaces/admins';
import { Router } from '@angular/router';
import { AutenticacionService } from 'src/app/services/autenticacion.service';

@Component({
  selector: 'app-listar-admins',
  templateUrl: './listar-admins.component.html',
  styleUrls: ['./listar-admins.component.css']
})
export class ListarAdminsComponent implements OnInit{

  listadoAdmins:Admin[]=[];

  constructor(private AdminService:AdminService,
              private router: Router,
              private AutenticacionService: AutenticacionService) { }

  ngOnInit(): void {
    this.mostrarAdmins();
  }


  
  get getAdmin(): Admin | undefined {
    return this.AutenticacionService.currentUser2;
  }

  logout2() {
    this.AutenticacionService.logout2();
    alert("Se ha cerrado sesion");
    this.router.navigate(['/login-admin']);
  }


  mostrarAdmins(){
    this.AdminService.getAdminsHttp()
    .subscribe(
      {
        next: (listado)=>{
          this.listadoAdmins=listado;
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  eliminarAdminHttp(id:number){
    const ok = confirm("Desea eliminar el empleado?")
    if (!ok) return;
    this.AdminService.deleteAdminsHttp(id)
    .subscribe(
      {
        next:()=>{
          this.reloadCurrentRoute();
        },
        error:(error)=>{
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
}
