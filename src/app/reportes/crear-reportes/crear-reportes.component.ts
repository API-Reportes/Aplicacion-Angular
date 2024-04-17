import { Component, OnInit, AfterViewInit} from '@angular/core';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from "@angular/common";
import {MatRadioModule} from '@angular/material/radio';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Map, tileLayer } from 'leaflet';
import * as L from 'leaflet';

interface Respuesta {
  usuario_id: any;
  respuesta: any[];
}

@Component({
  selector: 'app-crear-reportes',
  standalone: true,
  imports: [
    MatDividerModule,
    MatListModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule, 
    FormsModule,
    MatButtonModule,
    CommonModule,
    MatRadioModule,
    MatCheckboxModule,
    MatSelectModule
  ],
  templateUrl: './crear-reportes.component.html',
  styleUrl: './crear-reportes.component.css'
})
export class CrearReportesComponent implements AfterViewInit {

  formulario: FormGroup;

  preguntas: any;
  idReporte: string;
  private map;
  imageUrl: string = "";
  coordenadas: string = "";

  constructor(private consumidorAuthService: ConsumidorAuthService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router) {

    this.idReporte = ""
    this.formulario = this.formBuilder.group({});

    // Valor por parametro de la pagina web para el id del usuario para actualizar un reporte
    this.route.queryParams.subscribe(params => {
      const idReporte = params['idReporte'];
      this.idReporte = params['idReporte'];
    });

    // Obtiene todas las preguntas de la aplicacion
    this.consumidorAuthService.getPreguntas().subscribe(
      (response) => {
        //console.log(response);
        this.preguntas = response;
        this.agregarControles();
      },
      (error)=> {
        console.log("Hubo un error en la petición: ", error)
      });
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [19.362063,-99.072479],
      zoom: 16
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', this.onMapClick.bind(this));
  }

  private onMapClick(e): void {
    // Eliminar todos los marcadores existentes
    this.map.eachLayer((layer) => {
        if (layer instanceof L.Marker) {
            this.map.removeLayer(layer);
        }
    });

    const lat = e.latlng.lat;
    const lng = e.latlng.lng;

    this.coordenadas = "[" + lat + "," + lng + "]"

    L.marker([lat, lng]).addTo(this.map)
        .bindPopup('Ubicación del problema')
        .openPopup();
  }

  // Crea el formulario con sus controladores
  agregarControles() {

    if (this.preguntas) {

      for (const pregunta of this.preguntas) {

        if(pregunta.subTipoPregunta == "Checkbox"){
          for (let i = 0; i < pregunta.opciones.length; i++) {
            //console.log(i);
            const opcion = pregunta.opciones[i];
            this.formulario.addControl(opcion, new FormControl('', pregunta.required ? Validators.required : null));
          }
        }else{
          //console.log(pregunta.id)
          if(pregunta.tipoPregunta != "imagen" && pregunta.tipoPregunta != "mapa"){
            this.formulario.addControl(pregunta.id, new FormControl('', pregunta.required ? Validators.required : null));
          }
        }
      }
    }
  }


  public enviar (formularioContestado : any){

    const usuario: Respuesta = {
      usuario_id: localStorage.getItem('idUsuario'),
      respuesta: []
    };

    console.log(formularioContestado)
    //console.log(this.preguntas)

    for (const pregunta of this.preguntas) {

      const preguntaId = pregunta.id;
      if (formularioContestado.hasOwnProperty(preguntaId)) {
        // La clave preguntaId existe en formularioContestado
        const respuestaPregunta = formularioContestado[preguntaId];
        //console.log(respuestaPregunta);
        usuario.respuesta.push(respuestaPregunta);

      } else {
          // La clave preguntaId no existe en formularioContestado
          console.log(`La clave ${preguntaId} no existe en formularioContestado`);
          if(pregunta.subTipoPregunta == "Checkbox"){

            let cbox = "[";
            for (let i = 0; i < pregunta.opciones.length; i++) {
              const opcion = pregunta.opciones[i];
              console.log(formularioContestado[opcion]);
              
              if (formularioContestado[opcion]) {
                cbox += i;
                
                // Verificar si hay más elementos por procesar después del actual
                if (i < pregunta.opciones.length - 1) {
                  cbox += ", ";
                }
              }
            }
            cbox += "]";
            usuario.respuesta.push(cbox);
          }
      }
    
    }
    
    usuario.respuesta.push(this.imageUrl)

    usuario.respuesta.push(this.coordenadas)

    console.log(usuario)

    if(this.idReporte){

      this.consumidorAuthService.actualizaReporte(this.idReporte, usuario).subscribe(
        (response) => {
          console.log(response);
          this.router.navigate(['/Reportes']);
          this.formulario.reset();
        },
        (error)=> {
          console.log("Hubo un error en la petición: ", error)
        });
      
    }else{

      this.consumidorAuthService.ponerReporte(usuario).subscribe(
        (response) => {
          console.log(response);
          this.formulario.reset();
        },
        (error)=> {
          console.log("Hubo un error en la petición: ", error)
        });
    }
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.imageUrl = e.target.result;
        // console.log(this.imageUrl)
      };
      
      reader.readAsDataURL(file);
    }
    
  }

}
