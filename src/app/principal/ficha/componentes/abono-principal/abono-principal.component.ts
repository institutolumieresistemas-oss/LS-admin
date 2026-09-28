import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-abono-principal',
  templateUrl: './abono-principal.component.html',
  styleUrl: './abono-principal.component.css'
})
export class AbonoPrincipalComponent {
  @Input() listas = {
    conceptoscargos: [],
    conceptosabonos: [],
    conceptosdescuentos: [],
    conceptosdevoluciones: [],
    conceptosextras: [],
    formas: [],
    metodos: [],
    bancos: [],
    cuentas: []
  }
  @Output() emitidor = new EventEmitter();
  dato = {
    idConcepto: 1,
    monto: '',
    idFormaPago: 0,
    idMetodoPago: 2,
    concepto: 'Abono',
    imagen: '',
    propietario: '',
    referencia: '',
    idBanco: 0,
    idCuenta: 0,
    fecha: '',
    iva: false,
    comision: false,
    cantidad: ''
  }
  constructor(private generales: GeneralesService){}

  ngOnInit(){
    this.dato.idConcepto = 1;
    this.dato.concepto = 'Abono';
  }

  emitir(){
    this.dato.idConcepto = 1;
    this.dato.concepto = 'Abono';
    this.emitidor.emit(this.dato);
  }
}
