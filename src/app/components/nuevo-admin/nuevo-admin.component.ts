import { Usuario } from 'src/app/interfaces/usuarios';
import { AdminService } from './../../services/admin.service';
import { Admin } from 'src/app/interfaces/admins';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-admin',
  templateUrl: './nuevo-admin.component.html',
  styleUrls: ['./nuevo-admin.component.css']
})
export class NuevoAdminComponent {
  userForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private AdminService: AdminService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.userForm = this.formBuilder.group({
      usuario: ['', [Validators.required, Validators.minLength(6)]],
      contraseña: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      confirmPassword: ['', Validators.required],
      categoria: ['', Validators.required],
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('contraseña')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { mismatch: true };
  }

  cancelar() {
    console.log("Operación cancelada");
  }

  guardar() {
    if (this.userForm.invalid) {
      return;
    }
    const usuario = this.userForm.value.usuario;

    this.AdminService.verificarUsuarioExistente(usuario)
      .subscribe(existe => {
        if (existe) {
          alert('El usuario ya existe. Por favor, elija otro nombre de usuario.');
        } else {
          const adminData: Admin = {
            id: 0, 
            usuario: this.userForm.value.usuario,
            contraseña: this.userForm.value.contraseña,
            categoria: this.userForm.value.categoria,
          };

          this.AdminService.postAdminHttp(adminData)
            .subscribe(
              {
                next: () => {
                  alert("Se ha agregado nuevo administrador");
                  this.router.navigate(['admin']);
                },
                error: (error) => {
                  console.log(error);
                }
              }
            );
        }
      }
      );
  }
}
