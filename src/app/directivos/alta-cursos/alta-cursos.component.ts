import { Component } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { AltaCursosService } from '../../servicios/alta-cursos.service';

@Component({
  selector: 'app-alta-cursos',
  templateUrl: './alta-cursos.component.html',
  styleUrl: './alta-cursos.component.css'
})
export class AltaCursosComponent {
  configuracion: datatableConfig = {
    alias: ['Nivel', 'Subnivel', 'Curso', 'Modalidad', 'Categoria', 'Calendario', 'Sede'],
    encabezados: ['nivel', 'subnivel', 'curso', 'modalidad', 'categoria', 'calendario', 'sede'],
    busqueda: true
  };
  datos: any;
  cargando = false;
  seleccion: any;
  vista: any;
  listas = {
    calendarios: [],
    niveles: [],
    subniveles: [],
    cursos: [],
    modalidades: [],
    categorias: [],
    sedes: [],
    altas: []
  };
  search = false;
  busqueda = {
    idCalendario: 0,
    idNivel: 0,
    idSubnivel: 0,
    idCurso: 0,
    idModalidad: 0,
    idCategoria: 0,
    idSede: 0
  };
  constructor(private generales: GeneralesService, private servicio: AltaCursosService){}
  
  ngOnInit(): void {
    this.mostrar();
  }
  
  modal(vista: any){
    this.vista = '';
    this.generales.delay(500).then(fun => {
      this.vista = vista;
      this.generales.abrirModal();
    });
  }

  buscar(){
    
    this.datos = this.generales.sublistaMultiples(this.listas.altas, this.busqueda);
  }
  
  mostrar(){
    this.cargando = true;
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.cargando = false;
      this.listas = respuesta.listas;
      this.listas.altas = respuesta.datos;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
  nuevo(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.nuevo(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Alta de curso agregado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  modificar(dato: any){
    if(this.servicio.validar(dato)){
      this.cargando = true;
      this.servicio.modificar(dato).subscribe((respuesta: any) => {
        this.cargando = false;
        this.generales.mensajeCorrecto('Alta de curso modificado correctamente');
        this.datos = this.generales.agregarDatoArray(this.datos, respuesta);
        this.generales.cerrarModal();
      },
      error => {
        this.cargando = false;
        this.generales.interpretarError(error);
      });
    }
  }
  
  eliminar(){
    this.cargando = true;
    this.servicio.eliminar(this.seleccion).subscribe((respuesta: any) => {
      this.cargando = false;
      this.generales.mensajeCorrecto('Alta de curso eliminado correctamente');
      this.datos = this.generales.eliminarDatoArray(this.datos, respuesta);
      this.seleccion = undefined;
    },
    error => {
      this.cargando = false;
      this.generales.interpretarError(error);
    });
  }
  
}
