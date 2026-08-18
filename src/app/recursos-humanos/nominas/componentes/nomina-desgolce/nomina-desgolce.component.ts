import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-nomina-desgolce',
  templateUrl: './nomina-desgolce.component.html',
  styleUrl: './nomina-desgolce.component.css'
})
export class NominaDesgolceComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Output() atras = new EventEmitter<any>();

  @Input() dato: any = {
    percepciones: Array(),
    deducciones: Array(),
  };
  @Input() idDepartamento: any;
  @Input() percepciones: any;
  @Input() deducciones: any;
  @Input() idEmpleado: any;
  @Input() nominas: any;
  tipo = 0;
  formas = [
    { id: 1, nombre: 'Efectivo' },
    { id: 4, nombre: 'Deposito' }
  ];

  modificarPercepcion = false;
  percepcionSeleccionada: any;

  modificarDeduccion = false;
  deduccionSeleccionada: any;

  total = '0';
  constructor(public generales: GeneralesService) { }
  
  ngOnInit(): void {
    if (!this.dato) {
      this.dato = { percepciones: [], deducciones: [] };
    }
    if (!this.dato.percepciones) {
      this.dato.percepciones = [];
    }
    if (!this.dato.deducciones) {
      this.dato.deducciones = [];
    }
    this.calcular();
  }

  agregarPercepcion(dato: any){
    let nueva = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      cantidad: dato.cantidad,
      idConcepto: dato.idConcepto,
      idFormaPago: dato.idFormaPago,
      monto: dato.monto,
      valorUnitario: dato.valorUnitario
    };
    this.dato.percepciones = this.generales.agregarDatoArray(this.dato.percepciones, nueva);
    this.calcular();
    this.modificarPercepcion = false;
  }

  actualizarPercepcion(dato: any){
    this.dato.percepciones = this.generales.actualizarDatoArray(this.dato.percepciones, dato);
    this.calcular();
    this.modificarPercepcion = false;
  }

  quitarPercepcion(percepcion: any){
    this.dato.percepciones = this.generales.eliminarDatoArray(this.dato.percepciones, percepcion);
    this.calcular();
    if (this.percepcionSeleccionada === percepcion) {
      this.modificarPercepcion = false;
    }
  }

  agregarDeduccion(dato: any){
    let nueva = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      cantidad: dato.cantidad,
      idConcepto: dato.idConcepto,
      idFormaPago: dato.idFormaPago,
      monto: dato.monto,
      valorUnitario: dato.valorUnitario
    };
    this.dato.deducciones = this.generales.agregarDatoArray(this.dato.deducciones, nueva);
    this.calcular();
    this.modificarDeduccion = false;
  }

  actualizarDeduccion(dato: any){
    this.dato.deducciones = this.generales.actualizarDatoArray(this.dato.deducciones, dato);
    this.calcular();
    this.modificarDeduccion = false;
  }

  quitarDeduccion(deduccion: any){
    this.dato.deducciones = this.generales.eliminarDatoArray(this.dato.deducciones, deduccion);
    this.calcular();
    if (this.deduccionSeleccionada === deduccion) {
      this.modificarDeduccion = false;
    }
  }

  calcular(){
    let totalCalculado = 0;
    if (this.dato && this.dato.percepciones) {
      this.dato.percepciones.forEach((percepcion: any) => {
        const monto = parseFloat(percepcion.monto) || 0;
        totalCalculado += monto;
      });
    }
    if (this.dato && this.dato.deducciones) {
      this.dato.deducciones.forEach((deduccion: any) => {
        const monto = parseFloat(deduccion.monto) || 0;
        totalCalculado -= monto;
      });
    }
    this.total = totalCalculado.toFixed(2);
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  back(){
    this.atras.emit(true);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
