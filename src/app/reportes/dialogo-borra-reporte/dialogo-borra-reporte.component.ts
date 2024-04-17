import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';

@Component({
  selector: 'app-dialogo-borra-reporte',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle, 
    MatDialogContent,
    MatDialogActions,
    MatDialogClose
  ],
  templateUrl: './dialogo-borra-reporte.component.html',
  styleUrl: './dialogo-borra-reporte.component.css'
})
export class DialogoBorraReporteComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogoBorraReporteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidorAuthService: ConsumidorAuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  borrarPregunta(id: string) {

    console.log('ID de la tarjeta seleccionada:', id);
    
    this.consumidorAuthService.borrarReporte(id).subscribe(
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
