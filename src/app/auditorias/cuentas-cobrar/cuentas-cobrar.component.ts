import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { CuentasCobrarService } from '../../servicios/cuentas-cobrar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-cobrar',
  templateUrl: './cuentas-cobrar.component.html',
  styleUrl: './cuentas-cobrar.component.css'
})
export class CuentasCobrarComponent {
  cargando = false;
  calendarios: any[] = [];
  idCalendarioSeleccionado: number = 0;

  // Datos obtenidos
  creditosCruzados: any[] = [];
  ingresosCruzados: any[] = [];
  abonosCruzados: any[] = [];

  constructor(
    public generales: GeneralesService,
    private calendariosService: CalendariosService,
    private cuentasCobrarService: CuentasCobrarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.obtenerCalendarios();
  }

  obtenerCalendarios() {
    this.cargando = true;
    this.calendariosService.mostrar().subscribe(
      (respuesta: any) => {
        this.calendarios = respuesta;
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }

  consultarCuentasCobrar() {
    if (!this.idCalendarioSeleccionado) {
      this.creditosCruzados = [];
      this.ingresosCruzados = [];
      this.abonosCruzados = [];
      return;
    }

    this.cargando = true;
    this.cuentasCobrarService.obtener(this.idCalendarioSeleccionado).subscribe(
      (respuesta: any) => {
        this.creditosCruzados = respuesta.creditosCruzados || [];
        this.ingresosCruzados = respuesta.ingresosCruzados || [];
        this.abonosCruzados = respuesta.abonosCruzados || [];
        this.cargando = false;
      },
      (error) => {
        this.cargando = false;
        this.generales.interpretarError(error);
      }
    );
  }

  get totalCreditosCruzados(): number {
    return this.creditosCruzados.reduce((acc, curr) => acc + (Number(curr.saldo) || 0), 0);
  }

  get totalIngresosCruzados(): number {
    return this.ingresosCruzados.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }

  get totalAbonosCruzados(): number {
    return this.abonosCruzados.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }

  irAlPrestamo(idPrestamo: number) {
    this.router.navigate(['/admin/prestamo', idPrestamo]);
  }
}
