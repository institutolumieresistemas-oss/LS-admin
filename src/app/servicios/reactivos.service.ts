import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactivosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url+'reactivos/';
  
  mostrar() {
    const url = this.uri + 'catalogo';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  modificar(body: any) {
    const url = this.uri + 'modificar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  eliminar(body: any){
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  asociarSecciones(idReactivo: number, secciones: number[]) {
    const url = this.uri + 'asociarSecciones';
    return this.http.post(url, { idReactivo, secciones }, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validar(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre del reactivo');
      return false;
    }
    if(dato.porcentaje === undefined || dato.porcentaje === null || dato.porcentaje === ''){
      this.generales.mensajeError('No se ha ingresado el porcentaje del reactivo');
      return false;
    }
    return true;
  }
}
