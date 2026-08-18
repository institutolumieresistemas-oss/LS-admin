import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-datos-aspiracion-principal',
  templateUrl: './modal-datos-aspiracion-principal.component.html',
  styleUrl: './modal-datos-aspiracion-principal.component.css'
})
export class ModalDatosAspiracionPrincipalComponent {
  @Input() dato = {
    idUniversidad: 0,
    idCentroUniversitario: 0,
    idCarrera: 0
  };
  @Input() listas = {
    universidades: [],
    centros: [], 
    carreras: []
  };
  @Input() idCalendario: any;
  centros: any;
  carreras: any;
  @Output() emitidor = new EventEmitter<any>();

  private generales = inject(GeneralesService);

  ngOnInit(){
    this.traerCentros(true);
  }

  traerCentros(inicio = false){
    if (!inicio) {
      this.dato.idCentroUniversitario = 0;
      this.dato.idCarrera = 0;
    }
    this.centros = this.generales.sublista(this.listas.centros, this.dato.idUniversidad, 'idUniversidad');
    this.traerCarreras(inicio);
  }

  traerCarreras(inicio = false){
    if (!inicio) {
      this.dato.idCarrera = 0;
    }
    this.carreras = this.generales.sublista(this.listas.carreras, this.dato.idCentroUniversitario, 'idCentroUniversitario');
    this.carreras = this.generales.sublista(this.carreras, this.idCalendario, 'idCalendario');
  }

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
