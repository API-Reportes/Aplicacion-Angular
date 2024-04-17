import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-dialogo-borrar-usuario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './dialogo-borrar-usuario.component.html',
  styleUrl: './dialogo-borrar-usuario.component.css'
})
export class DialogoBorrarUsuarioComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoBorrarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidorAuthService: ConsumidorAuthService,
    private authService: AuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  borrarUsuario(id: string) {

    //console.log('ID de la tarjeta seleccionada:', id);

    if(id == localStorage.getItem('idUsuario')){
      
      this.consumidorAuthService.borrarUsuario(id).subscribe(
            (response) => {
              // console.log(response);
              // this.preguntas = response
              this.dialogRef.close();
              // Recargar la página
              this.authService.logout();
              // window.location.reload();
            },
            (error)=> {
              console.log("Hubo un error en la petición: ", error)
            }
          );
    }
    
    this.consumidorAuthService.borrarUsuario(id).subscribe(
      (response) => {
        // console.log(response);
        // this.preguntas = response
        this.dialogRef.close();
        // Recargar la página
        window.location.reload();
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      }
    );
  }

}
