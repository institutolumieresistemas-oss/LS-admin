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

  formatearPromedio(promedio: any): string {
    if (!promedio) return 'N/A';
    const valStr = promedio.toString().trim().replace(',', '.');
    let val = parseFloat(valStr);
    if (isNaN(val) || val < 0) return promedio.toString();
    if (val > 0 && val <= 10) val = val * 10;
    if (val > 100) val = 100;
    return val.toFixed(2);
  }
}
