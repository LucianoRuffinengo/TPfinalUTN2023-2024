import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuarios';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-mostrar-usuarios',
  templateUrl: './mostrar-usuarios.component.html',
  styleUrls: ['./mostrar-usuarios.component.css']
})
export class MostrarUsuariosComponent implements OnInit{
  
  usuario:Usuario|undefined;

  formulario:FormGroup = this.formsBuilder.group({
    id:[0],
    nombre:[''],
    apellido:[''],
    mail:[''],
    contra:[''],
    documento:[0],
    tarjetaCredito:[false],
    favoritos:[[]],
    historial:[[]],
  }) 
  constructor (private formsBuilder: FormBuilder,
    private route: ActivatedRoute,
    private AdminService:AdminService,
    private Router:Router){}
  
  ngOnInit(): void {
    this.mostrarCliente()
  }


  mostrarCliente() {
    this.route.params.pipe(
      switchMap(param => {
        const id = param['id'];
        return this.AdminService.getUsuarioHttp(id);
      })
    ).subscribe(usuario => {
      this.usuario = usuario;
  
      this.formulario = this.formsBuilder.group({
        id: this.usuario?.id,
        nombre: this.usuario?.nombre,
        apellido: this.usuario?.apellido,
        mail: this.usuario?.mail,
        contra: this.usuario?.contra,
        documento: this.usuario?.documento,
        tarjetaCredito: this.usuario?.tarjetaCredito,
        favoritos: this.usuario?.favoritos,
      });
    });
    
  }
  
  
  
  
     editarUsuario(){
      if(this.formulario.invalid) return console.log("no se puede");
  
      const usuario:Usuario={
          id:this.formulario.controls["id"].value,
          nombre: this.formulario.controls["nombre"].value,
          apellido: this.formulario.controls["apellido"].value,
          mail: this.formulario.controls["mail"].value,
          contra:this.formulario.controls["contra"].value,
          documento:this.formulario.controls["documento"].value,
          tarjetaCredito:this.formulario.controls["tarjetaCredito"].value,
          favoritos:[],
          historial:[]
        }
        if(this.usuario?.favoritos){
          usuario.favoritos=this.usuario.favoritos
        }
        if(this.usuario?.historial){
          usuario.historial=this.usuario.historial
        }
        this.AdminService.putUsuarioHttp(usuario)
        .subscribe(
          {
            next:()=>{
              this.Router.navigate(['/admin'])
            },
            error:(error)=>{
              console.log(error);
            }
          }
        );
        console.log(usuario);
    } 
  
  
  
    validar(obj: Object | null){
      return Object.values(obj!).every(input=>input!=='')
    }
}
