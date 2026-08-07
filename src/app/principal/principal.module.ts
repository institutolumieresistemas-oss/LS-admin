import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticaComponent } from './estadistica/estadistica.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { FichaComponent } from './ficha/ficha.component';
import { DatosFichaPrincipalComponent } from './ficha/componentes/datos-ficha-principal/datos-ficha-principal.component';
import { EstadoCuentaPrincipalComponent } from './ficha/componentes/estado-cuenta-principal/estado-cuenta-principal.component';
import { AbonoPrincipalComponent } from './ficha/componentes/abono-principal/abono-principal.component';
import { DescuentoPrincipalComponent } from './ficha/componentes/descuento-principal/descuento-principal.component';
import { DevolucionPrincipalComponent } from './ficha/componentes/devolucion-principal/devolucion-principal.component';
import { CargoPrincipalComponent } from './ficha/componentes/cargo-principal/cargo-principal.component';
import { ExtraPrincipalComponent } from './ficha/componentes/extra-principal/extra-principal.component';
import { BusquedaAlumnosPrincipalComponent } from './busqueda-alumnos-principal/busqueda-alumnos-principal.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NominaPrincipalComponent } from './nomina-principal/nomina-principal.component';
import { EmpleadoNominaPrincipalComponent } from './nomina-principal/componentes/empleado-nomina-principal/empleado-nomina-principal.component';
import { CuentaNominaPrincipalComponent } from './nomina-principal/componentes/cuenta-nomina-principal/cuenta-nomina-principal.component';
import { RecursosHumanosModule } from '../recursos-humanos/recursos-humanos.module';
import { AlumnoPrincipalComponent } from './alumno-principal/alumno-principal.component';
import { FormsModule } from '@angular/forms';
import { DatosAlumnoPrincipalComponent } from './alumno-principal/componentes/datos-alumno-principal/datos-alumno-principal.component';
import { GeneralesAlumnoPrincipalComponent } from './alumno-principal/componentes/generales-alumno-principal/generales-alumno-principal.component';
import { PadreAlumnoPrincipalComponent } from './alumno-principal/componentes/padre-alumno-principal/padre-alumno-principal.component';
import { DomicilioAlumnoPrincipalComponent } from './alumno-principal/componentes/domicilio-alumno-principal/domicilio-alumno-principal.component';
import { EscolaresAlumnoPrincipalComponent } from './alumno-principal/componentes/escolares-alumno-principal/escolares-alumno-principal.component';
import { FichasAlumnoPrincipalComponent } from './alumno-principal/componentes/fichas-alumno-principal/fichas-alumno-principal.component';
import { ModalNumeroRegistroPrincipalComponent } from './alumno-principal/modales/modal-numero-registro-principal/modal-numero-registro-principal.component';
import { ModalEstatusFichaPrincipalComponent } from './alumno-principal/modales/modal-estatus-ficha-principal/modal-estatus-ficha-principal.component';
import { ModalDatosPublicitariosPrincipalComponent } from './alumno-principal/modales/modal-datos-publicitarios-principal/modal-datos-publicitarios-principal.component';
import { AdministradorModule } from '../administrador/administrador.module';
import { ModalDatosAspiracionPrincipalComponent } from './alumno-principal/modales/modal-datos-aspiracion-principal/modal-datos-aspiracion-principal.component';
import { ProspectoPrincipalComponent } from './prospecto-principal/prospecto-principal.component';
import { ModalSeguimientoPrincipalComponent } from './prospecto-principal/modales/modal-seguimiento-principal/modal-seguimiento-principal.component';
import { SeguimientosPrincipalComponent } from './seguimientos-principal/seguimientos-principal.component';
import { ModalAsignarFichaComponent } from './seguimientos-principal/modales/modal-asignar-ficha/modal-asignar-ficha.component';
import { ModalCitasComponent } from './seguimientos-principal/modales/modal-citas/modal-citas.component';
import { ModalInscripcionSguimientoComponent } from './seguimientos-principal/modales/modal-inscripcion-sguimiento/modal-inscripcion-sguimiento.component';
import { ModalNuevoSeguimientoComponent } from './seguimientos-principal/modales/modal-nuevo-seguimiento/modal-nuevo-seguimiento.component';
import { CitasComponent } from './citas/citas.component';
import { ModalInscripcionPrincipalComponent } from './alumno-principal/modales/modal-inscripcion-principal/modal-inscripcion-principal.component';
import { CalificacionesComponent } from './calificaciones/calificaciones.component';
import { CreditoComponent } from './credito/credito.component';
import { PrestamoComponent } from './prestamo/prestamo.component';
import { LumiereSocialModule } from '../lumiere-social/lumiere-social.module';
import { AlumnoCodigoComponent } from './alumno-codigo/alumno-codigo.component';



@NgModule({
  declarations: [
    EstadisticaComponent,
    FichaComponent,
    DatosFichaPrincipalComponent,
    EstadoCuentaPrincipalComponent,
    AbonoPrincipalComponent,
    DescuentoPrincipalComponent,
    DevolucionPrincipalComponent,
    CargoPrincipalComponent,
    ExtraPrincipalComponent,
    BusquedaAlumnosPrincipalComponent,
    PerfilComponent,
    NominaPrincipalComponent,
    EmpleadoNominaPrincipalComponent,
    CuentaNominaPrincipalComponent,
    AlumnoPrincipalComponent,
    DatosAlumnoPrincipalComponent,
    GeneralesAlumnoPrincipalComponent,
    PadreAlumnoPrincipalComponent,
    DomicilioAlumnoPrincipalComponent,
    EscolaresAlumnoPrincipalComponent,
    FichasAlumnoPrincipalComponent,
    ModalNumeroRegistroPrincipalComponent,
    ModalEstatusFichaPrincipalComponent,
    ModalDatosPublicitariosPrincipalComponent,
    ModalDatosAspiracionPrincipalComponent,
    ProspectoPrincipalComponent,
    ModalSeguimientoPrincipalComponent,
    SeguimientosPrincipalComponent,
    ModalAsignarFichaComponent,
    ModalCitasComponent,
    ModalInscripcionSguimientoComponent,
    ModalNuevoSeguimientoComponent,
    CitasComponent,
    ModalInscripcionPrincipalComponent,
    CalificacionesComponent,
    CreditoComponent,
    PrestamoComponent,
    AlumnoCodigoComponent,
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    RecursosHumanosModule,
    AdministradorModule,
    LumiereSocialModule,
    FormsModule
  ]
})
export class PrincipalModule { }
