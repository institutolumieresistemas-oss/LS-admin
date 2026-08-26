import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-detalle-preinscripcion',
  templateUrl: './modal-detalle-preinscripcion.component.html',
  styleUrl: './modal-detalle-preinscripcion.component.css'
})
export class ModalDetallePreinscripcionComponent {
  @Input() preinscripcion: any;
  @Output() inscribir = new EventEmitter<any>();
  @Output() cerrar = new EventEmitter<any>();

  get datos(): any {
    return this.preinscripcion?.datos || {};
  }

  emitirInscribir() {
    this.inscribir.emit(this.preinscripcion);
  }

  emitirCerrar() {
    this.cerrar.emit(true);
  }
}
