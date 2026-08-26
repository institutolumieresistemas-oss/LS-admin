import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-reactivo',
  templateUrl: './modal-reactivo.component.html',
  styleUrl: './modal-reactivo.component.css'
})
export class ModalReactivoComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    porcentaje: 50.00
  };
  @Input() modificar = false;

  constructor(private generales: GeneralesService) { }

  ngOnInit(): void {
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
