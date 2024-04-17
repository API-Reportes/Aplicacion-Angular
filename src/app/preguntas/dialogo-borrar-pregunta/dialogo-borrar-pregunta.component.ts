import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';

@Component({
  selector: 'app-dialogo-borrar-pregunta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './dialogo-borrar-pregunta.component.html',
  styleUrl: './dialogo-borrar-pregunta.component.css'
})
export class DialogoBorrarPreguntaComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoBorrarPreguntaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidorAuthService: ConsumidorAuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  borrarPregunta(id: string) {

    console.log('ID de la tarjeta seleccionada:', id);
    
    this.consumidorAuthService.borrarPregunta(id).subscribe(
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
