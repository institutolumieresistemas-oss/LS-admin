import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalendariosService } from '../../servicios/calendarios.service';
import { CuentasCobrarService } from '../../servicios/cuentas-cobrar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cuentas-pagar',
  templateUrl: './cuentas-pagar.component.html',
  styleUrl: './cuentas-pagar.component.css'
})
export class CuentasPagarComponent {
  cargando = false;
  calendarios: any[] = [];
  idCalendarioSeleccionado: number = 0;

  // Datos obtenidos
  creditos: any[] = [];
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

  consultarCuentasPagar() {
    if (!this.idCalendarioSeleccionado) {
      this.creditos = [];
      this.ingresosCruzados = [];
      this.abonosCruzados = [];
      return;
    }

    this.cargando = true;
    this.cuentasCobrarService.obtenerPagar(this.idCalendarioSeleccionado).subscribe(
      (respuesta: any) => {
        this.creditos = respuesta.creditos || [];
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

  get totalCreditos(): number {
    return this.creditos.reduce((acc, curr) => acc + (Number(curr.saldo) || 0), 0);
  }

  get totalIngresosCruzados(): number {
    return this.ingresosCruzados.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }

  get totalAbonosCruzados(): number {
    return this.abonosCruzados.reduce((acc, curr) => acc + (Number(curr.monto) || 0), 0);
  }

  irAlDesglose(idCredito: number) {
    this.router.navigate(['/admin/credito', idCredito]);
  }

  irAlPrestamo(idPrestamo: number) {
    this.router.navigate(['/admin/prestamo', idPrestamo]);
  }
}
