import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { ConsumidorService } from '../../service/consumidor.service';
import { CommonModule } from "@angular/common";
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';

// Validador personalizado para la fecha de nacimiento
function fechaNacimientoValidator(control: AbstractControl): ValidationErrors | null {
  const regex = /^(0[1-9]|1[0-2])-(0[1-9]|1\d|2\d|3[01])-(19|20)\d{2}$/;
  return regex.test(control.value) ? null : { fechaNacimientoInvalida: true };
}


@Component({
  selector: 'app-singup',
  standalone: true,
  imports: [
    MatFormFieldModule, 
    MatInputModule, 
    MatIconModule, 
    MatButtonModule, 
    MatSelectModule, 
    ReactiveFormsModule, 
    FormsModule,
    CommonModule
  ],
  templateUrl: './singup.component.html',
  styleUrl: './singup.component.css'
})
export class SingupComponent {

  public registroForm = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nacimiento: new FormControl('', [Validators.required, fechaNacimientoValidator]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  usuarioRegistrado : any = {
    "email": "",
    "password": ""
  };

  // Para ocultar la contraseña
  hide: boolean;
  correoUsado: string;
  
  constructor(private consumidorService: ConsumidorService, private router: Router, private login: LoginComponent) {
    this.hide = true;
    this.correoUsado = "";
  }

  public registar (usuario : any){
    console.log(usuario);
    this.consumidorService.registrarUsuario(usuario).subscribe(
      (response) => {
        // console.log(response);
        // console.log("La respuesta de la petición es:", response.message);
        this.loginRegistro(usuario)
      },
      (error)=> {
        this.correoUsado = error['error']['message']
        console.log("Hubo un error en la petición: ", error)
        console.log(this.correoUsado)
      }
    );
  }

  public loginRegistro(usuario: any) {

   this.usuarioRegistrado['email'] = usuario['email']
   this.usuarioRegistrado['password'] = usuario['password']

   this.login.login(this.usuarioRegistrado);

  }

  public isError(campo: string){
    
      return ( (this.registroForm.get(campo)?.touched && this.registroForm.get(campo)?.invalid) ?? false );
  }

}
