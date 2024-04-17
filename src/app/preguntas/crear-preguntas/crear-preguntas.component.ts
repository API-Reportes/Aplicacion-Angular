import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import { ConsumidorAuthService } from '../../service/consumidor-auth.service';
import {MatRadioModule} from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-crear-preguntas',
  standalone: true,
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule
  ],
  templateUrl: './crear-preguntas.component.html',
  styleUrl: './crear-preguntas.component.css'
})
export class CrearPreguntasComponent {

  ceroFormGroup = this._formBuilder.group({
    enunciadoPregunta: ['', Validators.required],
  });
  firstFormGroup = this._formBuilder.group({
    tipoPregunta: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    subTipoPregunta: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    opciones: ['', Validators.required],
  });
  fourthFormGroup = this._formBuilder.group({
    coordenadas: ['', Validators.required],
  });

  isLinear:boolean = true;

  preguntaAbierta : any = {
    "enunciadoPregunta": "",
    "tipoPregunta": ""
  };

  preguntaCerrada : any = {
    "enunciadoPregunta": "",
    "tipoPregunta": "",
    "subTipoPregunta": "",
    "opciones": ""
  };

  preguntaMapa : any = {
    "enunciadoPregunta": "",
    "tipoPregunta": "",
    "subTipoMapa": "Point"
  };

  constructor(private _formBuilder: FormBuilder, private consumidorAuthService: ConsumidorAuthService) { }

  public registarPregunta (){

    const valoresFormularioCero = this.ceroFormGroup.value;
    const valoresFormularioFirst = this.firstFormGroup.value;
    const valoresFormularioSecond = this.secondFormGroup.value;
    const valoresFormularioThird = this.thirdFormGroup.value;

    // const pregunta = {
    //   ...valoresFormularioCero,
    //   ...valoresFormularioFirst,
    //   ...valoresFormularioSecond,
    //   ...valoresFormularioThird
    // }

    this.preguntaAbierta["enunciadoPregunta"] = valoresFormularioCero["enunciadoPregunta"]
    this.preguntaAbierta["tipoPregunta"] = valoresFormularioFirst["tipoPregunta"]

    this.preguntaCerrada["enunciadoPregunta"] = valoresFormularioCero["enunciadoPregunta"]
    this.preguntaCerrada["tipoPregunta"] = valoresFormularioFirst["tipoPregunta"]
    this.preguntaCerrada["subTipoPregunta"] = valoresFormularioSecond["subTipoPregunta"]
    this.preguntaCerrada["opciones"] = valoresFormularioThird["opciones"]
    console.log(this.preguntaCerrada["opciones"])
    // Dividir la cadena en un array usando la coma como separador
    const partes = this.preguntaCerrada["opciones"].split(', ');
    console.log(partes)
    this.preguntaCerrada["opciones"] = partes;

    this.preguntaMapa["enunciadoPregunta"] = valoresFormularioCero["enunciadoPregunta"]
    this.preguntaMapa["tipoPregunta"] = valoresFormularioFirst["tipoPregunta"]

    // Combina los valores en un solo objeto o array
    if(this.firstFormGroup.get('tipoPregunta')?.value == "cerrada"){
      console.log(this.preguntaCerrada);
      this.consumidorAuthService.ponerPregunta(this.preguntaCerrada).subscribe(
        (response) => {
          console.log(response);
        },
        (error)=> {
          console.log("Hubo un error en la petición: ", error)
        }
      );
    }
    if(this.firstFormGroup.get('tipoPregunta')?.value == "abierta" || this.firstFormGroup.get('tipoPregunta')?.value == "imagen"){
      console.log(this.preguntaAbierta);
      this.consumidorAuthService.ponerPregunta(this.preguntaAbierta).subscribe(
        (response) => {
          console.log(response);
        },
        (error)=> {
          console.log("Hubo un error en la petición: ", error)
        }
      );
    }
    if(this.firstFormGroup.get('tipoPregunta')?.value == "mapa"){
      console.log(this.preguntaMapa);
      this.consumidorAuthService.ponerPregunta(this.preguntaMapa).subscribe(
        (response) => {
          console.log(response);
        },
        (error)=> {
          console.log("Hubo un error en la petición: ", error)
        }
      );
    }

    
  }

}
