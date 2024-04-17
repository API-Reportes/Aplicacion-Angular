import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { DialogoBorrarPreguntaComponent } from '../dialogo-borrar-pregunta/dialogo-borrar-pregunta.component';
import { DialogoActualizarPreguntaComponent } from '../dialogo-actualizar-pregunta/dialogo-actualizar-pregunta.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-pregunta',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,  
    MatDialogClose,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule
  ],
  templateUrl: './editar-pregunta.component.html',
  styleUrl: './editar-pregunta.component.css'
})
export class EditarPreguntaComponent {

  public buscadorPregunta = new FormGroup({
    idPregunta : new FormControl('',Validators.required)
  })

  preguntas: any
  resultadoBusqueda: any = null

  constructor(private consumidorAuthService: ConsumidorAuthService, public dialog: MatDialog) {
    // this.resultadoBusqueda = true
    // console.log(localStorage.getItem('token'))
    this.consumidorAuthService.getPreguntas().subscribe(
      (response) => {
        // console.log(response);
        this.preguntas = response
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      }
    );
  }

  dialogoBorra(pregunta: any): void {
    const dialogRef = this.dialog.open(DialogoBorrarPreguntaComponent, {
      data: { titulo: '¿Estás seguro de eliminar esta pregunta?', 
      contenido: `${pregunta.enunciadoPregunta}<br>${pregunta.tipoPregunta}<br>${pregunta.subTipoPregunta}<br>${pregunta.opciones}`,
      preguntaId: pregunta.id
      }
    });
  }

  dialogoActualiza(preguntaId: any): void {
    const dialogRef = this.dialog.open(DialogoActualizarPreguntaComponent, {
      data: preguntaId
    });
  }

  public buscador (idPregunta : any){
    // console.log(idPregunta["idPregunta"]);
    this.consumidorAuthService.getPreguntaId(idPregunta["idPregunta"]).subscribe(
      (response) => {
        // console.log(idPregunta);
        console.log(response);
        this.resultadoBusqueda = response
      },
      (error)=> {
        this.resultadoBusqueda = false
        console.log(this.resultadoBusqueda)
        console.log("Hubo un error en la petición: ", error)
      }
    );

  }

}
