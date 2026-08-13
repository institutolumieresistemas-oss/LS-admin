import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';
import { AlumnosService } from '../../../../servicios/alumnos.service';

@Component({
  selector: 'app-modal-numero-registro-principal',
  templateUrl: './modal-numero-registro-principal.component.html',
  styleUrl: './modal-numero-registro-principal.component.css'
})
export class ModalNumeroRegistroPrincipalComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    id: 0,
    registro: ''
  };
  @Input() modificar = false;
  constructor(private generales: GeneralesService, private servicio: AlumnosService) { }
  
  ngOnInit(): void {
    
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
