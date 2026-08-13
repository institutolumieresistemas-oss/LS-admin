import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { EmpleadosComponent } from './empleados/empleados.component';
import { ModalEmpleadoComponent } from './empleados/modales/modal-empleado/modal-empleado.component';
import { EmpleadoPersonalesComponent } from './empleados/componentes/empleado-personales/empleado-personales.component';
import { EmpleadoDomicilioComponent } from './empleados/componentes/empleado-domicilio/empleado-domicilio.component';
import { EmpleadoFiscalesComponent } from './empleados/componentes/empleado-fiscales/empleado-fiscales.component';
import { EmpleadoEmpresaComponent } from './empleados/componentes/empleado-empresa/empleado-empresa.component';
import { EmpleadoImagenesComponent } from './empleados/componentes/empleado-imagenes/empleado-imagenes.component';
import { NominasComponent } from './nominas/nominas.component';
import { ModalNominaComponent } from './nominas/modales/modal-nomina/modal-nomina.component';
import { NominaEmpleadoComponent } from './nominas/componentes/nomina-empleado/nomina-empleado.component';
import { NominaDesgolceComponent } from './nominas/componentes/nomina-desgolce/nomina-desgolce.component';
import { PercepcionRHComponent } from './nominas/componentes/percepcion-rh/percepcion-rh.component';
import { DeduccionRHComponent } from './nominas/componentes/deduccion-rh/deduccion-rh.component';
import { ModalSucursalesEmpleadoComponent } from './empleados/modales/modal-sucursales-empleado/modal-sucursales-empleado.component';
import { ModalUsuarioEmpleadoComponent } from './empleados/modales/modal-usuario-empleado/modal-usuario-empleado.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { ModalPrestamoComponent } from './prestamos/modales/modal-prestamo/modal-prestamo.component';
import { ModalAbonosPrestamosComponent } from './prestamos/modales/modal-abonos/modal-abonos.component';

@NgModule({
  declarations: [
    EmpleadosComponent,
    ModalEmpleadoComponent,
    EmpleadoPersonalesComponent,
    EmpleadoDomicilioComponent,
    EmpleadoFiscalesComponent,
    EmpleadoEmpresaComponent,
    EmpleadoImagenesComponent,
    NominasComponent,
    ModalNominaComponent,
    NominaEmpleadoComponent,
    NominaDesgolceComponent,
    PercepcionRHComponent,
    DeduccionRHComponent,
    ModalSucursalesEmpleadoComponent,
    ModalUsuarioEmpleadoComponent,
    PrestamosComponent,
    ModalPrestamoComponent,
    ModalAbonosPrestamosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ],
  exports: [
    EmpleadoImagenesComponent,
    DeduccionRHComponent,
    PercepcionRHComponent
  ]
})
export class RecursosHumanosModule { }
