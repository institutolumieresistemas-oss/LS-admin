import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacacionesService {
  constructor(private http: HttpClient, private generales: GeneralesService) { }

  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'bearer ' + localStorage.getItem('token')
    });
  }

  uri = environment.url + 'vacaciones/';

  mostrar() {
    const url = this.uri + 'mostrar';
    return this.http.get(url, { headers: this.headers }).pipe(map(respuesta => respuesta));
  }

  nuevo(body: any) {
    const url = this.uri + 'nuevo';
    return this.http.post(url, body, { headers: this.headers }).pipe(map(respuesta => respuesta));
  }

  eliminar(body: any) {
    const url = this.uri + 'eliminar';
    return this.http.post(url, body, { headers: this.headers }).pipe(map(respuesta => respuesta));
  }

  /**
   * Tabulador Oficial de Vacaciones (Ley Federal del Trabajo / Reforma Vacaciones Dignas México)
   * 1 año  => 12 días
   * 2 años => 14 días
   * 3 años => 16 días
   * 4 años => 18 días
   * 5 años => 20 días
   * 6 a 10 años => 22 días
   * 11 a 15 años => 24 días
   * 16 a 20 años => 26 días
   * 21 a 25 años => 28 días
   * 26 a 30 años => 30 días
   * 31 a 35 años => 32 días
   */
  obtenerTabulador() {
    return [
      { anios: '1 año', dias: 12 },
      { anios: '2 años', dias: 14 },
      { anios: '3 años', dias: 16 },
      { anios: '4 años', dias: 18 },
      { anios: '5 años', dias: 20 },
      { anios: '6 a 10 años', dias: 22 },
      { anios: '11 a 15 años', dias: 24 },
      { anios: '16 a 20 años', dias: 26 },
      { anios: '21 a 25 años', dias: 28 },
      { anios: '26 a 30 años', dias: 30 },
      { anios: '31 a 35 años', dias: 32 }
    ];
  }

  calcularDiasCorresponden(fechaIngresoStr: string): { aniosAntiguedad: number, diasVacaciones: number } {
    if (!fechaIngresoStr) return { aniosAntiguedad: 0, diasVacaciones: 0 };
    const fechaIngreso = new Date(fechaIngresoStr);
    const hoy = new Date();
    
    let anios = hoy.getFullYear() - fechaIngreso.getFullYear();
    const m = hoy.getMonth() - fechaIngreso.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < fechaIngreso.getDate())) {
      anios--;
    }
    if (anios <= 0) {
      return { aniosAntiguedad: 0, diasVacaciones: 0 };
    }

    let dias = 12;
    if (anios === 1) dias = 12;
    else if (anios === 2) dias = 14;
    else if (anios === 3) dias = 16;
    else if (anios === 4) dias = 18;
    else if (anios === 5) dias = 20;
    else if (anios >= 6 && anios <= 10) dias = 22;
    else if (anios >= 11 && anios <= 15) dias = 24;
    else if (anios >= 16 && anios <= 20) dias = 26;
    else if (anios >= 21 && anios <= 25) dias = 28;
    else if (anios >= 26 && anios <= 30) dias = 30;
    else if (anios >= 31 && anios <= 35) dias = 32;
    else dias = 32 + (Math.floor((anios - 35) / 5) * 2);

    return { aniosAntiguedad: anios, diasVacaciones: dias };
  }
}
