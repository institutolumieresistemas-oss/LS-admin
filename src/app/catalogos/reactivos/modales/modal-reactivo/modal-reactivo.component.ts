import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-reactivo',
  templateUrl: './modal-reactivo.component.html',
  styleUrl: './modal-reactivo.component.css'
})
export class ModalReactivoComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato: any = {
    nombre: '',
    porcentaje: ''
  };
  @Input() modificar = false;

  constructor(private generales: GeneralesService) { }

  ngOnInit(): void {
    if (this.dato && this.dato.porcentaje !== undefined && this.dato.porcentaje !== null) {
      this.dato.porcentaje = this.dato.porcentaje.toString();
    }
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
