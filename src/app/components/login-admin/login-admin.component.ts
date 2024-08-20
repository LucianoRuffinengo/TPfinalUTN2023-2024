import { AutenticacionService } from './../../services/autenticacion.service';
import { AdminService } from './../../services/admin.service';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Admin } from 'src/app/interfaces/admins';
import { Usuario } from 'src/app/interfaces/usuarios';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent {
  
  listadoAdmins:Admin[]|undefined=[];
  private formBuilder: FormBuilder = inject(FormBuilder)
  private auth: AutenticacionService = inject(AutenticacionService)
  private router: Router = inject(Router)

  formulario:FormGroup = this.formBuilder.group({
    usuario:['',[Validators.required]],
    contraseña:['',[Validators.required]]
  })

iniciarSession() {
  if (this.formulario.invalid) return;

  this.auth.verificarUserAndPass(
    this.formulario.controls['usuario'].value,
    this.formulario.controls['contraseña'].value)

}
}
