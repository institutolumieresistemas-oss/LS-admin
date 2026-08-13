import { Component, Input, OnInit } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { CalificadorService } from '../../../../servicios/calificador.service';

@Component({
  selector: 'app-modal-calificar-alumno',
  templateUrl: './modal-calificar-alumno.component.html',
  styles: [
  ]
})
export class ModalCalificarAlumnoComponent implements OnInit {
  @Input() ficha: any;
  examenes: any;
  secciones: any;
  examen: any;
  promedioExamen: any;
  promedioAlumno: any;
  puntajeCarrera: any;
  promedioTotal: any;
  diferencia: any;
  hay = false;
  colbach = false;
  constructor(public generales: GeneralesService,
              private calificador: CalificadorService) { }

  ngOnInit(): void {
    
    this.traerExamenes();
  }

  traerExamenes() {
    this.calificador.traerExamenes(this.ficha).subscribe(respuesta => {
      this.examenes = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  traerSecciones(examen: any) {
    this.examen = examen;
    const body = {
      idFicha: this.ficha.id,
      idExamen: examen,
      idAlumno: this.ficha.idAlumno
    };
    this.calificador.traerSecciones(body).subscribe((respuesta: any) => {
      this.secciones = respuesta.secciones;
      this.promedioExamen = respuesta.promedioExamen;
      this.promedioAlumno = respuesta.promedioAlumno;
      this.puntajeCarrera = respuesta.puntajeCarrera;
      this.promedioTotal = parseFloat(respuesta.promedioExamen) + parseFloat(respuesta.promedioAlumno);
      this.diferencia = respuesta.diferencia;
      this.colbach = respuesta.colbach;
      this.hay = true;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  emitir() {
    const body = {
      secciones: this.secciones,
      examen: this.examen,
      ficha: this.ficha.id
    }
    this.calificador.guardarSecciones(body).subscribe(respuesta => {
      this.generales.mensajeCorrecto('Calificaciones guardadas correctamente');
      this.traerSecciones(this.examen);
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}
