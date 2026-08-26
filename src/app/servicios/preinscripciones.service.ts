import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PreinscripcionesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }

  uri = environment.url + 'preinscripciones/';

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token')
    });
  }

  mostrar(body: any = {}) {
    const url = this.uri + 'mostrar';
    return this.http.post(url, body, { headers: this.getHeaders() }).pipe(map(respuesta => respuesta));
  }

  eliminar(body: any) {
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, { headers: this.getHeaders() }).pipe(map(respuesta => respuesta));
  }
}
