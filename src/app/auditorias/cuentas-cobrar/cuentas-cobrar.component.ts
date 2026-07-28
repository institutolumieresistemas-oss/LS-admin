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

  resumenCreditos() {
    if (this.creditosCruzados.length === 0) {
      this.generales.mensajeError('No hay créditos cruzados para resumir');
      return;
    }
    // Agrupar saldos por calendario deudor
    const agrupado: Record<string, number> = {};
    this.creditosCruzados.forEach(c => {
      const nombre = c.deudor || 'Calendario deudor no identificado';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(c.saldo);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>El calendario <strong>${key}</strong> nos debe</span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Créditos por Cobrar',
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
    // Agrupar por calendario deudor (donde se cobró físicamente)
    const agrupado: Record<string, number> = {};
    this.ingresosCruzados.forEach(i => {
      const nombre = i.calendarioDondeSeCobro || 'Otro';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(i.monto);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>El calendario <strong>${key}</strong> nos debe (Ingresos)</span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Ingresos Cruzados (Por Cobrar)',
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
    // Agrupar por calendario deudor (donde se cobró)
    const agrupado: Record<string, number> = {};
    this.abonosCruzados.forEach(a => {
      const nombre = a.calendarioDondeSeCobro || 'Otro';
      agrupado[nombre] = (agrupado[nombre] || 0) + Number(a.monto);
    });

    let html = '<ul class="list-group text-left" style="text-align: left;">';
    Object.keys(agrupado).forEach(key => {
      html += `<li class="list-group-item d-flex justify-content-between align-items-center">
        <span>El calendario <strong>${key}</strong> nos debe (Abonos cobrados)</span>
        <span class="badge badge-pill font-13" style="color: #000000; font-weight: bold; background-color: #f1f5f9;">$${agrupado[key].toLocaleString('es-MX', {minimumFractionDigits: 2})}</span>
      </li>`;
    });
    html += '</ul>';

    import('sweetalert2').then(Swal => {
      Swal.default.fire({
        title: 'Resumen de Abonos Cruzados (Por Cobrar)',
        html: html,
        icon: 'info',
        confirmButtonText: 'Cerrar',
        confirmButtonColor: '#4facfe'
      });
    });
  }
}
