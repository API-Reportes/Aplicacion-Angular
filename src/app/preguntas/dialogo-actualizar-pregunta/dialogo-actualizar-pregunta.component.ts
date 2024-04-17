import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-dialogo-actualizar-pregunta',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './dialogo-actualizar-pregunta.component.html',
  styleUrl: './dialogo-actualizar-pregunta.component.css'
})
export class DialogoActualizarPreguntaComponent {

  public Pregunta = new FormGroup({
    enunciadoPregunta : new FormControl('',Validators.required)
  })

  constructor(
    public dialogRef: MatDialogRef<DialogoActualizarPreguntaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidorAuthService: ConsumidorAuthService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  actualizaPregunta(id: string, Pregunta : any) {

    console.log('ID de la tarjeta seleccionada:', id);
    console.log('ID de la tarjeta seleccionada:', Pregunta);
    
    this.consumidorAuthService.actualizaPregunta(id, Pregunta).subscribe(
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
