import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'usuarios/';

  nuevo(usuario: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  informacion(usuario: string | null) {
    const url = this.uri + 'informacion';
    return this.http.post(url, {usuario}, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  traer(body: any) {
    const url = this.uri + 'traer';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificar(usuario: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, usuario, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  verificarDisponibilidad(body: any) {
    const url = this.uri + 'verificarDisponibilidad';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  sugerirUsuario(body: any) {
    const url = this.uri + 'sugerirUsuario';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
}
