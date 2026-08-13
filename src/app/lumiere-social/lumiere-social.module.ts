import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CalificadorComponent } from './calificador/calificador.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { CalificarGrupoComponent } from './calificar-grupo/calificar-grupo.component';
import { ModalCalificarAlumnoComponent } from './calificar-grupo/modales/modal-calificar-alumno/modal-calificar-alumno.component';
import { ExamenAlumnoComponent } from './examen-alumno/examen-alumno.component';

@NgModule({
  declarations: [
    CalificadorComponent,
    CalificarGrupoComponent,
    ModalCalificarAlumnoComponent,
    ExamenAlumnoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiSearchModule
  ],
  exports: [
    ModalCalificarAlumnoComponent,
    ExamenAlumnoComponent
  ]
})
export class LumiereSocialModule { }
