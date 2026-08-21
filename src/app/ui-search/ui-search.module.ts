import { NgModule, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraPrincipalComponent } from './barra-principal/barra-principal.component';
import { CargandoComponent } from './cargando/cargando.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormsModule } from '@angular/forms';
import { ChecktimesComponent } from './checktimes/checktimes.component';
import { DatatableComponent } from './datatable/datatable.component';
import { PaginadorComponent } from './paginador/paginador.component';
import { InputComponent } from './input/input.component';
import { MenuComponent } from './menu/menu.component';
import { MenuOptionComponent } from './menu-option/menu-option.component';
import { SubmenuOptionComponent } from './submenu-option/submenu-option.component';
import { RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { UsuarioSucursalesComponent } from './usuario-sucursales/usuario-sucursales.component';
import { DragComponent } from './drag/drag.component';
import {DragDrop, DragDropModule} from '@angular/cdk/drag-drop';
import { BotonesComponent } from './botones/botones.component';
import { FileComponent } from './file/file.component';
import { ImagenComponent } from './imagen/imagen.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { TextareaComponent } from './textarea/textarea.component';
import { CirculoComponent } from './circulo/circulo.component';
import { CardComponent } from './card/card.component';
import { ProgressComponent } from './progress/progress.component';
import { TituloComponent } from './titulo/titulo.component';
import { AbonoComponent } from './abono/abono.component';
import { CargoComponent } from './cargo/cargo.component';
import { DescuentoComponent } from './descuento/descuento.component';
import { SelectComponent } from './select/select.component';
import { GrupoComponent } from './grupo/grupo.component';
import { CeldaImagenesComponent } from './celda-imagenes/celda-imagenes.component';
import { CursoAsignacionComponent } from './curso-asignacion/curso-asignacion.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { InscritosCursosComponent } from './inscritos-cursos/inscritos-cursos.component';
import { CirculoEtiquetaComponent } from './circulo-etiqueta/circulo-etiqueta.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { TextoComponent } from './texto/texto.component';
import { VerSeguimientoComponent } from './ver-seguimiento/ver-seguimiento.component';
import { FichaAlumnoComponent } from './ficha-alumno/ficha-alumno.component';
import { DescripcionSeguimientosComponent } from './descripcion-seguimientos/descripcion-seguimientos.component';
import { MostrarGruposComponent } from './mostrar-grupos/mostrar-grupos.component';
import { ResultadosSeccionComponent } from './resultados-seccion/resultados-seccion.component';
import { PreguntaQuizComponent } from './pregunta-quiz/pregunta-quiz.component';
import { PreguntasQuizComponent } from './preguntas-quiz/preguntas-quiz.component';
import { ImageCropperComponent } from "ngx-image-cropper";
import { WordTextoComponent } from './word-texto/word-texto.component';
import { ImagenTextoComponent } from './imagen-texto/imagen-texto.component';
import { ImagenSeleccionableComponent } from './imagen-seleccionable/imagen-seleccionable.component';
import { DatoEstadoCuentaComponent } from './dato-estado-cuenta/dato-estado-cuenta.component';
import { ModalVerVoucherComponent } from './modal-ver-voucher/modal-ver-voucher.component';



@NgModule({
  declarations: [
    BarraPrincipalComponent,
    CargandoComponent,
    CheckboxComponent,
    ChecktimesComponent,
    DatatableComponent,
    PaginadorComponent,
    InputComponent,
    MenuComponent,
    MenuOptionComponent,
    SubmenuOptionComponent,
    ModalComponent,
    UsuarioComponent,
    UsuarioSucursalesComponent,
    DragComponent,
    BotonesComponent,
    FileComponent,
    ImagenComponent,
    BusquedasComponent,
    TextareaComponent,
    CirculoComponent,
    CardComponent,
    ProgressComponent,
    TituloComponent,
    AbonoComponent,
    CargoComponent,
    DescuentoComponent,
    SelectComponent,
    GrupoComponent,
    CeldaImagenesComponent,
    CursoAsignacionComponent,
    ProgressBarComponent,
    InscritosCursosComponent,
    CirculoEtiquetaComponent,
    InscripcionComponent,
    TextoComponent,
    VerSeguimientoComponent,
    FichaAlumnoComponent,
    DescripcionSeguimientosComponent,
    MostrarGruposComponent,
    ResultadosSeccionComponent,
    PreguntaQuizComponent,
    PreguntasQuizComponent,
    WordTextoComponent,
    ImagenTextoComponent,
    ImagenSeleccionableComponent,
    DatoEstadoCuentaComponent,
    ModalVerVoucherComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    DragDropModule,
    ImageCropperComponent
],
  exports: [
    BarraPrincipalComponent,
    CargandoComponent,
    CheckboxComponent,
    ChecktimesComponent,
    PaginadorComponent,
    DatatableComponent,
    InputComponent,
    MenuComponent,
    MenuOptionComponent,
    SubmenuOptionComponent,
    ModalComponent,
    UsuarioComponent,
    UsuarioSucursalesComponent,
    DragComponent,
    BotonesComponent,
    FileComponent,
    ImagenComponent,
    BusquedasComponent,
    TextareaComponent,
    CirculoComponent,
    CardComponent,
    ProgressComponent,
    TituloComponent,
    CargoComponent,
    AbonoComponent,
    DescuentoComponent,
    SelectComponent,
    GrupoComponent,
    CursoAsignacionComponent,
    ProgressBarComponent,
    InscritosCursosComponent,
    CirculoEtiquetaComponent,
    InscripcionComponent,
    TextoComponent,
    VerSeguimientoComponent,
    FichaAlumnoComponent,
    DescripcionSeguimientosComponent,
    MostrarGruposComponent,
    ResultadosSeccionComponent,
    PreguntasQuizComponent,
    PreguntaQuizComponent,
    WordTextoComponent,
    ImagenTextoComponent,
    ImagenSeleccionableComponent,
    DatoEstadoCuentaComponent,
    ModalVerVoucherComponent
  ]
})
export class UiSearchModule { }
