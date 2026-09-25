import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }
  headers: HttpHeaders = new HttpHeaders({
    'Content-Type' : 'application/json',
    Authorization : 'bearer ' + localStorage.getItem('token')
  });
  uri = environment.url + 'reportes/';

  reporteVentas(body: any) {
    const url = this.uri + 'reporteVentas';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  reporteInscritos(body: any) {
    const url = this.uri + 'reporteInscritos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  reporteImpartidos(body: any) {
    const url = this.uri + 'reporteImpartidos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  egresosGenerales(body: any) {
    const url = this.uri + 'egresosGenerales';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  ingresosGenerales(body: any) {
    const url = this.uri + 'ingresosGenerales';
    return this.http.post(url, body, {headers: this.headers}).pipe( map((respuesta: any) => {
      if (Array.isArray(respuesta)) {
        respuesta.forEach((item: any) => {
          if (item && item.idRubro == 1 && item.idTipo == 1) {
            item.concepto = 'Inscripcion';
          } else if (item && item.idRubro == 1 && item.idTipo == 2) {
            item.concepto = 'Abono';
          }
        });
      }
      return respuesta;
    }));
  }

  ingresosBasico(body: any) {
    const url = this.uri + 'ingresosBasico';
    return this.http.post(url, body, {headers: this.headers}).pipe( map((respuesta: any) => {
      if (Array.isArray(respuesta)) {
        respuesta.forEach((item: any) => {
          if (item && item.idRubro == 1 && item.idTipo == 1) {
            item.concepto = 'Inscripcion';
          } else if (item && item.idRubro == 1 && item.idTipo == 2) {
            item.concepto = 'Abono';
          }
        });
      }
      return respuesta;
    }));
  }

  egresosBasico(body: any) {
    const url = this.uri + 'egresosBasico';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  inscripciones(calendario: any) {
    const url = this.uri + 'inscripciones';
    return this.http.post(url, {id: calendario}, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  buscar(body: any) {
    const url = this.uri + 'buscar';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  prospectos(body: any){
    const url = this.uri + 'prospectos';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
  
  comisiones(body: any) {
    const url = this.uri + 'comisiones';
    return this.http.post(url, body, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  selects() {
    const url = this.uri + 'selects';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }

  empleadosVentas() {
    const url = this.uri + 'empleadosVentas';
    return this.http.get(url, {headers: this.headers}).pipe( map(respuesta => respuesta));
  }
}
