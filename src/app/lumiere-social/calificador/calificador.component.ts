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
    const estado = this.calificador.obtenerEstado();
    if (estado && estado.datos) {
      this.busqueda = estado.busqueda ? { ...estado.busqueda } : this.busqueda;
      this.datos = estado.datos;
      this.listaHorarios = estado.listaHorarios;
    }
    this.mostrar();
  }

  buscar(){
    this.cargando = true;
    this.calificador.grupos(this.busqueda).subscribe(respuesta => {
      this.cargando = false;
      this.datos = respuesta;
      this.calificador.guardarEstado(this.busqueda, this.datos, this.listaHorarios);
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerHorarios() {
    if (this.listas && this.listas.horarios) {
      this.listaHorarios = this.generales.sublista(this.listas.horarios, this.busqueda.idTurno, 'idTurno');
    }
  }

  mostrar() {
    this.calificador.mostrar().subscribe(respuesta => {
      this.listas = respuesta;
      if (this.busqueda.idTurno && (!this.listaHorarios || this.listaHorarios.length === 0)) {
        this.traerHorarios();
      }
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  calificar(grupo: any) {
    this.router.navigate(['admin/calificarGrupo', grupo.id]);
  }
}
