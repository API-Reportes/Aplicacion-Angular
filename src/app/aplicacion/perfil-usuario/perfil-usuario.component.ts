import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router } from '@angular/router';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { DialogoBorrarUsuarioComponent } from '../../usuarios/dialogo-borrar-usuario/dialogo-borrar-usuario.component';
import { DialogoActualizarUsuarioComponent } from '../../usuarios/dialogo-actualizar-usuario/dialogo-actualizar-usuario.component';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatDialog, MatDialogTitle, MatDialogContent, MatDialogActions,  MatDialogClose } from '@angular/material/dialog';

interface Reportes {
  nombre: any;
  preguntas: any;
  respuestas: any; 
  fechaCreacion: string[];
  id: string[];
}

@Component({
  selector: 'app-perfil-usuario',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,  
    MatDialogClose,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule, 
    FormsModule
  ],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})

export class PerfilUsuarioComponent {

  public buscadorReporte = new FormGroup({
    id : new FormControl('',Validators.required)
  })

  usuario: any
  reportes:  any
  resultados: Reportes[] = [];
  resultadoBusqueda: Reportes[] = [];
  respuesta: any
  i : number
  noHayResultados : boolean
  rol : any = localStorage.getItem('rol')
  
  constructor(private consumidorAuthService: ConsumidorAuthService, public dialog: MatDialog, private router: Router) {
    this.i = 0
    this.noHayResultados = false
    // this.resultadoBusqueda = true
    // console.log(localStorage.getItem('token'))
    const idUsuario = localStorage.getItem('idUsuario')
    this.consumidorAuthService.getUsuarioId(idUsuario).subscribe(
      (response) => {
        // console.log(response);
        this.usuario = response
        this.crearjson();
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      }
    );
  }

  async crearjson() {

    try {
      this.reportes = await this.consumidorAuthService.getReportesIdUsuario(localStorage.getItem('idUsuario')).toPromise();
    } catch (error) {
      console.log("Hubo un error en la petición para obtener el id del usuario:", error);
    }

    if (this.reportes) {
      
      for (const reporte of this.reportes) {
        this.i = 0;

        const usuario: Reportes = {
          nombre: "",
          preguntas: [],
          respuestas: [],
          fechaCreacion: reporte.fechaCreacion,
          id: reporte.id
        };
  
        // Obtener el nombre de usuario
        try {
          const responseUsuario = await this.consumidorAuthService.getUsuarioId(reporte.usuario_id).toPromise();
          usuario.nombre = responseUsuario!["nombre"];
        } catch (error) {
          console.log("Hubo un error en la petición para obtener el nombre del usuario:", error);
        }
  
        // Obtener las preguntas
        for (const preguntaId of reporte.preguntas_id) {

          try {
            const responsePregunta = await this.consumidorAuthService.getPreguntaId(preguntaId).toPromise();
            usuario.preguntas.push(responsePregunta!["enunciadoPregunta"]);

            if(responsePregunta!["tipoPregunta"] == "abierta"){
              // console.log(this.i)
              usuario.respuestas.push(reporte.respuesta[this.i]);
            }

            if(responsePregunta!["tipoPregunta"] == "cerrada"){
              
              // console.log("Posicion de la respuesta contestada:  " + reporte.respuesta[this.i])
              if(responsePregunta!["subTipoPregunta"] == "Checkbox"){ //respuestas cerrada de múltiples valores (Checkbox)
                const arr = JSON.parse(reporte.respuesta[this.i]).map(Number);
                let cbox = ""
                for(const res of arr){
                    cbox += (cbox != "" ? ", " : "") + responsePregunta!["opciones"][res];
                }
                usuario.respuestas.push(cbox);
              }
              else{ // respuestas cerrada de un solo valor
                  const opcerrada = responsePregunta!["opciones"][parseInt(reporte.respuesta[this.i])]
                  usuario.respuestas.push(opcerrada);
              }
                
            }
            
          } catch (error) {
            console.log("Hubo un error en la petición para obtener la pregunta:", error);
          }
          this.i = this.i+1;
        }
  
        // Agregar el usuario al resultado
        this.resultados.push(usuario);
      }
  
      //console.log(this.resultados);
    }
  }

  // Buscador para encontrar reportes por id de reporte o id de usuario
 public async buscador(id: any) {
  // this.resultadoBusqueda = []
  this.resultadoBusqueda.splice(0, this.resultadoBusqueda.length)
  this.i = 0;
  this.noHayResultados = false
  //Buscador por id de reporte
  try {
    const response = await this.consumidorAuthService.getReportesIdReporte(id["id"]).toPromise();
    //console.log("Respuesta por id reporte", response);

    this.respuesta = response

    const usuario: Reportes = {
      nombre: "",
      preguntas: [],
      respuestas: [],
      fechaCreacion: this.respuesta.fechaCreacion,
      id: this.respuesta.id
    };

    // Obtener el nombre de usuario
    try {
      const responseUsuario = await this.consumidorAuthService.getUsuarioId(this.respuesta['usuario_id']).toPromise();
      usuario.nombre = responseUsuario!["nombre"];
    } catch (error) {
      console.log("Hubo un error en la petición para obtener el nombre del usuario:", error);
    }

    // Obtener las preguntas
    for (const preguntaId of this.respuesta.preguntas_id) {

      try {
        const responsePregunta = await this.consumidorAuthService.getPreguntaId(preguntaId).toPromise();
        usuario.preguntas.push(responsePregunta!["enunciadoPregunta"]);
        //console.log(usuario.preguntas)

        if(responsePregunta!["tipoPregunta"] == "abierta"){
          // console.log(this.i)
          usuario.respuestas.push(this.respuesta.respuesta[this.i]);
        }

        if(responsePregunta!["tipoPregunta"] == "cerrada"){
              
          // console.log("Posicion de la respuesta contestada:  " + reporte.respuesta[this.i])
          if(responsePregunta!["subTipoPregunta"] == "Checkbox"){ //respuestas cerrada de múltiples valores (Checkbox)
            const arr = JSON.parse(this.respuesta.respuesta[this.i]).map(Number);
            let cbox = ""
            for(const res of arr){
                cbox += (cbox != "" ? ", " : "") + responsePregunta!["opciones"][res];
            }
            usuario.respuestas.push(cbox);
          }
          else{ // respuestas cerrada de un solo valor
              const opcerrada = responsePregunta!["opciones"][parseInt(this.respuesta.respuesta[this.i])]
              usuario.respuestas.push(opcerrada);
          }
            
        }
        
      } catch (error) {
        console.log("Hubo un error en la petición para obtener la pregunta:", error);
      }
      this.i = this.i+1;
    }

    // Agregar el usuario al resultado
    this.resultadoBusqueda.push(usuario);
    
  } catch (error) {
      this.noHayResultados = true
      console.log("Hubo un error en la petición para obtener los reportes del usuario por id de usuario:", error);
    }
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

  ActualizaReporte(idReporte: any) {
    //console.log(idReporte)
    this.router.navigate(['/Reportes'], { queryParams: { idReporte: idReporte } }); // Pasa el idReporte como parámetro de consulta
  }

}
