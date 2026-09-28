import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CalificadorService } from '../../servicios/calificador.service';
import { PdfService } from '../../servicios/pdf.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
  selector: 'app-calificar-grupo',
  templateUrl: './calificar-grupo.component.html',
  styles: [
  ]
})
export class CalificarGrupoComponent implements OnInit {
  busqueda = {
    idGrupo: 0,
    idSucursal: localStorage.getItem('sucursal')
  }
  configuracion: datatableConfig = {
    encabezados: ['alumno', 'curso'],
    alias: ['Nombre', 'Curso'],
    busqueda: true
  };
  alumnos: any;
  vista = '';
  seleccion: any;
  listaExamenes: any;
  
  constructor(private generales: GeneralesService,
              private rutaActiva: ActivatedRoute,
              private calificador: CalificadorService,
              private pdf: PdfService,
              private router: Router) { }

  ngOnInit(): void {
    this.busqueda.idGrupo = this.rutaActiva.snapshot.params['grupo'];
    this.traerAlumnos();
  }

  regresar() {
    this.router.navigate(['admin/calificador']);
  }

  traerAlumnos() {
    this.calificador.alumnos(this.busqueda).subscribe(respuesta => {
      this.alumnos = respuesta
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  calificar() {
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = 'calificar';
      this.generales.abrirModal();
    });
    
  }

  boletaAlumno() {
    this.pdf.pdfBoletaAlumno(this.seleccion);
  }

  boletaGrupo() {
    const body = {
      idGrupo: this.busqueda.idGrupo,
      alumnos: this.alumnos
    };
    this.pdf.pdfBoletaGrupo(body);
  }
}
