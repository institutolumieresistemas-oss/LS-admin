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

  resumenCreditos() {
    if (this.creditos.length === 0) {
      this.generales.mensajeError('No hay créditos para resumir');
      return;
    }
    // Agrupar saldos por acreedor
    const agrupado: Record<string, number> = {};
    this.creditos.forEach(c => {
      const nombre = c.nombrePrestador || 'Prestador no identificado';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(c.saldo);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Se le debe a <strong>${key}</strong></span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Créditos por Pagar',
        html: html,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#1153c0'
      });
    });
  }

  resumenIngresos() {
    if (this.ingresosCruzados.length === 0) {
      this.generales.mensajeError('No hay ingresos cruzados para resumir');
      return;
    }
    // Agrupar por calendario destino
    const agrupado: Record<string, number> = {};
    this.ingresosCruzados.forEach(i => {
      const nombre = i.calendarioOriginal || 'Otro';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(i.monto);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Se le debe al calendario <strong>${key}</strong></span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Ingresos Cruzados (Por Pagar)',
        html: html,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#ff6442'
      });
    });
  }

  resumenAbonos() {
    if (this.abonosCruzados.length === 0) {
      this.generales.mensajeError('No hay abonos cruzados para resumir');
      return;
    }
    // Agrupar por calendario del préstamo
    const agrupado: Record<string, number> = {};
    this.abonosCruzados.forEach(a => {
      const nombre = a.calendarioPrestamo || 'Otro';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(a.monto);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>Se le debe transferir al calendario <strong>${key}</strong></span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Abonos a Transferar (Por Pagar)',
        html: html,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#4facfe'
      });
    });
  }
}
