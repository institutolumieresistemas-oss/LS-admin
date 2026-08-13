import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { AplicacionService } from '../../servicios/aplicacion.service';
import { CursosService } from '../../servicios/cursos.service';
import { AplicacionCursosService } from '../../servicios/aplicacion-cursos.service';

@Component({
  selector: 'app-aplicacion-cursos',
  templateUrl: './aplicacion-cursos.component.html',
  styleUrl: './aplicacion-cursos.component.css'
})
export class AplicacionCursosComponent {
  cargados: any;
  totales: any;
  listado: any;
  cargando = false;
  constructor(
    private generales: GeneralesService,
    private servicio: AplicacionCursosService,
    private servicio2: CursosService
  ){}
  
  ngOnInit(){
    this.traerCargados();
  }

  traerCargados(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargados = respuesta;
      this.traerTotales();
      this.cargando = false;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  traerTotales(){
    this.cargando = true;
    this.servicio2.udg().subscribe((respuesta: any) => {
      this.totales = this.generales.activos(respuesta);
      this.generales.delay(2000).then(fun => {
        this.listado = this.generales.existentesLista(this.totales, this.cargados);
        this.cargando = false;
      });
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }

  guardar(){
    this.cargando = true;
    this.servicio.guardar({cursos: this.generales.filtrarExistentes(this.listado)}).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Cursos agregados correctamente');
      this.cargando = false;
    },
    error => {
      this.cargando = false;
      
      this.generales.interpretarError(error);
    });
  }
}
