import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ConsumidorService {

  //idAplicacion = "65a4f585dcf7110703ac5c1c"
  idAplicacion = "65f51d9fc60fcb54b3da1897"

  constructor(private http: HttpClient) { }

  public registrarUsuario(usuario: any): Observable<any>{
    return this.http.post(environment.apiUrl + 'usuario/auth/registro/aplicacion/' + this.idAplicacion, usuario);
  }

  public loginUsuario(usuario: any): Observable<any>{
    return this.http.post(environment.apiUrl + 'usuario/auth/login/aplicacion/' + this.idAplicacion, usuario);
  }
}
