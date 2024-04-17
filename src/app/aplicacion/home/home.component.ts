import { Component } from '@angular/core';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatListModule, 
    MatDividerModule,
    CommonModule,
    MatButtonModule
  ]
})
export class HomeComponent {

  aplicaciones: any

  constructor(private consumidorAuthService: ConsumidorAuthService, private router: Router) {

  //   console.log(localStorage.getItem('token'))
  //   this.consumidorAuthService.traePreguntas().subscribe(
  //     (response) => {
  //       console.log(response);
  //       this.aplicaciones = response
  //     },
  //     (error)=> {
  //       console.log("Hubo un error en la petición: ", error)
  //     }
  //   );
  // }

  // public miFuncion() {
  //   this.router.navigate(['/Preguntas']);
  }
  
}
