import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-escolares-datos',
  templateUrl: './escolares-datos.component.html',
  styleUrl: './escolares-datos.component.css'
})
export class EscolaresDatosComponent {
  @Input() datos = {
    idTipoEscuela: 0,
    idEscuela: 0,
    idEstado: 0,
    idMunicipio: 0,
    promedio: '',
    intentos: '',
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCarrera: 0,
  }
  @Input() listas = {
    tipos: [],
    escuelas: [],
    estados: [],
    municipios: [],
    universidades: [],
    centros: [],
    carreras: []
  }
  @Input() idCalendario: any;
  @Output() siguiente = new EventEmitter<any>();
  @Output() anterior = new EventEmitter<any>();
  escuelas: any;
  municipios: any;
  centros: any;
  carreras: any;
  @Input() nivel = 0;
  constructor(private generales: GeneralesService){}
  
  ngOnInit(){
    if(this.datos.idTipoEscuela > 0){
      this.traerEscuelas(true);
    }
    if(this.datos.idEstado > 0){
      this.traerMunicipios(true);
    }
    if(this.datos.idUniversidad > 0){
      this.traerCentros(true);
    }
    if(this.datos.idCentroUniversitario > 0){
      this.traerCarreras(true);
    }
  }

  traerEscuelas(inicio: boolean){
    const busqueda = (this.nivel === 1) ? 1 : 2;
    this.datos.idEscuela = (inicio) ? this.datos.idEscuela : 0;
    this.escuelas = this.generales.sublista(this.listas.escuelas, this.datos.idTipoEscuela, 'idTipo');
    this.escuelas = this.generales.sublista(this.escuelas, this.nivel, 'grado');
  }

  traerMunicipios(inicio: boolean){
    this.datos.idMunicipio = (inicio) ? this.datos.idMunicipio : 0;
    this.municipios = this.generales.sublista(this.listas.municipios, this.datos.idEstado, 'idEstado');
  }

  traerCentros(inicio: boolean){
    this.datos.idCentroUniversitario = (inicio) ? this.datos.idCentroUniversitario : 0;
    this.centros = this.generales.sublista(this.listas.centros, this.datos.idUniversidad, 'idUniversidad');
  }

  traerCarreras(inicio: boolean){
    this.datos.idCarrera = (inicio) ? this.datos.idCarrera : 0;
    this.carreras = this.generales.sublista(this.listas.carreras, this.datos.idCentroUniversitario, 'idCentroUniversitario');
    this.carreras = this.generales.sublista(this.carreras, this.idCalendario, 'idCalendario');
  }

  emitirAnterior(){
    this.anterior.emit(true);
  }

  emitirSiguiente(){
    this.siguiente.emit(this.datos);
  }
}
