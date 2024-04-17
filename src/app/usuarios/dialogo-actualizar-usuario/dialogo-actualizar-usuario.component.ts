import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { MatFormField } from '@angular/material/form-field';
import { MatLabel } from '@angular/material/form-field';
import { FormsModule, FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-dialogo-actualizar-usuario',
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
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './dialogo-actualizar-usuario.component.html',
  styleUrl: './dialogo-actualizar-usuario.component.css'
})
export class DialogoActualizarUsuarioComponent {

  
  public Usuario = new FormGroup({
    nombre : new FormControl('',Validators.required),
    fecha_nacimiento : new FormControl('',Validators.required),
    email : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  })

  hide: boolean;

  constructor(
    public dialogRef: MatDialogRef<DialogoActualizarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private consumidorAuthService: ConsumidorAuthService
  ) { 
    
    this.hide = true 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  actualizaUsuario(id: string, Usuario : any) {

    console.log('ID de la tarjeta seleccionada:', id);
    console.log(Usuario.value);
    
    this.consumidorAuthService.actualizaUsuario(id, Usuario.value).subscribe(
      (response) => {
        // console.log(response);
        // this.Aplicacions = response
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
