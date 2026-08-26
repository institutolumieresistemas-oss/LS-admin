import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { CobroNominasComponent } from './cobro-nominas/cobro-nominas.component';
import { CorteCajaComponent } from './corte-caja/corte-caja.component';
import { CursosCongeladosComponent } from './cursos-congelados/cursos-congelados.component';
import { EgresosAdministrativosComponent } from './egresos-administrativos/egresos-administrativos.component';
import { DirectivosModule } from "../directivos/directivos.module";
import { EmisionValesComponent } from './emision-vales/emision-vales.component';
import { ModalValeAdministrativosComponent } from './emision-vales/modales/modal-vale-administrativos/modal-vale-administrativos.component';
import { IngresosAdministrativosComponent } from './ingresos-administrativos/ingresos-administrativos.component';
import { InscripcionesComponent } from './inscripciones/inscripciones.component';
import { ModalInscripcionComponent } from './inscripciones/modales/modal-inscripcion/modal-inscripcion.component';
import { AlumnoDatosComponent } from './inscripciones/componentes/alumno-datos/alumno-datos.component';
import { InscripcionDatosComponent } from './inscripciones/componentes/inscripcion-datos/inscripcion-datos.component';
import { DomicilioDatosComponent } from './inscripciones/componentes/domicilio-datos/domicilio-datos.component';
import { TutorDatosComponent } from './inscripciones/componentes/tutor-datos/tutor-datos.component';
import { EscolaresDatosComponent } from './inscripciones/componentes/escolares-datos/escolares-datos.component';
import { PublicitariosDatosComponent } from './inscripciones/componentes/publicitarios-datos/publicitarios-datos.component';
import { CuentaDatosComponent } from './inscripciones/componentes/cuenta-datos/cuenta-datos.component';
import { TransferenciaSucursalesComponent } from './transferencia-sucursales/transferencia-sucursales.component';
import { ValesGerencialesComponent } from './vales-gerenciales/vales-gerenciales.component';
import { ModalValeGerencialComponent } from './vales-gerenciales/modales/modal-vale-gerencial/modal-vale-gerencial.component';
import { PreinscripcionesComponent } from './preinscripciones/preinscripciones.component';
import { ModalDetallePreinscripcionComponent } from './preinscripciones/modales/modal-detalle-preinscripcion/modal-detalle-preinscripcion.component';

@NgModule({
  declarations: [
    CobroNominasComponent,
    CorteCajaComponent,
    CursosCongeladosComponent,
    EgresosAdministrativosComponent,
    EmisionValesComponent,
    ModalValeAdministrativosComponent,
    IngresosAdministrativosComponent,
    InscripcionesComponent,
    ModalInscripcionComponent,
    AlumnoDatosComponent,
    InscripcionDatosComponent,
    DomicilioDatosComponent,
    TutorDatosComponent,
    EscolaresDatosComponent,
    PublicitariosDatosComponent,
    CuentaDatosComponent,
    TransferenciaSucursalesComponent,
    ValesGerencialesComponent,
    ModalValeGerencialComponent,
    PreinscripcionesComponent,
    ModalDetallePreinscripcionComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    DirectivosModule
  ],
  exports: [
    AlumnoDatosComponent,
    CuentaDatosComponent,
    DomicilioDatosComponent,
    EscolaresDatosComponent,
    InscripcionDatosComponent,
    PublicitariosDatosComponent,
    TutorDatosComponent,
    ModalInscripcionComponent,
    PreinscripcionesComponent,
    ModalDetallePreinscripcionComponent
  ]  
})
export class AdministradorModule { }
