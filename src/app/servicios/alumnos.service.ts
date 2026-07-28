import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url + 'alumnos/';
  
  buscar(body: any) {
    const url = this.uri + 'buscar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  datos(body: any){
    const url = this.uri + 'datos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificarPersonales(body: any){
    const url = this.uri + 'modificarPersonales';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificarTutor(body: any){
    const url = this.uri + 'modificarTutor';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificarDomicilio(body: any){
    const url = this.uri + 'modificarDomicilio';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  fichas(body: any){
    const url = this.uri + 'fichas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarNumeroRegistro(body: any){
    const url = this.uri + 'actualizarNumeroRegistro';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarEstatusFicha(body: any){
    const url = this.uri + 'actualizarEstatusFicha';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarDatosPublicitarios(body: any){
    const url = this.uri + 'actualizarDatosPublicitarios';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  actualizarDatosAspiracion(body: any){
    const url = this.uri + 'actualizarDatosAspiracion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  traer(body: any){
    const url = this.uri + 'traer';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  inscripcion(body: any){
    const url = this.uri + 'inscripcion';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  alumno(body: any){
    const url = this.uri + 'alumno';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificarNombre(body: any){
    const url = this.uri + 'modificarNombre';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }

  modificarEscolares(body: any){
    const url = this.uri + 'modificarEscolares';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta) );
  }
  
  validarPersonales(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if(this.generales.validarString(dato.celular)){
      this.generales.mensajeError('No se ha ingresado el celular');
      return false;
    }
    if(this.generales.validarString(dato.fechaNacimiento)){
      this.generales.mensajeError('No se ha ingresado la fecha de nacimiento');
      return false;
    }
    return true;
  }

  validarTutor(dato: any){
    if(this.generales.validarString(dato.nombre)){
      this.generales.mensajeError('No se ha ingresado el nombre');
      return false;
    }
    if(this.generales.validarString(dato.celular)){
      this.generales.mensajeError('No se ha ingresado el celular');
      return false;
    }
    return true;
  }

  validarDomicilio(dato: any){
    if(this.generales.validarString(dato.calle)){
      this.generales.mensajeError('No se ha ingresado la calle');
      return false;
    }
    if(this.generales.validarString(dato.numeroExterior)){
      this.generales.mensajeError('No se ha ingresado el numero exterior');
      return false;
    }
    if(this.generales.validarString(dato.colonia)){
      this.generales.mensajeError('No se ha ingresado la colonia');
      return false;
    }
    if(this.generales.validarString(dato.codigoPostal)){
      this.generales.mensajeError('No se ha ingresado el codigo postal');
      return false;
    }
    if(this.generales.validarEntero(dato.idEstado)){
      this.generales.mensajeError('No se ha seleccionado el estado');
      return false;
    }
    if(this.generales.validarEntero(dato.idMunicipio)){
      this.generales.mensajeError('No se ha seleccionado el municipio');
      return false;
    }
    return true;
  }
}
