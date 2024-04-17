import { Component } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ConsumidorService } from '../../service/consumidor.service';
import { CommonModule } from "@angular/common";
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // o 'any' si lo quieres en otro módulo
})

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
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
  ]
})
export class LoginComponent {

  public loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  // Para ocultar la contraseña
  hide: boolean;
  // token: any;

  constructor(private consumidorService: ConsumidorService, private consumidorAuthService: ConsumidorAuthService, private router: Router, private authService: AuthService) {
    this.hide = true;
  }

  public login (usuario : any){
    
    this.consumidorService.loginUsuario(usuario).subscribe(
      (response) => {
        console.log(response);
        // console.log(response['accessToken']);
        // this.token = response['accessToken'];
        // Almacena el token después de la autenticación
        localStorage.setItem('token', response['accessToken']);
        // Almacena el rol después de la autenticación
        localStorage.setItem('rol', response['roles']);
        // Almacena el nombre después de la autenticación
        localStorage.setItem('nombre', response['nombre']);
        // Almacena el id de usuario después de la autenticación
        localStorage.setItem('idUsuario', response['id']);

        // console.log(localStorage.getItem('token'))
        // console.log(localStorage.getItem('rol'))

        this.authService.login();

        switch(localStorage.getItem('rol')) {
          case 'ROLE_generador':
            this.router.navigate(['/Aplicaciones']);
            break;
          case 'ROLE_administrador':
            this.router.navigate(['/Preguntas']);
            break;
            case 'ROLE_publicador':
              this.router.navigate(['/Reportes']);
              break;
          default:
            // Lógica para manejar el caso en que el rol no coincida con ninguno de los casos anteriores
            break;
        }
    
      },
      (error)=> {
        console.log("Hubo un error en la segunda petición: ", error)
      }
    );
  }

  public isError(campo: string){
    /*if(this.registroForm.get(campo)?.touched && this.registroForm.get(campo)?.invalid)
      return true;
    else
      return false;*/
    
      return ( (this.loginForm.get(campo)?.touched && this.loginForm.get(campo)?.invalid) ?? false );
  }

}
