import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsumidorAuthService {

  //idAplicacion = "65a4f585dcf7110703ac5c1c"
  idAplicacion = "65f51d9fc60fcb54b3da1897"

  constructor(private http: HttpClient) {}

  private getHeaders() {
    // Obtener el token almacenado
    const token = localStorage.getItem('token');

    // Configurar los encabezados con el token
    const header = new HttpHeaders().set("Authorization", "Bearer "+token)
    return header;
  }

  //  http://palancar.izt.uam.mx:4001/
  //  http://palancar.izt.uam.mx:4001/
  
  ///////////////////////////////// URL de preguntas //////////////////////////////////////////

  // public traePreguntas() {
  //   const header = this.getHeaders();
  //   //console.log(header)
  //   return this.http.get(environment.apiUrl + `aplicacion/`, { headers:header });
  // }

  public ponerPregunta(pregunta: any) {
    const header = this.getHeaders();
    ////console.log(header)
    return this.http.post(environment.apiUrl + `pregunta/aplicacion/`+ this.idAplicacion, pregunta, { headers:header });
  }

  public getPreguntas() {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `pregunta/aplicacion/`+ this.idAplicacion, { headers:header });
  }

  public getPreguntaId(idPregunta : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `pregunta/`+ idPregunta, { headers:header });
  }

  public borrarPregunta(idPregunta : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.delete(environment.apiUrl + `pregunta/`+ idPregunta, { headers:header });
  }

  public actualizaPregunta(idPregunta : any, Pregunta : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.put(environment.apiUrl + `pregunta/`+ idPregunta, Pregunta, { headers:header });
  }

///////////////////////////////// URL de aplicaciones //////////////////////////////////////////

  public getAplicaciones() {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `aplicacion/`, { headers:header });
  }

  public getAplicacionId(idAplicacion : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `aplicacion/`+ idAplicacion, { headers:header });
  }

  public ponerAplicacion(aplicacion: any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.post(environment.apiUrl + `aplicacion/`, aplicacion, { headers:header });
  }

  public borrarAplicacion(idAplicacion : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.delete(environment.apiUrl + `aplicacion/`+ idAplicacion, { headers:header });
  }

  public actualizaAplicacion(idAplicacion : any, Aplicacion : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.put(environment.apiUrl + `aplicacion/`+ idAplicacion, Aplicacion, { headers:header });
  }

  ///////////////////////////////// URL de reportes //////////////////////////////////////////

  public getReportes() {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `reporte/aplicacion/`+ this.idAplicacion, { headers:header });
  }

  public getReportesIdReporte(idReporte : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `reporte/`+ idReporte, { headers:header });
  }

  public getReportesIdUsuario(idUsuario : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `reporte/usuario/`+ idUsuario, { headers:header });
  }

  public ponerReporte(reporte: any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.post(environment.apiUrl + `reporte/aplicacion/`+ this.idAplicacion, reporte, { headers:header });
  }


  public borrarReporte(idReporte : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.delete(environment.apiUrl + `reporte/`+ idReporte, { headers:header });
  }

  public actualizaReporte(idReporte : any, Reporte : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.put(environment.apiUrl + `reporte/`+ idReporte, Reporte, { headers:header });
  }

  ///////////////////////////////// URL de usuarios //////////////////////////////////////////

  public getUsuarios() {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `usuario/aplicacion/`+ this.idAplicacion, { headers:header });
  }

  public getUsuarioId(idUsuario : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.get(environment.apiUrl + `usuario/`+ idUsuario, { headers:header });
  }

  public borrarUsuario(idUsuario : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.delete(environment.apiUrl + `usuario/`+ idUsuario, { headers:header });
  }

  public actualizaUsuario(idUsuario : any, Usuario : any) {
    const header = this.getHeaders();
    //console.log(header)
    return this.http.put(environment.apiUrl + `usuario/`+ idUsuario, Usuario, { headers:header });
  }
}