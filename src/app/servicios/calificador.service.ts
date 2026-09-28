import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CalificadorService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + this.generales.getSesionToken()
  });
  uri = environment.url + 'calificador/';
  
  busquedaGuardada: any = null;
  datosGuardados: any = null;
  listaHorariosGuardada: any = null;

  guardarEstado(busqueda: any, datos: any, listaHorarios: any = null) {
    this.busquedaGuardada = busqueda ? { ...busqueda } : null;
    this.datosGuardados = datos ? [ ...datos ] : null;
    this.listaHorariosGuardada = listaHorarios ? [ ...listaHorarios ] : null;
    try {
      sessionStorage.setItem('calificador_busqueda', JSON.stringify(this.busquedaGuardada));
      sessionStorage.setItem('calificador_datos', JSON.stringify(this.datosGuardados));
      sessionStorage.setItem('calificador_horarios', JSON.stringify(this.listaHorariosGuardada));
    } catch (e) {}
  }

  obtenerEstado() {
    if (this.datosGuardados) {
      return {
        busqueda: this.busquedaGuardada,
        datos: this.datosGuardados,
        listaHorarios: this.listaHorariosGuardada
      };
    }
    try {
      const b = sessionStorage.getItem('calificador_busqueda');
      const d = sessionStorage.getItem('calificador_datos');
      const h = sessionStorage.getItem('calificador_horarios');
      if (d) {
        this.busquedaGuardada = b ? JSON.parse(b) : null;
        this.datosGuardados = JSON.parse(d);
        this.listaHorariosGuardada = h ? JSON.parse(h) : null;
        return {
          busqueda: this.busquedaGuardada,
          datos: this.datosGuardados,
          listaHorarios: this.listaHorariosGuardada
        };
      }
    } catch (e) {}
    return null;
  }

  limpiarEstado() {
    this.busquedaGuardada = null;
    this.datosGuardados = null;
    this.listaHorariosGuardada = null;
    try {
      sessionStorage.removeItem('calificador_busqueda');
      sessionStorage.removeItem('calificador_datos');
      sessionStorage.removeItem('calificador_horarios');
    } catch (e) {}
  }

  selects() {
    const url = this.uri + 'selects';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.post(url, {}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  horarios(idTurno: any) {
    const url = this.uri + 'horarios';
    return this.http.post(url, {idTurno}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  grupos(body: any) {
    const url = this.uri + 'grupos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  alumnos(body: any) {
    const url = this.uri + 'alumnos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerExamenes(body: any) {
    const url = this.uri + 'traerExamenes';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  traerSecciones(body: any) {
    const url = this.uri + 'traerSecciones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  guardarSecciones(body: any) {
    const url = this.uri + 'guardarSecciones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
}
