import { Component, OnInit } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { FichasService } from '../../servicios/fichas.service';
import { InscripcionesService } from '../../servicios/inscripciones.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ficha',
  templateUrl: './ficha.component.html',
  styles: [
  ]
})
export class FichaComponent implements OnInit {
  datos: any;
  listas = {
      calendarios: [],
      niveles: [],
      subniveles: [],
      categorias: [],
      modalidades: [],
      cursos: [],
      sedes: [],
      turnos: [],
      horarios: [],
      sucursales: [],
      sedessucursales: [],
      grupos: [],
      cupos: []
  }
  ficha = {
    folio: ''
  }
  id: any;
  cargando = false;
  seleccion = 0;
  charge = false;
  constructor(public generales: GeneralesService,
              private fichas: FichasService,
              private inscripciones: InscripcionesService,
              public rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.traer();
  }

  traer() {
    this.cargando = true;
    this.id = this.rutaActiva.snapshot.params['ficha'];
    this.fichas.traer({id: this.rutaActiva.snapshot.params['ficha']}).subscribe((respuesta: any) => {
      this.listas = respuesta.listas;
      this.datos = respuesta.alta;
      this.ficha = respuesta.ficha;
      this.cargando = false;
      this.charge = true;
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }

  actualizar(dato: any) {
    if (!this.inscripciones.validarInscripcion(dato)) {
      return;
    }
    dato.id = this.rutaActiva.snapshot.params['ficha'];
    this.cargando = true;
    this.fichas.actualizar(dato).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Ficha actualizada correctamente');
    },
    error => {
      this.generales.interpretarError(error);
      this.cargando = false;
    });
  }
 }
