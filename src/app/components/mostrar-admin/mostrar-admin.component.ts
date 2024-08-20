import { AdminService } from 'src/app/services/admin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admins';


@Component({
  selector: 'app-mostrar-admin',
  templateUrl: './mostrar-admin.component.html',
  styleUrls: ['./mostrar-admin.component.css']
})
export class MostrarAdminComponent implements OnInit {

  admin: Admin | undefined;
  mostrarContrasenia: boolean = false;

  formulario: FormGroup = this.formsBuilder.group({
    id: [0],
    usuario: ['', [Validators.required]],
    contraseña: ['', [Validators.required]],
    categoria: ['', [Validators.required]]
  })

  constructor(private formsBuilder: FormBuilder,
    private Router: Router,
    private route: ActivatedRoute,
    private AdminService: AdminService,) { }

  ngOnInit(): void {
    this.mostrarAdminHttp();
  }


  mostrarAdminHttp() {
    this.route.params.subscribe(async param => {
      const id = param['id'];
      this.AdminService.getAdminHttp(id).subscribe(
        {
          next: (administrador) => {
            this.admin = administrador;
            this.formulario.patchValue({
              id: this.admin?.id,
              usuario: this?.admin.usuario,
              contraseña: this?.admin.contraseña,
              categoria: this?.admin.categoria
            })
          }
        }
      )
    })
  }

  editarAdminHttp(){
    if(this.formulario.invalid) return console.log("no se puede");

    const admin:Admin={
      id:this.formulario.controls["id"].value,
      usuario: this.formulario.controls["usuario"].value,
      contraseña: this.formulario.controls["contraseña"].value,
      categoria: this.formulario.controls["categoria"].value
    }
    this.AdminService.putAdminHttp(admin)
    .subscribe(
      {
        next:()=>{
          this.Router.navigate(['/lista-admins']);
        },
        error:(error)=>{
          console.log(error);
        }
      }
    )
  }

  toggleMostrarContrasenia() {
    this.mostrarContrasenia = !this.mostrarContrasenia;
  }
}
