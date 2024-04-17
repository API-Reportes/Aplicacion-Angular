import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { DialogoBorrarUsuarioComponent } from '../dialogo-borrar-usuario/dialogo-borrar-usuario.component';
import { DialogoActualizarUsuarioComponent } from '../dialogo-actualizar-usuario/dialogo-actualizar-usuario.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose } from '@angular/material/dialog';


@Component({
  selector: 'app-editar-usuario',
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
  templateUrl: './editar-usuario.component.html',
  styleUrl: './editar-usuario.component.css'
})
export class EditarUsuarioComponent {

  public buscadorUsuario = new FormGroup({
    idUsuario : new FormControl('',Validators.required)
  })

  usuarios: any
  resultadoBusqueda: any = null

  constructor(private consumidorAuthService: ConsumidorAuthService, public dialog: MatDialog) {
    // this.resultadoBusqueda = true
    // console.log(localStorage.getItem('token'))
    this.consumidorAuthService.getUsuarios().subscribe(
      (response) => {
        // console.log(response);
        this.usuarios = response
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      }
    );
  }

  dialogoBorra(usuario: any): void {
    const dialogRef = this.dialog.open(DialogoBorrarUsuarioComponent, {
      data: { titulo: '¿Estás seguro de eliminar este usuario?', 
      contenido: `${usuario.nombre}<br>${usuario.fecha_nacimiento}<br>${usuario.email}`,
      usuarioId: usuario.id
      }
    });
  }

  dialogoActualiza(usuarioId: any): void {
    const dialogRef = this.dialog.open(DialogoActualizarUsuarioComponent, {
      data: usuarioId
    });
  }

  public buscador (idUsuario : any){
    // console.log(idUsuario["idUsuario"]);
    this.consumidorAuthService.getUsuarioId(idUsuario["idUsuario"]).subscribe(
      (response) => {
        // console.log(idUsuario);
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
