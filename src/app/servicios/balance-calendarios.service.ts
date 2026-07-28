import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GeneralesService } from './generales.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BalanceCalendariosService {
  private http = inject(HttpClient);
  private generales = inject(GeneralesService);

  headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'bearer ' + localStorage.getItem('token')
  });

  uri = environment.url + 'balanceCalendarios/';

  obtener() {
    return this.http.post(this.uri + 'obtener', {}, { headers: this.headers });
  }
}
