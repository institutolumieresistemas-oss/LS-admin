import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { CalificadorService } from '../../servicios/calificador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificador',
  templateUrl: './calificador.component.html',
  styles: [
  ]
})
export class CalificadorComponent implements OnInit {
  listaHorarios: any;
  listas: any;
  vista = '';
  cargando = false;
  datos: any;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCurso: 0,
    idCategoria: 0,
    idModalidad: 0,
    idTurno: 0,
    idHorario: 0
  };
  verBuscar = false;
  constructor(private generales: GeneralesService,
              private calificador: CalificadorService,
              private router: Router) { }

  ngOnInit(): void {
    this.mostrar();
  }

  buscar(){
    this.cargando = true;
    this.calificador.grupos(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.datos = respuesta;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerHorarios() {
    this.listaHorarios = this.generales.sublista(this.listas.horarios, this.busqueda.idTurno, 'idTurno');
  }

  mostrar() {
    this.calificador.mostrar().subscribe(respuesta => {
      this.listas = respuesta;
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  calificar(grupo: any) {
    this.router.navigate(['admin/calificarGrupo', grupo.id]);
  }
}
