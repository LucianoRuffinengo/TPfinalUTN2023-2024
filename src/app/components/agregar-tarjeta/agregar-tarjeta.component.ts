import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarjeta } from 'src/app/interfaces/tarjeta';
import { Usuario } from 'src/app/interfaces/usuarios';
import { LoginService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent implements OnInit{

  user: Usuario | undefined
  selectedMonthYear: string | undefined;
  
  formulario: FormGroup = this.formBuilder.group({
    numeroTarjeta:['', [Validators.required, Validators.minLength(16)]],
    codigoSeguridad:['', [Validators.required, Validators.minLength(3)]],
    nombreTarjeta:['', Validators.required],
    dni:['', Validators.required],
    fechaCaducidad:['', Validators.required],
  })

  constructor(private formBuilder: FormBuilder, private LoginService:LoginService, private router:Router){
    
  }

  ngOnInit(): void {
    this.user = this.LoginService.getUsuarioActual()
  }


  async guardarTarjeta(){
    if(this.formulario.invalid){
      this.formulario.markAllAsTouched()
      return;
    }
    let tarjeta: Tarjeta = {
      numeroTarjeta: this.formulario.controls['numeroTarjeta'].value,
      codigoSeguridad: this.formulario.controls['codigoSeguridad'].value,
      nombreTarjeta: this.formulario.controls['nombreTarjeta'].value,
      dni: this.formulario.controls['dni'].value,
      fechaCaducidad: this.formulario.controls['fechaCaducidad'].value
    }

    this.user!.tarjetaCredito = tarjeta
    await this.LoginService.putTarjeta(this.user!);
    this.router.navigate(['compra'])
  }

  validar(field: string, error: string){
    return this.formulario.controls[field].getError(error)
    &&
    this.formulario.controls[field].touched
  }

  soloNumeros(event: any) {
    const pattern = /^[0-9]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }

  soloLetras(event: any) {
    const pattern = /^[a-zA-Z ]*$/;
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z ]/g, "");
    }
  }

  onMonthYearChange(event: any) {
    this.selectedMonthYear = event.target.value;
  }
}
