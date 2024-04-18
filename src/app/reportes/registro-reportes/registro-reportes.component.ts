import { Component } from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import { DialogoBorraReporteComponent } from '../dialogo-borra-reporte/dialogo-borra-reporte.component';
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
  selector: 'app-registro-reportes',
  standalone: true,
  imports: [
    MatListModule, 
    MatDividerModule,
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatDialogTitle, 
    MatDialogContent, 
    MatDialogActions,  
    MatDialogClose
  ],
  templateUrl: './registro-reportes.component.html',
  styleUrl: './registro-reportes.component.css'
})
export class RegistroReportesComponent {

  public buscadorReporte = new FormGroup({
    id : new FormControl('',Validators.required)
  })

  reportes: any
  resultados: Reportes[] = [];
  resultadoBusqueda: Reportes[] = [];
  respuesta: any
  i : number
  noHayResultados : boolean

  constructor(private consumidorAuthService: ConsumidorAuthService, public dialog: MatDialog) {
    this.i = 0
    this.noHayResultados = false
    // this.resultadoBusqueda = true
    // console.log(localStorage.getItem('token'))
    this.consumidorAuthService.getReportes().subscribe(
      (response) => {
        // console.log(response);
        this.reportes = response
        this.crearjson();
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      }
    );
  }

  async crearjson() {
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

            if(responsePregunta!["tipoPregunta"] == "imagen"){
              // console.log(this.i)
              if(reporte.respuesta[this.i]){
                usuario.respuestas.push("Con imagen");
              }else{
                usuario.respuestas.push("Sin imagen");
              }
            }

            if(responsePregunta!["tipoPregunta"] == "mapa"){
              // console.log(this.i)
              if(reporte.respuesta[this.i]){
                usuario.respuestas.push(reporte.respuesta[this.i]);
              }else{
                usuario.respuestas.push("Sin coordenadas");
              }
            }

            if(responsePregunta!["tipoPregunta"] == "cerrada"){
              
              // console.log("Posicion de la respuesta contestada:  " + reporte.respuesta[this.i])
              if(responsePregunta!["subTipoPregunta"] == "Checkbox"){ //respuestas cerrada de múltiples valores (Checkbox)
                const arr = JSON.parse(reporte.respuesta[this.i]).map(Number);
                let cbox = ""
                for(const res of arr){
                    cbox += (cbox != "" ? ", " : "") + responsePregunta!["opciones"][res];
                }
                if(cbox == ""){
                  usuario.respuestas.push("Sin respuestas seleccionadas");
                }else{
                  usuario.respuestas.push(cbox);
                }
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
  
      console.log(this.resultados);
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

        if(responsePregunta!["tipoPregunta"] == "imagen"){
          // console.log(this.i)
          if(this.respuesta.respuesta[this.i]){
            usuario.respuestas.push("Con imagen");
          }else{
            usuario.respuestas.push("Sin imagen");
          }
        }

        if(responsePregunta!["tipoPregunta"] == "mapa"){
          // console.log(this.i)
          if(this.respuesta.respuesta[this.i]){
            usuario.respuestas.push(this.respuesta.respuesta[this.i]);
          }else{
            usuario.respuestas.push("Sin coordenadas");
          }
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
    //console.log("Hubo un error en la petición para obtener los reportes por id de reporte:", error);
    //Buscador por id de usuario
    try {
      const response = await this.consumidorAuthService.getReportesIdUsuario(id["id"]).toPromise();
      console.log(response);

      this.respuesta = response

      for (const reporte of this.respuesta) {
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

            if(responsePregunta!["tipoPregunta"] == "imagen"){
              // console.log(this.i)
              if(reporte.respuesta[this.i]){
                usuario.respuestas.push("Con imagen");
              }else{
                usuario.respuestas.push("Sin imagen");
              }
            }
    
            if(responsePregunta!["tipoPregunta"] == "mapa"){
              // console.log(this.i)
              if(reporte.respuesta[this.i]){
                usuario.respuestas.push(reporte.respuesta[this.i]);
              }else{
                usuario.respuestas.push("Sin coordenadas");
              }
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
        this.resultadoBusqueda.push(usuario);
      }

      //console.log(this.resultadoBusqueda)

    } catch (error) {
      this.noHayResultados = true
      console.log("Hubo un error en la petición para obtener los reportes del usuario por id de usuario:", error);
    }
  }
}


  dialogoBorra(reporte: any): void {
    const dialogRef = this.dialog.open(DialogoBorraReporteComponent, {
      data: { titulo: '¿Estás seguro de eliminar este reporte?', 
      contenido: `${reporte.nombre}<br>${reporte.preguntas}<br>${reporte.respuestas}<br>${reporte.fechaCreacion}`,
      reporteId: reporte.id
      }
    });
  }

}
