import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-abono',
  templateUrl: './abono.component.html',
  styleUrl: './abono.component.css'
})
export class AbonoComponent {
  @Input() dato = {
    monto: '',
    idFormaPago: 0,
    idMetodoPago: 0,
    idConcepto: 0,
    concepto: '',
    imagen: '',
    nombre: '',
    referencia: '',
    idBanco: 0,
    idCuenta: 0,
    fecha: '',
    iva: false,
    comision: false,
    cantidadComision: '',
    formaComision: 0
  }
  @Input() conceptos: any;
  @Input() metodos: any;
  @Input() formas: any;
  @Input() bancos: any;
  @Input() cuentas: any;
  @Input() total = 0;
  @Output() emitidor = new EventEmitter<any>();
  tipo = [
    { id: 1, nombre: '%' },
    { id: 2, nombre: '$' }
  ]

  constructor(private generales: GeneralesService){}
  
  ngOnInit(){}

  verificarConcepto(){
    this.dato.idMetodoPago = (this.dato.idConcepto.toString() === '2') ? 1 : 0;
    this.verificarMetodo();
  }

  verificarMetodo(){
    this.dato.monto = (this.dato.idMetodoPago.toString() === '1') ? this.total.toString() : '';
  }

  emitir(){
    
    this.emitidor.emit(this.dato);
  }
}
